const express = require('express');
const {
  getAllRoles,
  getRoleInfo,
  createRole,
  updateRole,
  deleteRole,
} = require('../services/Role.service');
const router = express.Router();

router.get('/roles', getAllRoles);
router.get('/role', getRoleInfo);
router.post('/role', createRole);
router.put('/role/:id', updateRole);
router.delete('/role/:id', deleteRole);

module.exports = router;
