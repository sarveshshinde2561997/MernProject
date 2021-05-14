const express = require("express");
const router = express.Router();
const userSchema = require('./User');
const chatRoomSchema = require('./Chatroom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createChatRoom = require('./Chartroom_auth');

router.post('/chartroom/register', async (req, res) => {
    try {
        const user = userSchema(req.body);
        await user.save();
        res.status(201).send("User registered successfully");
    } catch (err) {
        res.status(400).send(err)
    }
})


router.post('/chartroom/login', async (req, res) => {
    console.log(req);
    let token;
    try {
        const username = req.body.username;
        const password = req.body.password;
        const result = await userSchema.findOne({ email: username });

        if (result && await bcrypt.compare(password, result.password)) {
            token = await jwt.sign({ _id: result._id, date: new Date().getTime() }, "Test");
            res.cookie("jwttoken", token, {
                expires: new Date(Date.now() + 1000),
                httpOnly: true
            });
            res.status(200).send({ result, token });
        } else {
            res.status(404).send("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/chatroom/createroom', createChatRoom, async (req, res) => {

    try {
        const chatRoom = chatRoomSchema(req.body);
        const chatroomExists = await chatRoomSchema.findOne({ name: req.body.name })
        if (chatroomExists) { return res.status(400).send("Chatroom already exists") };
        await chatRoom.save();
        res.status(200).send("ChatRoom is created");

    } catch (err) {
        res.status(404).send("Invalid token");
    }

})


module.exports = router;