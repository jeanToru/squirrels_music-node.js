const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

router.post('/user', userController.create);
router.post('/user/login', userController.login);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.put('/user/:id', userController.updateUser);
router.post('/user/:email', userController.userLogin);

module.exports = router;