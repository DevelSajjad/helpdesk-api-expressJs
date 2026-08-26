const express = require('express');

const testPrismaDatabase = require('../controllers/databaseConnectionWithPrismaController');

const Router = express.Router();

Router.get('/', testPrismaDatabase);

module.exports = Router;