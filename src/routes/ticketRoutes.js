const express = require('express');
const { createTicketValidator, ticketStatusUpdateValidator, createTicketReplyValidator, getTicketsValidator } = require('../validators/ticketValidator');
const validateMiddleware = require('../middleware/validateMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const createUploader = require('../middleware/createUploader');

const {getTickets, createTicket, updateTicket, agentAssignTicket, deleteTicket, getTicketReplies, createTicketReply, ticketStatusUpdate, getDashboardStatisticsData, uploadTicketAttachment, getTicketAttachments, downloadTicketAttachment} = require('../controllers/ticketController');

const router = express.Router();

router.get('/dashboard-statistics', roleMiddleware("SUPER_ADMIN", "CUSTOMER", "AGENT", "COMPANY_ADMIN"), getDashboardStatisticsData);

router.get('/', getTicketsValidator, validateMiddleware, roleMiddleware("SUPER_ADMIN", "CUSTOMER", "AGENT", "COMPANY_ADMIN"), getTickets);

router.get('/:id', roleMiddleware("SUPER_ADMIN", "CUSTOMER", "AGENT", "COMPANY_ADMIN"), getTickets);

router.post('/', createTicketValidator, validateMiddleware, roleMiddleware("SUPER_ADMIN", "CUSTOMER", "AGENT", "COMPANY_ADMIN"), createTicket);

router.put('/:id', updateTicket);

router.patch('/assign-agent/:id', roleMiddleware("COMPANY_ADMIN"), agentAssignTicket);

router.delete('/:id', roleMiddleware("SUPER_ADMIN","COMPANY_ADMIN"), deleteTicket);

router.get('/replies/:id', roleMiddleware("COMPANY_ADMIN", "AGENT", "CUSTOMER"), getTicketReplies);

router.post('/replies/:id', createTicketReplyValidator, validateMiddleware, roleMiddleware("COMPANY_ADMIN", "AGENT", "CUSTOMER"), createTicketReply);

router.patch('/replies/status/:id', ticketStatusUpdateValidator, validateMiddleware, roleMiddleware("COMPANY_ADMIN", "AGENT", "CUSTOMER"), ticketStatusUpdate);

router.post('/attachment/:id', createUploader("ticket").single("attachment"), roleMiddleware("COMPANY_ADMIN", "AGENT", "CUSTOMER"), uploadTicketAttachment);

router.get('/attachments/:id', roleMiddleware("COMPANY_ADMIN", "AGENT", "CUSTOMER"), getTicketAttachments);

router.get('/attachments/:id/:attachmentId', roleMiddleware("COMPANY_ADMIN", "AGENT", "CUSTOMER"), downloadTicketAttachment);

module.exports = router;