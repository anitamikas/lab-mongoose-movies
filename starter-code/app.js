require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
//const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
//const createError = require('http-errors');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// require database configuration

// new stufff

// we added
const session = require('express-session');

// we added
const MongoStore = require('connect-mongo')(session);


mongoose
  .connect('mongodb://localhost/celebs', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// Set up the database
// require('./configs/db.config');

// Routers


// const app = express();

// we added
app.use(
  session({
    secret: 'doesnt-matter',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 60 }, // 1 hour
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
    })
  })
);

// Express View engine setup




// new stuff finish



// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

const index = require('./routes/index');
app.use('/', index);

const signup = require('./routes/signup.routes');
app.use('/', signup);

// const indexRouter = require('./routes/index');



const celebrities = require('./routes/celebrities');
app.use('/', celebrities);

const movies = require('./routes/movies');
app.use('/', movies);

// app.use('movies', require('./routes/actors'));

const actors = require ('./routes/actors');
app.use('movies', actors);

module.exports = app;
