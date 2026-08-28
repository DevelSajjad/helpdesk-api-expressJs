const express = require("express");
const { registerValidator, loginValidator } = require("../validators/authValidator");
const validateMiddleware = require("../middleware/validateMiddleware");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerValidator, validateMiddleware, register);

router.post("/login", loginValidator, validateMiddleware, login);

module.exports = router;