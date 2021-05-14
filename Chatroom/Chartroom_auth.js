
const jwt = require('jsonwebtoken');
const userSchema = require('./User');
const createChatRoom = async (req, res, next) => {
    try {

        const token = req.headers.token;
        const verifiedToken = jwt.verify(token, "Test");
        console.log(verifiedToken);
        const verifiedUser = await userSchema.findOne({ _id: verifiedToken._id })
        req.verifiedUser = verifiedUser;
        next();
    } catch (err) {
        res.status(401).send("Unauthorised token:No token provided");
    }
}

module.exports = createChatRoom;