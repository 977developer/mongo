const assert = require('assert');
const User   = require('../src/user');

// Since this code is not asynchronous we do not need done
describe('Validation records', (done) => {
  it('Requires a user name', () => {
    const user = new User({ name : undefined });
    const validationResult = user.validateSync();
    // const message = validationResult.errors.name.message;
    // Alternative syntax
    const { message } = validationResult.errors.name;
    assert(message === 'ERR_NAME_REQUIRED');
  });

  it('Requires a name longer than 2 characters', () => {
    const user = new User({ name : 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'ERR_NAME_TOO_SHORT');
  });


  it('Disallows invalid records from being saved', (done) => {
    const user = new User( { name : 'Ak'} );
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === 'ERR_NAME_TOO_SHORT');
        done();
      });
  });
});
