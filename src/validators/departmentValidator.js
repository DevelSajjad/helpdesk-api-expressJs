const { body } = require("express-validator");

const createDepartmentValidator = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string")
        .isLength({ max: 50}),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string")
        .isLength({ max: 500 })
];

const updateDepartmentValidator = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string")
        .isLength({ max: 50}),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string")
        .isLength({ max: 500 })
];

module.exports = {
    createDepartmentValidator,
    updateDepartmentValidator
}