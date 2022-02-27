const express = require('express');
const {
  getAllDepartments,
  getDepartmentInfo,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require('../services/Department.service');
const router = express.Router();

router.get('/departments', getAllDepartments);
router.get('/department', getDepartmentInfo);
router.post('/department', createDepartment);
router.put('/department/:id', updateDepartment);
router.delete('/department/:id', deleteDepartment);

module.exports = router;
