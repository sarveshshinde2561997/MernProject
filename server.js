const express = require('express');
const cors = require('cors')
const body_parser = require('body-parser')
const PORT = process.env.PORT || 8000;
require('./dbConnection');
const router = require('./userOperations');
const app = express();
app.use(body_parser.json())
app.use(cors())
app.use(router);

app.get('/', (req, res) => {
    res.send("express")
})

app.listen(PORT, () => {
    console.log(PORT, "running")
})