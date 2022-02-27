const express = require('express');
const {
  getAllContracts,
  getContractInfo,
  createContract,
  updateContract,
  deleteContract,
} = require('../services/Contract.service');
const router = express.Router();

router.get('/contracts', getAllContracts);
router.get('/contract', getContractInfo);
router.post('/contract', createContract);
router.put('/contract/:id', updateContract);
router.delete('/contract/:id', deleteContract);

module.exports = router;
