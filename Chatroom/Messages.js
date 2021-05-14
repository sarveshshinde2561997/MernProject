const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Chatroom"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    message: {
        type: String,
        required: true
    }
});

const messageCollection = mongoose.model('Messages', messageSchema)

module.exports = messageCollection;