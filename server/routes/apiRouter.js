const express = require('express');
const router = express.Router();
const users = require('../models/usersModel.js');
const authController = require('../controllers/authController.js');
const { userLogin } = require('../controllers/authController.js');
const homePageController = require('../controllers/homePageController.js');
const userController = require('../controllers/userController.js');

router.post('/signup', authController.createUser, (req, res) => {
  return res.status(200).send('success')
});

router.post('/login', authController.userLogin, (req, res) => {
  return res.status(200).send('success')
});

router.get('/home', homePageController.gameOfTheMonth, (req, res) => {
  return res.status(200).send(res.locals.gotm)
});

router.get('/search', userController.searchInput, (req, res)=> {
  return res.status(200).send(res.locals.searchResult)
})

module.exports = router;