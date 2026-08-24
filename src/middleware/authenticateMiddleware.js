const authenticate = (req, res, next) => {
    const isAuth = true;
    if (!isAuth) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    next();
}

module.exports = authenticate;