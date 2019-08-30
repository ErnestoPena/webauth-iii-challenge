const jwt = require('jsonwebtoken');


function protected(req , res , next) {
    
    const token = req.headers.authorization;
    console.log(token)
    if (token) {
        jwt.verify(token , 'thisismyhardsecret' , (err, decodedToken) =>{
            if (err) {
                res.status(401).json({message:'something went wrong'})
            } else {
                req.decodedToken = decodedToken;
                next()
            }
        })
    } else {
        res.status(401).json({message: 'You can not pass'})
    }

}

module.exports = protected;