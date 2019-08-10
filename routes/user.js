const express = require("express");
const users = express.Router();
const cors = require('cors');
const jwt = require(('jsonwebtoken'));
const bcrypt = require('bcrypt');
let User = require('../models/user');

process.env.SECRET_KEY = 'secret';

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email, 
        password: req.body.password,
        created: today
    }

    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password, 10 , function(err, hash) {
                userData.password = hash
                User.create(userData)
                .then(user => {
                    res.json({status: user.email + ' registered!'});
                })
                .catch(err => {
                    res.send(' Error: ' + err);
                })
            });
        } else {
            res.json( {error: 'User already exists' } );
        }
    })
    .catch(err => {
        res.send('Error: ' +  err);
    });
});

users.post('/login', (req, res) => {
    User.findOne({
        email:  req.body.email
    })
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                const payload = {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            }else {
                res.json({error: "User does not exist"});
            }
        }else{
            res.json({error: "User does not exist"});
        }
    })
    .catch(err => {
        res.send('Error: ' +  err);
    })
})

users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    User.findOne({
        _id: decoded._id
    }).then(user => {
        if(user) {
            res.json(user)
        } else {
            res.send("User does not exist");
        }
    })
    .catch(err =>{
        res.send('Error: ' + err)
    })
})

module.exports = users;