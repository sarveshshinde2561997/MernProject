const express = require("express");
const router = express.Router();
const userSchema = require('./User');
const chatRoomSchema = require('./Chatroom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createChatRoom = require('./Chartroom_auth');
const { request } = require("express");

router.post('/register', async (req, res) => {
    try {
        const user = userSchema(req.body);
        await user.save();
        res.status(201).send("User registered successfully");
    } catch (err) {
        res.status(400).send(err)
    }
})


router.post('/login', async (req, res) => {
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
            const obj = {
                _id: result._id,
                email: result.email,
                name: result.name
            }
            res.status(200).send({ result: obj, token });
        } else {
            res.status(404).send("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

//new conversation
router.post('/create', async (req, res) => {

    try {
        const chartRoom = await chatRoomSchema({ chatrooms: req.body });
        const result = await chartRoom.save();
        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(404).send("Error");
    }
})

// get conversation of user

router.post('/getConversationId', async (req, res) => {
    try {
        const result = await chatRoomSchema.find({ "chatrooms.userId": { $all: [req.body.userId, req.body.receiverId] } })
        res.status(200).send(result);
    } catch (err) {
        res.status(404).send("Error")
    }
})

// get all users

router.get('/getAllUsers/:userId', async (req, res) => {
    try {
        const result = await userSchema.find({ _id: { $nin: req.params.userId } }, { password: 0, email: 0 });
        res.status(200).send(result);
    } catch (err) {
        res.status(404).send("Error")
    }
})

router.put('/acceptRequest', async (req, res) => {
    try {
        const result = await chatRoomSchema.findOneAndUpdate({ "chatrooms.userId": req.body.receiverId }, {
            $set: {
                "chatrooms.$.sendAcceptFlag": true
            },
        })
        res.status(200).send(result);
    } catch (err) {
        res.status(404).send("Error");
    }
})

module.exports = router;