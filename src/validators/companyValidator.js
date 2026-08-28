const { body } = require('express-validator');

const companyRegisterValid = [
    body("companyName")
        .notEmpty()
        .withMessage("Company name is required.")
        .isString()
        .withMessage("Should be string.")
        .isLength({max: 100})
        .withMessage("Maximum length 150 characters"),

    body("description")
        .notEmpty()
        .withMessage("Description is required.")
        .isLength({max: 500})
        .withMessage("Maximum length 500 characters"),
    
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Must be a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 8 })
        .withMessage("Password is must be at least 8 characters."),

]

module.exports = {
    companyRegisterValid,
}