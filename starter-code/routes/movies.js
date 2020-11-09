const express = require('express');
// const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');


const router = express.Router();

router.get('/movies', (req, res, next) => {
    Movie.find()
        .then(movies => {
            console.log('Retrieved celebrities from DB:', movies);
            res.render('movies/index', { movies: movies });
        })
        .catch(error => console.log('Error while getting the movies from the DB: ', error));
});


router.get('/movies/new', (req, res, next) => {
    res.render('movies/new')
});

router.post('/movies/new', (req, res, next) => {
    console.log(req.body)
    Movie.create({
        title: req.body.title, genre: req.body.genre,
        plot: req.body.plot
    }).then(() => {
        res.redirect('/movies')
    });
});

// router.get('/celebrities/:id', (req, res, next) => {
//     Celebrity.findById(req.params.id)
//         .then(celebrities => {
//             console.log(celebrities);
//             res.render('celebrities/details', { allCelebrities: celebrities });
//         }, function (err) {
//             console.log('Something went wrong!', err);
//         })
//         .catch(err => console.log('The error while searching celebrities occurred: ', err));
// });

// router.post('/celebrities/:id/delete', (req, res) =>{
//     Celebrity.findByIdAndDelete(req.params.id).then(()=>{
//         res.redirect('/celebrities')
//     });
// });





module.exports = router;