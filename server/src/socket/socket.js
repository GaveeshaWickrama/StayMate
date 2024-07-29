const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors : {
        origin : true,
        methods : ["GET","POST"]
    }
});

io.on('connection',(socket)=>{
    console.log("a user connected.",socket.id);

    Socket.on("disconnect",() => {
        console.log("user disconnected",socket.id);
    });

});

module.exports = { app,io,server };