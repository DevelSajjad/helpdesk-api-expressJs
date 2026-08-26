const testDatabase = require('../controllers/databaseConnectionController'); 

const express = require('express');

const router = express.Router();

router.get('/', testDatabase);

module.exports = router;

