const assert = require('assert');
const User   = require('../src/user');

describe('Updating Records', (done) => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name : "Joe" });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done){
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  //Model Instance Methods

  it('Instance type using set and save', (done) => {
    assertName(joe.set('name', 'Alex').save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(joe.update({'name' : 'Alex'}), done);
  });

  //Class based Methods
  it('Update Function', (done) => {
    assertName(
      User.update({ name : 'Joe' } , { name : 'Alex' }),
      done
    );
  });

  it('findOneAndUpdate', (done) => {
    assertName(
      User.findOneAndUpdate({ name : 'Joe' } , { name : 'Alex' }),
      done
    );
  });

  it('findOneByIdAndUpdate', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id , { name : 'Alex' }),
      done
    );
  });
});
