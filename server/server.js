require("dotenv").config();
const express = require("express");

const { getCompanyStockData } = require("./utilities/stockAPI");

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

    socket.on("FETCH_DATA", data => {
        getCompanyStockData(data.time, data.symbols)
            .then(stocksData => {
                io.sockets.emit("SEND_DATA", { stocksData });
            })
            .catch(error => {
                io.sockets.emit("ERROR", { error })
            });
    });
});