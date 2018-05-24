import openSocket from 'socket.io-client';

export const socket = openSocket("http://localhost:5000");

export const fetchData = (time, symbols) => {
    socket.emit("FETCH_DATA", { time, symbols });
}

