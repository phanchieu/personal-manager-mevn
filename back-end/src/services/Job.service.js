const { Job } = require('../models/Job.model');

const getAllJobs = (req, res, next) => {
  return Job.find()
    .then((job) => res.status(200).json(job))
    .catch((err) => res.status(500).json(err));
};

const getJobInfo = (req, res, next) => {
  const { name, salary } = req.query.job;
  console.log('Job');
  return Job.find({ name: req.query.job })
    .then((job) => {
      if (!job) {
        return Promise.reject({
          status: 404,
          message: 'Job not found',
        });
      }

      return res.status(200).json(job);
    })
    .catch((err) => res.status(500).json(err));
};

const createJob = (req, res, next) => {
  const { name, salary } = req.body;
  Job.create({ name, salary })
    .then((job) => res.status(201).json(job))
    .catch((err) => res.status(500).json(err));
};

const updateJob = (req, res, next) => {
  const { id } = req.params;
  console.log('Job', id);
  console.log('object', req.Job);
  const { name, salary } = req.body;
  Job.findById(id)
    .then((job) => {
      if (!job) {
        return Promise.reject({ status: 404, message: 'Job Not Found' });
      }
      job.name = name;
      job.salary = salary;

      return job.save();
    })
    .then((job) => res.status(200).json(job))
    .catch((err) => res.status(500).json(err));
};

const deleteJob = (req, res, next) => {
  const { id } = req.params;
  let _Job;
  Job.findById(id)
    .then((job) => {
      if (!job) {
        return Promise.reject({
          status: 404,
          message: 'Job Not Found',
        });
      }
      _Job = Job;
      return Job.deleteOne();
    })
    .then(() => res.status(200).json({ message: 'Delete successfully' }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports = {
  getAllJobs,
  getJobInfo,
  createJob,
  updateJob,
  deleteJob,
};
