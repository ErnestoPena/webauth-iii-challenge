const userDB = require('./db-config');

module.exports = {
    insertUser,
    findUserName
}

function insertUser(user) {
    return userDB('users').insert(user);
}

function findUserName(username) {
    return userDB('users').where('username' , '=' , username);
}
