const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');

const getAllDepartments = async (req, res, next) => {
    const { role, companyId } = req.user;
    const whereClause =  {}
    if (role != "SUPER_ADMIN") {
        whereClause.companyId = companyId;
    } 

    try {
        const result = await prisma.department.findMany({
            where: whereClause,
            select:  {
                id: true,
                name: true,
                description: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return res.status(200).json({
            success: true,
            message: "Departments fetched successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getOneDepartment = async (req, res, next) => {
    const { role, companyId } = req.user;
    const { id } = req.params;
    const whereClause =  { id: Number(id) }
    if (role != "SUPER_ADMIN") {
        whereClause.companyId = companyId;
    } 

    try {
        const result = await prisma.department.findFirst({
            where: whereClause,
            select:  {
                id: true,
                name: true,
                description: true,
            }
        })

        return res.status(200).json({
            success: true,
            message: "Departments fetched successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const createDepartment = async (req, res, next) => {
    const {name, description } = req.body;
    const {companyId} = req.user;

    if (!companyId) {
        return next( new AppError("Company information is missing", 400));
    }

    try {
        const result = await prisma.$transaction(
            async (tx) =>  {
                const department = await tx.department.create({
                    data: {
                        companyId,
                        name,
                        description,
                    },

                    select: {
                        id: true,
                        name:  true,
                        description: true,
                        createdAt: true,
                        companyId: true,
                        company: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                })

                return {
                    department
                }
            }
        )

        return res.status(201).json({
            success: true,
            message: "Department created successfully",
            result: result
        })
    } catch (error) {
        next(error)
    }
}

const updateDepartment = async (req, res, next) => {
    const {name, description } = req.body;
    const { id } = req.params;
    const {companyId} = req.user;

    if (!companyId) {
        return next( new AppError("Company information is missing", 400));
    }

    const existingDepartment = await prisma.department.findFirst({
        where: {
            id: Number(id),
            companyId: companyId
        }
    })

    if (!existingDepartment) {
        return next( new AppError("Department not found", 404));
    }

    try {
        const result = await prisma.$transaction(
            async (tx) =>  {
                const department = await tx.department.update({
                    where:  {
                        id: Number(id),
                        companyId: companyId
                    },
                    data: {
                        name,
                        description,
                    }
                })

                return {
                    department
                }
            }
        )

        return res.status(201).json({
            success: true,
            message: "Department updated successfully",
            result: result
        })
    } catch (error) {
        next(error)
    }
}

const deleteDepartment = async (req, res, next) => {
    const { id }  = req.params;
    const { companyId } =  req.user;

    if (!companyId) {
        return next( new AppError("Comapany information is missing", 400));
    }

    try {
        const result = await prisma.$transaction(
            async (tx) => {
                const department = await tx.department.findFirst({
                    where: {
                        id: Number(id),
                        companyId: companyId
                    }
                });

                if (!department) {
                    return next( new AppError("Department not found", 404));
                }

                await tx.department.delete({
                    where: {
                        id: Number(id),
                        companyId: companyId
                    }
                });

                return { success: true  };
            }
        )

        return res.status(200).json({
            success: true,
            message: "Department deleted successfully",
            delete: result
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllDepartments,
    getOneDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment,

}