const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const schema = mongoose.Schema({
    name: String,
    mobile: Number,
    email: String,
    password: String,
    tokens: [
        {
            token: String
        }
    ]
})

schema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})


const collection = mongoose.model('merncollection', schema)

module.exports = collection;