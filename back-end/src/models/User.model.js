const mongoose = require('mongoose');
const { API } = require('../constants');

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  avatarUrl: { type: String, default: `${API}/default.png` },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  official: { type: Boolean, default: false },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    default: '6091251bd2dde23467173289',
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default: '60912485d54bd6189c219daf',
  },
  contract: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract',
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
});

const User = mongoose.model('User', UserSchema, 'User');
module.exports = {
  UserSchema,
  User,
};
