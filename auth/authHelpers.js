const db = require('../database/dbConfig');

module.exports = {
    addUser,
    findUser
}

function addUser(user) {
    return db('users').insert(user).then(result => result)
}

function findUser(username) {
    return db('users').where({username}).first().then(user => user)
}