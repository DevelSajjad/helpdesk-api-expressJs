const AppError = require('../utils/AppError');
const prisma = require("../config/prisma");

const getTickets = (req, res) => {
    res.status(200).json({
        message: "All tickets"
    })
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

const updateTicketStatus = (req, res) => {
    const {id} = req.params;
    const {subject, priority, status} = req.body;
    res.status(200).json({
        message: "Ticket status update successfully",
        ticket: {
            "id": id,
            "status": "close"
        }
    })
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
    updateTicketStatus,
    deleteTicket
};