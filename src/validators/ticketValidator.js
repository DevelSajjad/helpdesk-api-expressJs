const { body } = require("express-validator");

const createTicketValidator = [
    body("subject")
        .notEmpty()
        .withMessage("Subject is required.")
        .isString()
        .withMessage("Subject must be a string.")
        .isLength({ max: 150 })
        .withMessage("Subject must be less than 150 characters."),
    body("description")
        .notEmpty()
        .withMessage("Description is required.")
        .isString()
        .withMessage("Description must be a string.")
        .isLength({ max: 1000 })
        .withMessage("Description must be less than 1000 characters."),
    body("priority")
        .notEmpty()
        .withMessage("Priority is required.")
        .isIn(["LOW", "MEDIUM", "HIGH", "EMERGENCY"])
        .withMessage("Priority must be LOW, MEDIUM, HIGH, or EMERGENCY."),
    body("status")
        .notEmpty()
        .withMessage("Status is required.")
        .isIn(["OPEN", "IN_PROGRESS", "WAITING_FOR_CUSTOMER", "RESOLVED", "CLOSED", "ON_HOLD", "CANCELLED"])
        .withMessage("Status must be OPEN, IN_PROGRESS, WAITING_FOR_CUSTOMER, RESOLVED, CLOSED, ON_HOLD, or CANCELLED."),
    body("department_id")
        .notEmpty()
        .withMessage("Department is required.")
        .isInt()
        .withMessage("Department must be an integer."),
];

const createTicketReplyValidator = [
    body("message")
        .trim()
        .notEmpty()
        .withMessage("Message is required.")
        .isString()
        .withMessage("Message must be a string.")
        .isLength({ max: 1000})
        .withMessage("Message must be less than 1000 characters."),
];

const ticketStatusUpdateValidator = [
    body("status")
        .notEmpty()
        .withMessage("Status is required.")
        .isIn(["OPEN", "IN_PROGRESS", "WAITING_FOR_CUSTOMER", "RESOLVED", "CLOSED", "ON_HOLD", "CANCELLED"])
        .withMessage("Status must be OPEN, IN_PROGRESS, WAITING_FOR_CUSTOMER, RESOLVED, CLOSED, ON_HOLD, or CANCELLED."),
];

module.exports = {
    createTicketValidator,
    createTicketReplyValidator,
    ticketStatusUpdateValidator,
}