require("dotenv").config();
const express = require("express");

const { mongoose } = require('./db/mongoose');
const { Stock } = require("./models/Stock");
const { getStocks, addStock, removeStock } = require("./utilities/stockAPI");

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

const server =  app.listen(port);
console.log(`Server started at port ${port}`);

const io = require("socket.io")(server);

// listen on every connection
io.on('connection', socket => {
    console.log("New user connected");

    socket.on("FETCH_STOCKS", async data => {

        try {
            const stocks = await getStocks();

            socket.emit("STOCKS_DATA", { stocks });
        } catch (e) {
            socket.emit("ERROR", { error: e });
        }
    });

    socket.on("ADD_STOCK", async data => {

        try {
            const stock = await addStock(data.symbol);

            io.sockets.emit("ADDED_STOCK", { stock });
        } catch (e) {
            socket.emit("ERROR", { error: e });
        }
    });

    socket.on("REMOVE_STOCK", async data => {

        try {
            const stock = await removeStock(data._id);
            io.sockets.emit("REMOVED_STOCK", { _id: stock._id });
        } catch (e) {
            socket.emit("ERROR", { error :e });
        }
    });
});