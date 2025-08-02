// src/api/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const {
  createTicket,
  getTickets,
  getTicket,
  getAllTickets,
  updateTicket, 
} = require('../controllers/ticketController');
const { protect, agent } = require('../middlewares/authMiddleware');

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
router.post('/', protect, createTicket);

// @desc    Get all tickets for the logged-in user
// @route   GET /api/tickets
// @access  Private
router.get('/', protect, getTickets);

// @desc    Get all tickets (for agents/admins)
// @route   GET /api/tickets/all
// @access  Private/Agent
router.get('/all', protect, agent, getAllTickets);

// @desc    Get a single ticket by ID
// @route   GET /api/tickets/:id
// @access  Private
router.get('/:id', protect, getTicket);


// @desc    Update a ticket (for agents/admins)
// @route   PUT /api/tickets/:id
// @access  Private/Agent
router.put('/:id', protect, agent, updateTicket);

module.exports = router;