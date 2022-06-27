const express = require('express');
const router = express.Router();
const users = require('../models/usersModel.js');
const authController = require('../controllers/authController.js');
const { userLogin } = require('../controllers/authController.js');

router.post('/signup', authController.createUser, (req, res) => {
  return res.status(200).send('success')
});

router.post('/login', authController.userLogin, (req, res) => {
  return res.status(200).send('success')
});

module.exports = router;