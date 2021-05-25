const express = require('express');
const cors = require('cors')
const body_parser = require('body-parser')
const PORT = process.env.PORT || 8000;
require('./dbConnection');
const router = require('./userOperations');
const router1 = require('./Chatroom/Chatroom_Operation');
const router2 = require('./Chatroom/Message_operation');
const app = express();
const sockeio = require("socket.io");

app.use(body_parser.json())
app.use(cors())
app.use(router);
app.use('/chatroom', router1);
app.use('/message', router2);

app.get('/', (req, res) => {
    res.send("express")
})

const server = app.listen(PORT, () => {
    console.log(PORT, "running")
})

const io = sockeio(server, {
    cors: {
        origin: '*'
    }
});

let users = [];

const addUser = (userId, socketId) => {
    if (!users.some(user => user.userId === userId)) {
        users.push({ userId, socketId });
    }
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId != socketId);
}

const findUser = (userId => {
    return users.find((user) => user.userId == userId);
})

io.on("connection", (socket) => {
    console.log("connection sucessfull");

    socket.on("disconnect", () => {
        console.log("Disconnected", socket.userId);
        removeUser(socket.id);
    });

    socket.on("joinRoom", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("newMessage", (messageData) => {
        console.log(messageData);
        const user = findUser(messageData.senderId)
        console.log(user);
        io.to(user.socketId).emit("getNewMessage", messageData)
    })

    socket.on("sendInvite", (id) => {
        io.emit("acceptInvite", { flag: true })
    })
})
