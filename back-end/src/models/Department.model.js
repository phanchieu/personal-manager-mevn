const mongoose = require('mongoose');

// Phòng Ban
const DepartmentSchema = mongoose.Schema({
  name: { type: String, required: true },
});

const Department = mongoose.model('Department', DepartmentSchema, 'Department');

module.exports = {
  DepartmentSchema,
  Department,
};
