const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    }
});

const chatRoomCollection = mongoose.model('Chatroom', chatRoomSchema)

module.exports = chatRoomCollection;