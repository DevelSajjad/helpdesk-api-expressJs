const express = require('express');
const { getUsers, getUser, createUser } = require('../controllers/userController');

const router = express.Router();

router.get("/", getUsers);

router.get('/:id', getUser);

router.post("/", createUser);

module.exports = router;