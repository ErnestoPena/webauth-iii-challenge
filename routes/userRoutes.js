const express = require('express');
const userRoutes = express.Router();

const userDB = require('../data/user-db');


userRoutes.post('/register' , async (req,res) => {
    const {username , password} = req.body;
    const verifyUsername = await userDB.findUserName(username);
    console.log(verifyUsername, this)
     if (verifyUsername) {   
        if (username && password) {
            try {
                console.log(req.body)
                const newUser = await userDB.insertUser(req.body);
                req.status(200).json(user);
            }
            catch (err) {
                res.status(500).json({message: `There was an error with your ${req.method} request`, err})
            } 
        } else {
            res.status(403).json({message: ' Please provide credentials'});
        }
    } else {
        res.status(403).json({message: `Username already registered in the Database, use different username`})
    }   
})

module.exports = userRoutes;