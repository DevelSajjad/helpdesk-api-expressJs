const express = require('express');
const { createTicketValidator } = require('../validators/ticketValidator');
const validateMiddleware = require('../middleware/validateMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const {getTickets, getTicket, createTicket, updateTicket, updateTicketStatus, deleteTicket} = require('../controllers/ticketController');

const router = express.Router();

router.get('/', roleMiddleware("SUPER_ADMIN", "CUSTOMER", "AGENT"), getTickets);

router.get('/:id', roleMiddleware("SUPER_ADMIN", "CUSTOMER", "AGENT"), getTicket);

router.post('/', createTicketValidator, validateMiddleware, roleMiddleware("CUSTOMER", "AGENT"), createTicket);

router.put('/:id', updateTicket);

router.patch('/:id', updateTicketStatus);

router.delete('/:id', deleteTicket);

module.exports = router;