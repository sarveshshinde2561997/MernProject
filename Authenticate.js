const jwt = require('jsonwebtoken');
const userSchema = require('./Schema');
const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwttoken;
        const verifyToken = jwt.verify(token, "Test");
        const rootUser = await userSchema.findOne({ _id: verifyToken._id, 'tokens:token': token });

        if (!rootUser) { throw new Error("User not found") };

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    }
    catch (err) {
        res.status(401).send("Unauthorised token:No token provided");
    }
}

module.exports = authenticate;