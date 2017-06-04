const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type        : String,
    validate    : {
      validator : (name) => name.length > 2,
      message   : 'ERR_NAME_TOO_SHORT'
    },
    required    : [true, 'ERR_NAME_REQUIRED']
  },
  //When we create user we can add a post property
  posts         : [PostSchema],
  likes         : Number,
  blogPosts     : [{
    type : Schema.Types.ObjectId,
    ref  : 'blogPost'
  }]
});

//Adding virtual properties to User Schema
UserSchema.virtual('postCount').get(function(){
  return this.posts.length;
});

const User     = mongoose.model('user', UserSchema);
module.exports = User;
