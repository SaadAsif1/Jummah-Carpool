const mongoose = require('mongoose');
const crypto = require('crypto');

// User Schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    age: {
      type: String,
      trim: true,
      required: true,
      max: 10,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      lowercase: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: 'user',
    },
    resetPasswordLink: {
      data: String,
      default: '',
    },
  },
  { timestamps: true }
); //Created at and Updated at feild automatly generated

// virtual (before saved in schema)
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password; // _ makes sure the variable is just to this function and nothing else (tempory variable)
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    // userSchema will get the hashed password
    return this._password;
  });

// methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password; //true-false
  },

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (err) {
      return '';
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
};

module.exports = mongoose.model('User', userSchema);
