const express = require('express');
const router = express.Router();
const userCollectionSchema = require('./Schema');

router.get('/users', (req, res) => {

})

router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        const user = userCollectionSchema(req.body);
        const result = await user.save();
        res.status(201).send(result);
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/getusers', async (req, res) => {
    try {
        const user = userCollectionSchema();
        const result = await user.find()
        res.status(201).send(result);
    } catch (err) {
        res.status(400).send(err)
    }
})



module.exports = router;
