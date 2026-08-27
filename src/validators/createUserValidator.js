const { body } = require("express-validator");
const prisma = require("../config/prisma");

const createUserValidator = [
    body("name")
        .notEmpty()
        .withMessage("Name is required.")
        .isString().withMessage("Name is must be a string.")
        .isLength({ max: 150})
        .withMessage("Name is must be less than 150 characters."),

    body("email")
    .isEmail()
    .withMessage("Must be a valid email address.")
    .notEmpty()
    .withMessage("Email is required.")
    .custom( async (value) => {
        const user = await prisma.user.findUnique({
            where: { email: value}
        });

        if (user) {
            throw new Error("Email already exists.");
        }
        return true;
    }),

    body("role")
    .notEmpty()
    .withMessage("Role is required.")
    .isString()
    .withMessage("Role is must be a string.")
    .isIn(["SUPER_ADMIN",
        "COMPANY_ADMIN",
        "AGENT",
        "CUSTOMER"])
    .withMessage("Role is must be either SUPER_ADMIN, COMPANY_ADMIN, AGENT or CUSTOMER."),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password is must be at least 8 characters."),
];

module.exports = {
    createUserValidator,
}