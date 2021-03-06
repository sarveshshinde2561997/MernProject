const express = require('express');
const router = express.Router();
const userCollectionSchema = require('./Schema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require('./Authenticate');
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
            token = await result.generateAuthToken();
            res.cookie("jwttoken", token, {
                expires: new Date(Date.now() + 1000),
                httpOnly: true
            });
            res.status(200).send({ result });
        } else {
            res.status(404).send("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send(err)
    }
})


router.get('/about', authenticate, (req, res) => {
    try {
        res.status(200).send(req.rootUser)
    } catch (err) {
        console.log(err);
    }
})

router.post('/save/message', async (req, res) => {
    try {
        const id = req.body._id;
        const message = req.body.message;
        console.log(message)
        const result = await userCollectionSchema.findOneAndUpdate({ _id: id }, {
            "$push": {
                "messages": { "message": message },
            }
        },
            { "new": true });
        res.status(200).send({ result });
    }
    catch (err) {
        res.status(400).send(err)
    }
})



module.exports = router;
