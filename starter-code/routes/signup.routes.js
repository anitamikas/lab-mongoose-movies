const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs');

router.get('/signup', (req, res)=> {
res.render('signup')
});


router.get('/login', (req, res)=> {
    res.render('login')
    });


router.post('/login', (req, res)=> {
    console.log('SESSION HERE =========>', req.session); //req.session === blabla)
    // const salt = bcrypt.genSaltSync(10);
    // const pwHash = bcrypt.hashSync(req.body.password, salt)

// const hash2 = bcrypt.hashSync(plainPassword2, salt);


User.findOne({ username: req.body.username}).then((user)=>{
    if (!user){
        res.redirect('/login')
    }
    else{
        if (bcrypt.compareSync(req.body.password, user.passwordHash)){
            req.session.user = user
            res.redirect('/')
            // res.send('password coddect - you logged in')
        // }else{

        }
    }
// res.redirect('/')
});

});

// module.exports = router;






router.post('/signup', (req, res)=> {
    const salt = bcrypt.genSaltSync(10);
    const pwHash = bcrypt.hashSync(req.body.password, salt)

// const hash2 = bcrypt.hashSync(plainPassword2, salt);


User.create({ username: req.body.username, passwordHash: pwHash}).then(()=>{
res.redirect('/')
});

});


router.get('/storetest', (req, res)=>
{
    req.session.something = 'Hello test'
    res.send('stored.')
});

router.get('/readsession', (req, res)=>
{
    console.log(req.session)
    res.send('stored.')
});


router.get('/private', (req, res) =>{
if (!req.session.user){
    res.redirect('/login')
} else{
    res.send('Laurence is a little bit crazy')
}
});

router.post('/logout', (req, res) =>{
    req.session.destroy();
    res.redirect('/')
});

module.exports = router;






// router.post('/signup', (req, res)=> {


//     // const hash2 = bcrypt.hashSync(plainPassword2, salt);
//     if (!req.body.username || !pwHash) {
//         res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
//         return;
//       }
//       else{
    
//         const salt = bcrypt.genSaltSync(10);
//         const pwHash = bcrypt.hashSync(req.body.password, salt);
    
//     User.create({ username: req.body.username, passwordHash: pwHash}).then(()=>{
//     res.redirect('/')
//     });
//     }
//     });


