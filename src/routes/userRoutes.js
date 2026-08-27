const validateMiddleware = require('../middleware/validateMiddleware');
const { createUserValidator } = require("../validators/createUserValidator");
const express = require('express');
const { getUsers, getUser, createUser, updateUser, updateStatus, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.get("/", getUsers);

router.get('/:id', getUser);

router.post("/", createUserValidator, validateMiddleware, createUser);

router.put('/:id', updateUser);

router.patch('/:id', updateStatus);

router.delete('/:id', deleteUser);

module.exports = router;