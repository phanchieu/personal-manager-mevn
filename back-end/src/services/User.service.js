const { User } = require('../models/User.model');
const ContractService = require('../services/Contract.service');

const getAllUsers = (req, res, next) => {
  console.log('UserService: getAllUsers');

  return User.find()
    .populate('job role contract department')
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json(err));
};

const getAccountInfo = (req, res, next) => {
  console.log('UserService: getAccountInfo');

  const { id } = req.params;
  console.log('account:', id);

  return User.findById(id)
    .populate('job role contract department')
    .then((user) => {
      if (!user) {
        return Promise.reject({
          status: 404,
          message: 'User not found',
        });
      }
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const createUser = async (req, res, next) => {
  console.log('UserService: createUser');

  const {
    username,
    password,
    fullName,
    email,
    address,
    phoneNumber,
    avatarUrl,
    dateOfBirth,
    gender,
    contract,
    department,
  } = req.body;

  await ContractService.create(contract).then((contractId) => {
    const { _id: departmentId } = department;
    console.log('departmentId:', departmentId);

    User.create({
      username,
      password,
      fullName,
      email,
      address,
      phoneNumber,
      avatarUrl,
      dateOfBirth,
      gender,
      contract: contractId,
      department: departmentId,
    })
      .then((user) => res.status(201).json(user))
      .catch((err) => res.status(500).json(err));
  });
};

const updateUser = (req, res, next) => {
  console.log('UserService: updateUser');

  const { id } = req.params;
  console.log('user:', id);
  console.log('object:', req.body);

  const {
    username,
    password,
    fullName,
    email,
    address,
    phoneNumber,
    avatarUrl,
    dateOfBirth,
    gender,
    official,
    job,
    role,
    contract,
    department,
  } = req.body;

  // if (req.file) {
  //   console.log("file")
  //   let avatar = 'http://localhost:9000/' + req.file.filename;
  // }

  User.findById(id)
    .then(async (user) => {
      if (!user) {
        return Promise.reject({ status: 404, message: 'User Not Found' });
      }

      user.username = username;
      user.password = password;
      user.fullName = fullName;
      user.email = email;
      user.address = address;
      user.phoneNumber = phoneNumber;
      user.avatarUrl = avatarUrl;
      user.dateOfBirth = dateOfBirth;
      if (req.file) {
        user.avatarUrl = 'http://localhost:9000/' + req.file.filename;
      }
      user.gender = gender;
      user.official = official;
      user.job = job;
      user.role = role;
      user.department = department;

      // Update Contract
      await ContractService.update(contract);
      return user;
    })
    .then((user) => {
      user.save();
      res.status(200).json(user);
    })
    .catch((err) => res.status(500).json(err));
};

const deleteUser = (req, res, next) => {
  console.log('UserService: deleteUser');

  const { id } = req.params;
  let _user;
  User.findById(id)
    .then(async (user) => {
      if (!user) {
        return Promise.reject({
          status: 404,
          message: 'User Not Found!!!',
        });
      }

      await ContractService.remove(user.contract);
      _user = user;
      return user;
    })
    .then((user) => {
      user.deleteOne();
      res.status(200).json({ message: 'Delete successfully' });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports = {
  getAllUsers,
  getAccountInfo,
  createUser,
  updateUser,
  deleteUser,
};
