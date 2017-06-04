const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = new Schema({
  title : String
});

//NOTE: We did not create a model for Posts we only created a Schema
//Becauase this is not going to map to a distinct collection of Posts
module.exports = PostSchema;
