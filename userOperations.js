const express = require('express');
const router = express.Router();
const userCollectionSchema = require('./Schema');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
    ; router.post('/register', async (req, res) => {
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
            token = jwt.sign({ username: result.username, id: result._id }, 'test');
            // console.log("token", token)  
            res.status(200).json({ result, token });
        } else {
            res.status(404).send("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send(err)
    }
})



module.exports = router;
