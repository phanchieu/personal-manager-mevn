const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Role = mongoose.model('Role', RoleSchema, 'Role');

module.exports = {
  RoleSchema,
  Role,
};
