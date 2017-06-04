const assert  = require('assert');
const User    = require('../src/user');

describe('Virtual Types', () => {
  it('Post count returns number of posts', (done) => {
    //Create a model instance
    const joe = new User({
      name : "Joe",
      posts: [{ title : " PostTitle" }]
    });
    //Save it to database
    joe.save()
      .then( () => User.findOne({'name' : "Joe"}) )
      .then((user) => {
        assert(joe.postCount === 1);
        done();
      });
  });
});
