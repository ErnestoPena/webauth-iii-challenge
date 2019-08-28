const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDB = require('../data/user-db');

//User Registration
userRoutes.post('/register' , verifyUser , async (req,res) => {
    const newUser = req.body;
    try {
        const hash = bcrypt.hashSync(newUser.password ,10);
        newUser.password = hash;
        const newUserAdded = await userDB.insertUser(newUser);
        res.status(201).json(newUserAdded);
    }
    catch (err) {
        res.status(500).json({message: `There was an error with your ${req.method} request`, err})
    } 
})


//Method for User Login
userRoutes.post('/login' , verifyLogin , async (req,res) => {
     const newUser = req.body;
        
     if (newUser.username && newUser.password) {
        const verifyPassword = bcrypt.compareSync(newUser.password , req.returnedUser.password)
        console.log(verifyPassword, 'this is the verified password');
        if (verifyPassword) {
           try {
              const payload = { username: newUser.username };
              const secret= "thisismyhardsecret";
              const options= {
                     algorithm: "HS256",
                    expiresIn: '1h'
                }
            const token = jwt.sign(payload , secret , options);
            console.log(token);
            res.status(201).json(`Welcome back, ${req.returnedUser.username}`);
           }
           catch (err) {
              res.status(500).json({message:`Something went wrong with your ${req.method} request`})
           }
        }

     }
})

//Middleware to verify username
async function verifyUser(req , res , next) {
    const newUser = req.body;

    if (newUser.username && newUser.password) {
        const [verifyUsername] = await userDB.findUserName(newUser.username);
        if (verifyUsername === undefined) {
            next()
        } else {
            res.status(409).json({message: `Username already registered in the Database, use different username`})
        }
    } else {
        res.status(400).json({message: ' Please provide credentials'});
    } 
} 


//Middleware for login
async function verifyLogin(req , res , next) {
    const newUser = req.body;
    console.log(newUser)
    if (newUser.username && newUser.password) {
        const [verifyUsername] = await userDB.findUserName(newUser.username);
        if (verifyUsername === undefined) {
            res.status(404).json(`The username ${verifyUsername.username} does not exist`)
        } else {
            const verifyUsernameMd = {};
            req.returnedUser = verifyUsername;
            console.log(verifyUsername)
            next();
        }
    } else {
        res.status(400).json({message: ' Please provide credentials'});
    }
}



module.exports = userRoutes;