const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Before hook
// Before starting test
before((done) => {
  mongoose.connect('mongodb://localhost:27017/users_test');
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning ', error);
    });
});

//Hook that runs before each test
//Using here to clear data before each test
beforeEach((done) => {

//Remember : blogPosts gets normalized to blogposts by MongoDB
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
