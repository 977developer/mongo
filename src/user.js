const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type : String,
    validate : {
      validator : (name) => name.length > 2,
      message : 'ERR_NAME_TOO_SHORT'
    },
    required : [true, 'ERR_NAME_REQUIRED']
  },
  postCount: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
