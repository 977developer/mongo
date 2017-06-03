const assert  = require('assert');
const User    = require('../src/user');


describe('Reading users out of the database', () => {
  let joe;
  //Insert a record before finding because the main file clears records everytime
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('Find all user with name of joe', (done) => {
    User.find({ name : "Joe"})
      .then((users) => {
        //Important : _id is an objectId not a string, so use to string
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('Find user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      })
      .catch((err) => {
        console.log('Mocha Error ===> ', err);
        done();
      });
  });
});
