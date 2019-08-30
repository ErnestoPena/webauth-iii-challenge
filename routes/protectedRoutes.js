const express = require('express');
const protectedRoute = express.Router();
const db = require('../data/user-db')
const jwt = require('jsonwebtoken');

const protected = require('../auth/protected');

protectedRoute.get('/' , protected , async (req , res) =>{
    try {
        const users = await db.find()
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({message:'Something went wrong with your request'});
    }
})

module.exports = protectedRoute;