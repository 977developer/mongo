const assert = require('assert');
const User   = require('../src/user');

describe('Sub Documents', () => {
  it('can create a sub document', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [ {title : 'PostTitle'} ]
    });

    joe.save()
      .then( () => User.findOne({name : "Joe" }) )
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });


  it('Can add sub documents to existing user', (done) => {
    const joe = new User({
      name : "Joe",
      posts: []
    });

    joe.save()
      .then( () => User.findOne({name : "Joe"}) )
      .then((user) => {
        //add post to the model
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then( () => User.findOne({name : "Joe"}) )
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('Can remove existing sub documents', (done) => {
    const joe = new User({
      name : "Joe",
      posts: [{title : "New Title"}]
    });

    joe.save()
      .then( () => User.findOne({name : "Joe"}) )
      .then((user) => {
        //Remove document
        const post = user.posts[0];
        post.remove();
        //remember after post has been removed, user has to be saved
        return user.save();
      })
      .then( () => User.findOne({name : "Joe"}) )
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
