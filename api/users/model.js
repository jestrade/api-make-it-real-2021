const mongoose = require('mongoose');

const collection = 'users';

const objectSchema = {
  name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: true, default: true },
};

const options = {
  timestamps: true,
};

const schema = new mongoose.Schema(objectSchema, options);

const User = mongoose.model(collection, schema);

module.exports = User;
