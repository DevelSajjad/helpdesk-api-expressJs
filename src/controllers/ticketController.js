const AppError = require('../utils/AppError');

const getTickets = (req, res) => {
    res.status(200).json({
        message: "All tickets"
    })
}

const createTicket = (req, res) => {
    const {subject, priority, status} = req.body;
    res.status(201).json({
        message: "Ticket created successfully",
        ticket: {
            "subject": "Cannot login",
            "priority": "high",
            "status": "open"
        }
    })
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