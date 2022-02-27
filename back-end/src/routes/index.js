const UserController = require('../controllers/User.controller');
const RoleController = require('../controllers/Role.controller');
const JobController = require('../controllers/Job.controller');
const ContractController = require('../controllers/Contract.controller');
const DepartmentController = require('../controllers/Department.controller');

// Constant
const API = '/api';

function route(app) {
  // Demo API
  app.get('/', (req, res) => {
    res.send('Hello to Personal Manager API!');
  });

  app.use(API, UserController);
  app.use(API, RoleController);
  app.use(API, JobController);
  app.use(API, ContractController);
  app.use(API, DepartmentController);
}

module.exports = route;
