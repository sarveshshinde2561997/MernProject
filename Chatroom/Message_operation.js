const express = require('express');
const router = express.Router();
const messageSchema = require('./Messages');

// add new message

router.post('/add', async (req, res) => {
    try {
        const newMessage = messageSchema(req.body);
        const result = await newMessage.save();
        res.status(200).send(result);
    } catch (err) {
        res.status(404).send("Error");
    }
})

// get messages

router.get('/get/:conversationId', async (req, res) => {
    try {
        const conversationId = req.params.conversationId;
        const result = await messageSchema.find({ conversationId: conversationId });
        res.status(200).send(result);
    } catch (err) {
        res.status(404).send("Error");
    }
})


module.exports = router;
