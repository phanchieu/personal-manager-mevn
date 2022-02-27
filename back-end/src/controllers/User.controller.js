const express = require('express');
const multer = require('multer');
const path = require('path');
const shortid = require('shortid');

const {
  getAllUsers,
  getAccountInfo,
  createUser,
  updateUser,
  deleteUser,
} = require('../services/User.service');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
});

router.get('/users', getAllUsers);
router.get('/user/:id', getAccountInfo);
router.post('/user', createUser);
router.put('/user/:id', upload.single('avatarUrl'), updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;
