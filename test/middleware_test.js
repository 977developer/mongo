const mongoose = require('mongoose');
const assert   = require('assert');
const User     = require('../src/user');
const BlogPost = require('../src/blogPost');


describe('Middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe       = new User({ name : "Joe" });
    blogPost  = new BlogPost({ title : "JS is Great", content : "Lorem ipsum dolor sit amet" });

    //Fill in the models
    joe.blogPosts.push(blogPost);

    //Save data once all the save operations have completed
    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it.only('users clean up dangling blogposts on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
 
