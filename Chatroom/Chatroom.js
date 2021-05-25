const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({

    chatrooms: {
        type: [
            {
                userId: String,
                sendAcceptFlag: Boolean
            }
        ]
    }
},
    { timestamps: true }
);

const chatRoomCollection = mongoose.model('Chatroom', chatRoomSchema)

module.exports = chatRoomCollection;