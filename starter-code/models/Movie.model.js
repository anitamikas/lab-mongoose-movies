
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],
    userId: String
  },
  {
    timestamps: true
  }
);
 


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;