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

const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId];
}

const userSocketMap = {} ; //{userId : socketId}

io.on('connection',(socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("a user connected.",socket.id,userId);
    if(userId != undefined) userSocketMap[userId] = socket.id

    //io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",() => {
        console.log("user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });

});

module.exports = { app,io,server,getRecieverSocketId };