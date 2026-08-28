const prisma =  require('../config/prisma');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');

const registerCompany = async (req, res, next) => {
    try {
        const {companyName, description, name, email, password} = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email : email
            }
        })

        if (user) {
            return next(new AppError("This email already registered", 409));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await prisma.$transaction(
           async (tx) => {
                const company = await tx.company.create({
                    data : {
                        name: companyName,
                        description
                    },
                    select:{
                        id: true,
                        name : true,
                    }
                });

                const companyAdmin = await tx.user.create({
                    data: {
                        companyId: company.id,
                        name,
                        email,
                        password: hashedPassword,
                        role: "COMPANY_ADMIN"
                    },

                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        companyId: true,
                        createdAt: true
                    }
                });

                return {
                    company,
                    companyAdmin
                };
           }
        );

        return res.status(201).json({
            success: true,
            message: "Company and Company Admin Created Successful",
            result: result
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerCompany
};