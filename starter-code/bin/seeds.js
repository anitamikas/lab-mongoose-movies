const mongoose = require('mongoose');
const Movie = require('../models/Movie.model');
 
const DB_NAME = 'celebs';
 
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});




const movie = [
  {
    title: 'Coding Terror',
    genre: 'Hendrik',
    plot: 'Teaching students the mysteries of coding'
  },
  {
    title: 'I love my mum',
    genre: 'Mir',
    plot: 'Mir tells us the nice stories about his family'
  },
  {
    title: 'Tina and Laurence visiting coding world',
    genre: 'Anita',
    plot: 'Lifo if two Ironhack students and their travel through JavaScript world'
  }

];

Movie.create(movie)
.then(moviesFromDB => {
  console.log(`Created ${moviesFromDB.length} movies`);

  // Once created, close the DB connection
  mongoose.connection.close();
})
.catch(err => console.log(`An error occurred while creating movies from the DB: ${err}`));





// const celebrity = [
//     {
//         name: 'Bugs Bunny',
//         occupation: 'Reporter',
//         catchPhrase: 'What is up doctor?!'
//     },
//     {
//         name: `Kasia Monica`,
//         occupation: 'actress',
//         catchPhrase: 'How are you?'
//     },
//     {
//         name: 'Rihanna',
//         occupation: 'singer',
//         catchPhrase: 'Work, work, work'
//     }

// ];


// Celebrity.create(celebrity)
// .then(celebsFromDB => {
//   console.log(`Created ${celebsFromDB.length} celebrities`);

//   // Once created, close the DB connection
//   mongoose.connection.close();
// })
// .catch(err => console.log(`An error occurred while creating celebs from the DB: ${err}`));

