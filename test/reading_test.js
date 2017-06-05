const assert  = require('assert');
const User    = require('../src/user');


describe('Reading users out of the database', () => {
  let joe, maria, alex, zach;
  //Insert a record before finding because the main file clears records everytime
  beforeEach((done) => {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });

    //To call done once all the save are done
    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
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

  //Pagination test
  it.only('can skip and limit the result set', (done) => {
    User.find({}).sort({ name : 1 }).skip(1).limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === "Joe");
        assert(users[1].name === "Maria");
        done();
      });
  });
});
