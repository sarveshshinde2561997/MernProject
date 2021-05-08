const express = require('express');
const router = express.Router();
const userCollectionSchema = require('./Schema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post('/register', async (req, res) => {
    try {
        const user = userCollectionSchema(req.body);
        await user.save();
        res.status(201).send("User registered successfully");
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    console.log(req);
    let token;
    try {
        const username = req.body.username;
        const password = req.body.password;
        const result = await userCollectionSchema.findOne({ email: username });

        if (result && await bcrypt.compare(password, result.password)) {
            // console.log("token", token)
            token = jwt.sign({ _id: result._id }, "Test");
            res.cookie("jwtToken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })
            res.status(200).send({ result, token });
        } else {
            res.status(404).send("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send(err)
    }
})



module.exports = router;
