const validateMiddleware = require('../middleware/validateMiddleware');
const { createUserValidator } = require("../validators/createUserValidator");
const roleMiddleware = require('../middleware/roleMiddleware');

const express = require('express');
const { getUsers, getUser, createUser, updateUser, updateStatus, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.get("/", getUsers, roleMiddleware("Super_ADMIN", "COMPANY_ADMIN"));

router.get('/:id', getUser, roleMiddleware("Super_ADMIN", "COMPANY_ADMIN"));

router.post("/", createUserValidator, validateMiddleware, roleMiddleware("SUPER_ADMIN", "COMPANY_ADMIN"), createUser);

router.put('/:id', updateUser);

router.patch('/:id', updateStatus);

router.delete('/:id', deleteUser, roleMiddleware("Super_ADMIN", "COMPANY_ADMIN"));

module.exports = router;