import openSocket from 'socket.io-client';

const socket = openSocket("http://localhost:5000");

const fetchData = (time, symbols) => {
    socket.emit("FETCH_DATA", { time, symbols });
}