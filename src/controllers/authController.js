const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const register = async (req, res, next) => {
    try {
        const { name, email, password, password_confirmation, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role
            }
        });

        return res.status(201).json({
            success: true,
            message: "Registration successful",
        })
    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email: email},
            select: {email: true, password: true, id: true, role: true, companyId: true}
        });

        
        if (!user ) {
            return next( new AppError("Invalid email or password.", 401));
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next( new AppError("Invalid email or password.", 401));
        }

        //create jwt token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                companyId: user.companyId
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            token: token,
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
                companyId: user.companyId
            }
        })


    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login,
};