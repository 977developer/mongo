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
//Arrow function not used here because this would be different value
UserSchema.virtual('postCount').get(function(){
  return this.posts.length;
});

//Middleware before remove
//Arrow function not used here because this would be different value
UserSchema.pre('remove', function(next){
  const BlogPost = mongoose.model('blogPost');
  //Here : this === joe
  //In operator
  BlogPost.remove({ _id : { $in : this.blogPosts } })
    .then(() => next()); //Once next is called another middleware is called
});

const User     = mongoose.model('user', UserSchema);
module.exports = User;
