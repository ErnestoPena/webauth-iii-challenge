const jwt = require('jsonwebtoken');

function genToken(user) {
    const payload = { username: user.username };
    const secret= "thisismyhardsecret";
    const options= {
            algorithm: "HS256",
            expiresIn: 660
        }
    return jwt.sign(payload , secret , options);
}


module.exports = genToken;