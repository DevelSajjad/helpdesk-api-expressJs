const express = require('express');
const { createTicketValidator } = require('../validators/ticketValidator');
const validateMiddleware = require('../middleware/validateMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const {getTickets, createTicket, updateTicket, agentAssignTicket, deleteTicket} = require('../controllers/ticketController');

const router = express.Router();

router.get('/', roleMiddleware("SUPER_ADMIN", "CUSTOMER", "AGENT", "COMPANY_ADMIN"), getTickets);

router.get('/:id', roleMiddleware("SUPER_ADMIN", "CUSTOMER", "AGENT", "COMPANY_ADMIN"), getTickets);

router.post('/', createTicketValidator, validateMiddleware, roleMiddleware("SUPER_ADMIN", "CUSTOMER", "AGENT", "COMPANY_ADMIN"), createTicket);

router.put('/:id', updateTicket);

router.patch('/assign-agent/:id', roleMiddleware("COMPANY_ADMIN"), agentAssignTicket);

router.delete('/:id', roleMiddleware("SUPER_ADMIN","COMPANY_ADMIN"), deleteTicket);

module.exports = router;