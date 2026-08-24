const express = require('express');

const loggerMiddleware = (req, res, next) => {
    console.log('Received request');

    next();
}

module.exports = loggerMiddleware;