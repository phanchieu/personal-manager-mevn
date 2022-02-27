const express = require('express');
const {
  getAllJobs,
  getJobInfo,
  createJob,
  updateJob,
  deleteJob,
} = require('../services/Job.service');
const router = express.Router();

router.get('/jobs', getAllJobs);
router.get('/job', getJobInfo);
router.post('/job', createJob);
router.put('/job/:id', updateJob);
router.delete('/job/:id', deleteJob);

module.exports = router;
