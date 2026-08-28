const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next( new AppError("Authorization header is required", 401));
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return next( new AppError("Token is required", 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
        
    } catch (error) {
        next(error)
    }

}

module.exports = authenticate;