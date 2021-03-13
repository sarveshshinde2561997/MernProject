const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sarvesh123:Sarvesh@123@sarvesh.ldbyo.mongodb.net/merndb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(
    (res) => {
        console.log("MongoDB Connected")
    }
).catch((err) => {
    console.log(err)
})