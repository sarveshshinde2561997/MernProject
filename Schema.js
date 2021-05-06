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

schema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ email: this.email, _id: this._id }, "Test");
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

const collection = mongoose.model('merncollection', schema)

module.exports = collection;