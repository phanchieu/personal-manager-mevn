const mongoose = require('mongoose');

// Hợp đồng
const ContractSchema = mongoose.Schema({
  type: { type: String, required: true },
  createdAt: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Contract = mongoose.model('Contract', ContractSchema, 'Contract');

module.exports = {
  ContractSchema,
  Contract,
};
