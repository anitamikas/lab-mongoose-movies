const express = require('express');
const router  = express.Router();

// const Actor = require('../models/User.model')
// const bcrypt = require('bcryptjs');


// router.get('/', (req, res, next) => {
//   res.render('index');
// });

/* GET home page */
router.get('/', (req, res, next) => {
  if (req.session.user) {
      res.render('index', { username: req.session.user.username })
  } else {
      res.render('index')
  }
});

// router.get('/signup', (req, res)=> {
// res.render('signup')
// });


// router.get('/login', (req, res)=> {
//     res.render('login')
//     });


// router.post('/login', (req, res)=> {
//     console.log('SESSION HERE =========>', req.session); 








module.exports = router;
