const AppError = require('../utils/AppError');
const prisma = require("../config/prisma");

const getTicketWhereCondition = (req) => {
    const { role, companyId, id } = req.user; 
    const where = {};

    if (role != "SUPER_ADMIN") {
        where.companyId = companyId;
    }

    if (role == "CUSTOMER") {
        where.customerId = id;
    }

    if (role == "AGENT") {
        where.agentId = id;
    }

    return where;
};

const includeRelations = (req) => {
    const { role } = req.user;
    const realtion = {
        department: {
            select: {
                id: true,
                name: true,
            }
        },
    
        customer: {
            select: {
                id: true,
                name: true,
                email: true,
            }
        }
    }

    if (role == "SUPER_ADMIN") {
        realtion.agent = {
            select: {
                id: true,
                name: true,
                email: true,
            }
        }
    }
};

const getTickets = async (req, res, next) => {
    try {
        const result = await prisma.ticket.findMany({
            where : getTicketWhereCondition(req),
            include: includeRelations(req)
        });

        return res.status(200).json({
            success: true,
            message: "Ticket fetch successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const getTicket = async (req, res, next) => {
    try {
        const { id } = req.params;
        const where = getTicketWhereCondition(req);
        where.id = Number(id);
        return res.json(where);
        const result = await prisma.ticket.findMany({
            where : getTicketWhereCondition(req),
            include: includeRelations(req)
        });

        return res.status(200).json({
            success: true,
            message: "Ticket fetch successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const createTicket = async (req, res, next) => {
    const {department_id, subject, description, priority, status} = req.body;
    const { companyId } = req.user;

    try {
        
        if (!companyId) {
            return next(new AppError("Company information is missing", 400));
        }

        const existingDepartment = await prisma.department.findFirst({
            where: {
                id: Number(department_id),
                companyId: companyId
            }
        })

        if (!existingDepartment) {
            return next(new AppError("Department not found", 404));
        }

        const existingCustomer = await prisma.user.findFirst({
            where: {
                id: Number(req.user.id),
                companyId: companyId
            }
        })

        if (!existingCustomer) {
            return next(new AppError("Customer not found", 404));
        }

        const result = await prisma.$transaction(
            async (tx) => {
                const ticket = await tx.ticket.create({
                    data: {
                        subject,
                        description,
                        status,
                        priority,
                        departmentId: existingDepartment.id,
                        companyId: companyId,
                        customerId: req.user.id,
                    }
                });

                const ticketNumber = `T-${String(ticket.id).padStart(6, 0)}`;

                const updateTicket = await tx.ticket.update({
                    where: {
                        id: ticket.id
                    },
                    data: {
                        ticketNumber: ticketNumber
                    }
                })

                return {
                    updateTicket
                }
            }
        )
        res.status(201).json({
            success: true,
            message: "Ticket created successfully",
            ticket: result.updateTicket
        })
    } catch (error) {
        next(error);
    }

}

const updateTicket = (req, res) => {
    const {id} = req.params;
    const {subject, priority, status} = req.body;
    res.status(200).json({
        message: "Ticket update successfully",
        ticket: {
            "id": id,
            "subject": "Cannot login",
            "priority": "high",
            "status": "open"
        }
    })
}

const agentAssignTicket = async (req, res, next) => {
    const {companyId, id: userId } = req.user;
    const {id: ticketId } = req.params;
    const {agentId } = req.body;

    try {
        const agentExist = await prisma.user.findFirst({
            where: {
                id: Number(agentId),
                companyId: Number(companyId),
                role: "AGENT"
            }
        })

        if (!agentAssignTicket) {
            return next(new AppError("Agent not found", 404));
        }

        const ticket = await prisma.ticket.findFirst({
            where: {
                id: Number(ticketId),
                companyId: Number(companyId)
            }
        })

        if (!ticket) {
            return next(new AppError("Ticket not found", 404));
        }

        const assignAgent = await prisma.ticket.update({
            where: {
                id: Number(ticketId),
                companyId: Number(companyId)
            },

            data: {
                agentId: Number(agentId),
                customerId: Number(userId)
            }
        })

        return res.status(200).json({
            success: true,
            message: "This ticket assign the agent",
            data: assignAgent
        })
    } catch (error) {
        next(error);
    }
}

const deleteTicket = (req, res) => {
    const {id} = req.params;

    res.status(200).json({
        message: "Ticket delete successfully",
        ticket: {
            "id": id,
        }
    })
}


module.exports = {
    getTickets,
    createTicket,
    updateTicket,
    agentAssignTicket,
    deleteTicket
};