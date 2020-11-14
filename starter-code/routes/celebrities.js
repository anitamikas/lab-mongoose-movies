const express = require('express');
const Celebrity = require('../models/Celebrity.model');


const router = express.Router();

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            console.log('Retrieved celebrities from DB:', celebrities);
            res.render('celebrities/index', { allCelebrities: celebrities });
        })
        .catch(error => console.log('Error while getting the celebrities from the DB: ', error));
});


router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new')
});

router.post('/celebrities/new', (req, res, next) => {
    console.log(req.body)
    Celebrity.create({
        name: req.body.name, occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }).then(() => {
        res.redirect('/celebrities')
    });
});

router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(celebrities => {
            console.log(celebrities);
            res.render('celebrities/details', { allCelebrities: celebrities });
        }, function (err) {
            console.log('Something went wrong!', err);
        })
        .catch(err => console.log('The error while searching celebrities occurred: ', err));
});

router.post('/celebrities/:id/delete', (req, res) =>{
    Celebrity.findByIdAndDelete(req.params.id).then(()=>{
        res.redirect('/celebrities')
    });
});


router.get('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id).then((celebrities)=>{
    res.render('celebrities/edit', celebrities)
  });
  });
  
  router.post('/celebrities/:id/edit', (req, res, next) => {
 
    Celebrity.findByIdAndUpdate(req.params.id, {title: req.body.title, occupation: req.body.occupation, 
        catchPhrase: req.body.catchPhrase}).then(()=>{
    res.redirect('/celebrities') 
  });
  });


module.exports = router;