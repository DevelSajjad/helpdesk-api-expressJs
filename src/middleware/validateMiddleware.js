const { validationResult } = require("express-validator");

const validateMiddleware = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = {};
        errors.array().forEach((error) => {
          formattedErrors[error.path] = error.msg;
        })

        return res.status(422).json({
            success: false,
            message: "Validation errors",
            errors: formattedErrors
        });
    }

    next();
}

module.exports = validateMiddleware;