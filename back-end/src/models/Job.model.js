const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
  name: { type: String, required: true },
  salary: { type: Number, required: true },
});

const Job = mongoose.model('Job', JobSchema, 'Job');

module.exports = {
  JobSchema,
  Job,
};
