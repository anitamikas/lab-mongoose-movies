const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const actorSchema = new Schema(
  {
    name: String,
    age: Number,
    nationality: String
  },
  {
    timestamps: true
  }
);
 
// module.exports = model('Celebrity', celebritySchema);

const Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;