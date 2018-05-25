import openSocket from 'socket.io-client';

// export const socket = openSocket("http://localhost:5000");
export const socket = openSocket("https://fcc-chart-stock-market-app.glitch.me/");

export const fetchStocks = () => {
    socket.emit("FETCH_STOCKS", {  });
};

export const addStock = symbol => {
    socket.emit("ADD_STOCK", { symbol });
};

export const removeStock = _id => {
    socket.emit("REMOVE_STOCK", { _id });
};

