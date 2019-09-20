const router = require('express').Router();
const Users = require('./authHelpers');
const jwt = require('jsonwebtoken');
const secret = require('../config/secrets')
const bc = require('bcryptjs');
router.post('/register', (req, res) => {
  // implement registration
  const user = req.body
  user.password = bc.hashSync(user.password, 14);
  Users.addUser(user)
  .then(result =>{
    res.status(201).json(result)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body;
  Users.findUser(username)
  .then(user => {
    if(user && bc.compareSync(password, user.password)){
      const token = tokenGen(user);
      res.status(200).json({token})
    } else {
      res.status(401).json({message: "Invalid Credentials"})
    }
   
  })
  .catch(err => {
    res.status(500).json(err)
  }) 
});


function tokenGen(user) {
  const payload = {username: user.username};
  const options = {expiresIn: '1d'}
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
