const { body } = require('express-validator');
const prisma = require('../config/prisma');
const { json } = require('express');

const registerValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required.")
        .isLength({ max: 150})
        .withMessage("Max length is 150 characters."),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Must be a valid email")
        .custom(async (value) => {
            const user = await prisma.user.findUnique({
                where: {email: value}
            });
            
            if (user) {
                throw new Error("Email already registered.")
            }
            return true;
        }),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 8 })
        .withMessage("Password is must be at least 8 characters."),
    
    body("password_confirmation")
        .notEmpty()
        .withMessage("Password confirmation is required.")
        .custom(  (value, {req}) => {
             if (value !== req.body.password) {
                throw new Error("Password confirmation does not match.");
             };

             return true;
        }),

    body("role")
        .notEmpty()
        .withMessage("Role is required.")
        .isString()
        .withMessage("Role is must be a string.")
        .isIn(["SUPER_ADMIN", "COMPANY_ADMIN", "AGENT", "CUSTOMER"])
        .withMessage("Invalid role."),
];

const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Must be a valid email."),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 8})
        .withMessage("Password is must be at least 8 characters."),
];

module.exports = {
    registerValidator,
    loginValidator,
}