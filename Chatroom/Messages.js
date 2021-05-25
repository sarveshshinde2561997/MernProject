const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    senderId: {
        type: String,
        required: true,
    },
    conversationId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
});

const messageCollection = mongoose.model('Messages', messageSchema)

module.exports = messageCollection;