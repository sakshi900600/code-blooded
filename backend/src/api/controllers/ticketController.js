// src/api/controllers/ticketController.js
const Ticket = require('../models/Ticket');
const User = require('../models/User');

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
  const { subject, description, category } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const newTicket = new Ticket({
      user: req.user.id,
      subject,
      description,
      category,
      status: 'Open',
    });

    const ticket = await newTicket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get all tickets for the logged-in user
// @route   GET /api/tickets
// @access  Private
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate('category', 'name').sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get all tickets (for agents/admins)
// @route   GET /api/tickets/all
// @access  Private/Agent
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({})
      .populate('user', 'name email')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get a single ticket by ID
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('user', 'name email')
      .populate('category', 'name');

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    // Check if the logged-in user is the owner, an agent, or an admin
    if (
      ticket.user.toString() !== req.user.id &&
      req.user.role !== 'Support Agent' &&
      req.user.role !== 'Admin'
    ) {
      return res.status(403).json({ msg: 'User not authorized to view this ticket' });
    }

    res.json(ticket);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update a ticket (for agents/admins)
// @route   PUT /api/tickets/:id
// @access  Private/Agent
const updateTicket = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    // Check if the ticket is unassigned and assign it to the current agent
    if (!ticket.agent) {
      ticket.agent = req.user.id;
    }

    // Update the status if provided in the request body
    if (status) {
      if (['Open', 'In Progress', 'Resolved', 'Closed'].includes(status)) {
        ticket.status = status;
      } else {
        return res.status(400).json({ msg: 'Invalid status provided' });
      }
    }

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { createTicket, getTickets, getTicket, getAllTickets, updateTicket };