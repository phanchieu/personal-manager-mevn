const { Department } = require('../models/Department.model');

const getAllDepartments = (req, res, next) => {
  return Department.find()
    .then((department) => res.status(200).json(department))
    .catch((err) => res.status(500).json(err));
};

const getDepartmentInfo = (req, res, next) => {
  const { name } = req.query.department;
  console.log('department');
  return Department.find({ name: req.query.department })
    .then((department) => {
      if (!department) {
        return Promise.reject({
          status: 404,
          message: 'Department not found',
        });
      }

      return res.status(200).json(department);
    })
    .catch((err) => res.status(500).json(err));
};

const createDepartment = (req, res, next) => {
  const { name } = req.body;
  Department.create({ name })
    .then((department) => res.status(201).json(department))
    .catch((err) => res.status(500).json(err));
};

const updateDepartment = (req, res, next) => {
  const { id } = req.params;
  console.log('Department', id);
  console.log('object', req.Department);
  const { name } = req.body;
  Department.findById(id)
    .then((department) => {
      if (!department) {
        return Promise.reject({ status: 404, message: 'Department Not Found' });
      }
      department.name = name;

      return department.save();
    })
    .then((department) => res.status(200).json(department))
    .catch((err) => res.status(500).json(err));
};

const deleteDepartment = (req, res, next) => {
  const { id } = req.params;
  let _department;
  Department.findById(id)
    .then((department) => {
      if (!department) {
        return Promise.reject({
          status: 404,
          message: 'Department Not Found',
        });
      }
      _department = department;
      return Department.deleteOne();
    })
    .then(() => res.status(200).json({ message: 'Delete successfully' }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports = {
  getAllDepartments,
  getDepartmentInfo,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
