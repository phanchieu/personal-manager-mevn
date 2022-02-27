const { Role } = require('../models/Role.model');

const getAllRoles = (req, res, next) => {
  return Role.find()
    .then((role) => res.status(200).json(role))
    .catch((err) => res.status(500).json(err));
};

const getRoleInfo = (req, res, next) => {
  const { name, description } = req.query.Role;
  console.log('Role');
  return Role.find({ name: req.query.Role })
    .then((role) => {
      if (!role) {
        return Promise.reject({
          status: 404,
          message: 'Role not found',
        });
      }

      return res.status(200).json(role);
    })
    .catch((err) => res.status(500).json(err));
};

const createRole = (req, res, next) => {
  const { name, description } = req.body;
  Role.create({ name, description })
    .then((role) => res.status(201).json(role))
    .catch((err) => res.status(500).json(err));
};

const updateRole = (req, res, next) => {
  const { id } = req.params;
  console.log('Role', id);
  console.log('object', req.Role);
  const { name, description } = req.body;
  Role.findById(id)
    .then((role) => {
      if (!role) {
        return Promise.reject({ status: 404, message: 'Role Not Found' });
      }
      role.name = name;
      role.description = description;

      return role.save();
    })
    .then((role) => res.status(200).json(role))
    .catch((err) => res.status(500).json(err));
};

const deleteRole = (req, res, next) => {
  const { id } = req.params;
  let _Role;
  Role.findById(id)
    .then((role) => {
      if (!role) {
        return Promise.reject({
          status: 404,
          message: 'Role Not Found',
        });
      }
      _Role = Role;
      return Role.deleteOne();
    })
    .then(() => res.status(200).json({ message: 'Delete successfully' }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports = {
  getAllRoles,
  getRoleInfo,
  createRole,
  updateRole,
  deleteRole,
};
