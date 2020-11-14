const express = require('express');
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
const Actor = require('../models/Actor.model');


const router = express.Router();

router.get('/movies', (req, res, next) => {
    Movie.find()
        .populate('actors')
        .then((movies) => {
            console.log('Retrieved celebrities from DB:', movies);
            res.render('movies/index', { movies: movies });
        })
        .catch(error => console.log('Error while getting the movies from the DB: ', error));
});




router.get('/private', (req, res) =>{
    if (!req.session.user){
        res.redirect('/login')
    } else{
        res.send('Laurence is a little bit crazy')
    }
    });




router.get('/movies/new', (req, res, next) => {
    if (!req.session.user){
        res.redirect('/login')}else{
            // console.log('Userdata:', req.session.user._id)
    Actor.find().then((actorsFromDB) => {
        
        res.render('movies/new', { allActors: actorsFromDB })
   
    });
}
});

router.post('/movies/new', (req, res, next) => {
    console.log(req.body)
    Movie.create({
        title: req.body.title, genre: req.body.genre,
        plot: req.body.plot,
        actors: (req.body.chosenActor),
        userId: (req.session.user._id)
    })
        
        .then(() => {
            res.redirect('/movies')
                .catch(err => console.log(`Err while creating the post in the DB: ${err}`))
        });

});


router.get('/mymovies', (req, res, next) => {
            // console.log('Userdata:', req.session.user._id)
    Movie.find({userId : req.session.user._id})
    .then((movies) => {
        
        res.render('mymovies', { myMovies: movies})
   
    });
});

// router.get('/movies/new', (req, res, next) => {
//     Actor.find().then((actorsFromDB) => {
//         res.render('movies/new', { allActors: actorsFromDB })
//     });
// });

// router.post('/movies/new', (req, res, next) => {
//     console.log(req.body)
//     Movie.create({
//         title: req.body.title, genre: req.body.genre,
//         plot: req.body.plot,
//         actors: (req.body.chosenActor)
//     })
        
//         .then(() => {
//             res.redirect('/movies')
//                 .catch(err => console.log(`Err while creating the post in the DB: ${err}`))
//         });

// });







router.get('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id).populate('actors')
        .then(movies => {
            console.log(movies);
            res.render('movies/details', { movies: movies });
        }, function (err) {
            console.log('Something went wrong!', err);
        })
        .catch(err => console.log('The error while searching movies occurred: ', err));
});

router.post('/movies/:id/delete', (req, res) => {
    Movie.findByIdAndDelete(req.params.id).then(() => {
        res.redirect('/movies')
    });
});




//updating the movie
router.get('/movies/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
    // .populate('actors')
        .then((movies) => {
            Actor.find().then((actorsFromDB)=>{
                // console.log('doesnotwork', movies);
                res.render('movies/edit', { movies: movies ,actorsFromDB})
            })
        });
});

router.post('/movies/:id/edit', (req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title, genre: req.body.genre,
        plot: req.body.plot,
        actors: (req.body.chosenActor)
    }).then(() => {
        res.redirect('/movies')
    });
});


module.exports = router;