const express = require('express');

const router = express.Router();

const {companyRegisterValid} = require('../validators/companyValidator');
const validateMiddleware = require('../middleware/validateMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const { registerCompany } = require('../controllers/companyController');

router.post('/', companyRegisterValid, validateMiddleware, roleMiddleware("SUPER_ADMIN"), registerCompany);

module.exports = router;