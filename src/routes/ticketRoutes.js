const express = require('express');

const {getTickets, createTicket, updateTicket, updateTicketStatus, deleteTicket} = require('../controllers/ticketController');

const router = express.Router();

router.get('/', getTickets);

router.post('/', createTicket);

router.put('/:id', updateTicket);

router.patch('/:id', updateTicketStatus);

router.delete('/:id', deleteTicket);

module.exports = router;