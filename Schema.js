const express = require('express');

const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    mobile: Number,
    email: String,
    password: String
})

const collection = mongoose.model('merncollection', schema)

module.exports = collection;