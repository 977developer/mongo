const assert    = require('assert');
const mongoose  = require('mongoose');
const User      = require('../src/user');
const Comment   = require('../src/comment');
const BlogPost  = require('../src/blogPost');

describe('Association', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe       = new User({ name : "Joe" });
    blogPost  = new BlogPost({ title : "JS is Great", content : "Lorem ipsum dolor sit amet" });
    comment   = new Comment( {content : "Congrats on great post"} );

    //Fill in the models
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    //Save data once all the save operations have completed
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it(' saves a relation between a user and a blog post', (done) => {
    User.findOne({name:"Joe"})
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });


  it('Save a full relation graph', (done) => {
    User.findOne({ name : 'Joe' })
      .populate({
        path     : 'blogPosts',
        populate : {
          path   : 'comments',
          model  : 'comment',
          populate : {
            path  : 'user',
            model : 'user'
          }
        }
      }).then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });

});
