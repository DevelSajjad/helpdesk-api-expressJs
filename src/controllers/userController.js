// const pool = require('../config/database');
const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');

const getUsers = async (req, res, next) => {
    try {
        // const [result] = await pool.query("select * from users")

        const results = await prisma.user.findMany({
            orderBy: {
                id : "desc"
            },

            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });

        return res.status(200).json({
            success: true,
            data: results
        });
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },

            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        })
    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    try {
        const {name, email, password, role} = req.body;
        // const [result] = await pool.query(
        //     `
        //         insert into users (
        //             name,
        //             email,
        //             password,
        //             role
        //         )
        //         values (?, ?, ?, ?)
        //     `,
        //     [
        //         name,
        //         email,
        //         password,
        //         role || "customer"
        //     ]
        // );
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role:role || "CUSTOMER"
            },

            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            }
        })

        return res.status(201).json({
            success: true,
            message: "User create successfully",
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    const {id} = req.params;
    const {name, email, role} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!user) {
            return next(new AppError("User not found", 404));
        }
        
        const result = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                role: role || "CUSTOMER"
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        })
        res.status(201).json({
            success: true,
            message: "User update successfully",
            data: result
        })
    } catch (error) {
        next(new AppError(error.message, 500))
    }
};

const updateStatus = async (req, res, next) => {
    const {id} = req.params;
    const {status} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!user) {
            return next(new AppError("User not found", 404));
        }

    
    } catch (error) {
        
    }
    res.status(200).json({
        message: "Status update successfully",
        user: {
            id: id,
            status: status
        }
    })
}

const deleteUser = async (req, res, next) => {
    const {id} = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!user) {
            return next(new AppError("User not found", 404));
        }

        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json({
            message: `${id} this user deleted`
        })
    } catch (error) {
        next(new AppError(error.message, 500));
    }

}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    updateStatus,
    deleteUser
};