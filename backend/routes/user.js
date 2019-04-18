const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');

router.post('/signup',(req,res,next) => {
  bcrypt.hash(req.body.password,10)
    .then(hash=>{
      const user = new User({
        email :req.body.email,
        password :hash
      });
      user.save()
        .then(result =>{
          res.status(201).json({message :'user created'});
        })
        .catch(err =>{
          res.status(500).json({
            error :err
          })
        });
    });


});

router.post('/login',(req,res,next) => {
  let usr ;
  User.findOne({ email: req.body.email})
    .then(user => {
      if(!user){
        return status(401).json({
          message: 'auth failed'
        });
      }
      usr = user;
      bcrypt.compare(req.body.password,user.password);
    })
    .then(result => {
      if (result){
        return status(401).json({
          message: 'auth failed'
        });
      }
      const token = jwt.sign(
        {email :usr.email,userId: usr._id},
        'secret_this_should_be_longer',
        {expiresIn:'1h'}
      );
      res.status(200).json({
        token :token,
        expiresIn : 3600
      });

    })
    .catch(err => {
      return status(401).json({
        message: 'auth failed',
        err : err
      });
    });
});


module.exports = router;
