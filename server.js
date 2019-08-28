const express = require('express');
const server = express();
const port = 9000;

const protectedRoutes = require('./routes/protectedRoutes');
const userRoutes = require('./routes/userRoutes');

server.use(express.json());


server.use('/api/users', protectedRoutes);
server.use('/api' , userRoutes);

server.get('/', (req,res) => {
    res.send('<h1>Server Up and running...</h1>')
})

server.listen(port , (req,res) => {
    console.log(`Server listening on port: ${port}`)
})

module.exports = server;