const { Contract } = require('../models/Contract.model');

const getAllContracts = (req, res, next) => {
  return Contract.find()
    .then((contract) => res.status(200).json(contract))
    .catch((err) => res.status(500).json(err));
};

const getContractInfo = (req, res, next) => {
  const { type } = req.query.contract;
  console.log('contract');
  return Contract.find({ type: req.query.contract })
    .then((contract) => {
      if (!contract) {
        return Promise.reject({
          status: 404,
          message: 'Contract not found',
        });
      }
      return res.status(200).json(contract);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const createContract = (req, res, next) => {
  const { type, createAt, endDate } = req.body;
  Contract.create({ type, createAt, endDate })
    .then((contract) => res.status(201).json(contract))
    .catch((err) => res.status(500).json(err));
};

const updateContract = (req, res, next) => {
  const { id } = req.params;
  console.log('contract', id);
  console.log('object', req.contract);
  const { type, createAt, endDate } = req.body;
  Contract.findById(id)
    .then((contract) => {
      if (!contract) {
        return Promise.reject({ status: 404, message: 'Contract Not Found' });
      }
      contract.type = type;
      contract.createAt = createAt;
      contract.endDate = endDate;

      return contract.save();
    })
    .then((contract) => res.status(200).json(contract))
    .catch((err) => res.status(500).json(err));
};

const deleteContract = (req, res, next) => {
  const { id } = req.params;
  let _contract;
  Contract.findById(id)
    .then((contract) => {
      if (!contract) {
        return Promise.reject({
          status: 404,
          message: 'Contract Not Found',
        });
      }
      _contract = contract;
      return contract.deleteOne();
    })
    .then(() => res.status(200).json({ message: 'Delete successfully' }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

const create = (contractNew) => {
  return Contract.create(contractNew)
    .then((contract) => {
      if (!contract) {
        return Promise.reject({
          status: 404,
          message: 'ContractService: Create Contract Failed!!!',
        });
      }
      console.log('contractId:', contract._id);
      return contract._id;
    })
    .catch((err) => console.log(err));
};

const update = ({ _id, type, createAt, endDate }) => {
  Contract.findById(_id)
    .then((contract) => {
      if (!contract) {
        return Promise.reject({
          status: 404,
          message: 'ContractService: Update Contract Failed!!!',
        });
      }
      contract.type = type;
      contract.createAt = createAt;
      contract.endDate = endDate;

      console.log('Update Contract Success:', _id);
      contract.save();
    })
    .catch((err) => console.log(err));
};

const remove = (id) => {
  let _contract;
  Contract.findById(id)
    .then((contract) => {
      if (!contract) {
        return Promise.reject({
          status: 404,
          message: 'Contract Not Found',
        });
      }
      _contract = contract;
      contract.deleteOne();
    })
    .then(() => console.log('Delete Contract Success!'))
    .catch((err) => console.log(err));
};

module.exports = {
  getAllContracts,
  getContractInfo,
  createContract,
  updateContract,
  deleteContract,
  create,
  update,
  remove,
};
