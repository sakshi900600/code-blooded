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
  const { status, category, sort } = req.query;

  let filter = { user: req.user.id };
  let sortBy = { createdAt: -1 };

  if (status) {
    filter.status = status;
  }
  if (category) {
    filter.category = category;
  }

  if (sort) {
    if (sort === 'replied') {
      sortBy = { 'comments.length': -1 };
    } else if (sort === 'modified') {
      sortBy = { updatedAt: -1 };
    }
  }

  try {
    const tickets = await Ticket.find(filter).populate('category', 'name').sort(sortBy);
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
  const { status, category, sort } = req.query;

  let filter = {};
  let sortBy = { createdAt: -1 };

  if (status) {
    filter.status = status;
  }
  if (category) {
    filter.category = category;
  }

  if (sort) {
    if (sort === 'replied') {
      sortBy = { 'comments.length': -1 };
    } else if (sort === 'modified') {
      sortBy = { updatedAt: -1 };
    }
  }

  try {
    const tickets = await Ticket.find(filter)
      .populate('user', 'name email')
      .populate('category', 'name')
      .sort(sortBy);

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
      .populate('category', 'name')
      .populate('comments.user', 'name');

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

// @desc    Add a comment to a ticket
// @route   POST /api/tickets/:id/comments
// @access  Private
const addComment = async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    // Check if the user is authorized to comment on this ticket (owner, agent, or admin)
    if (
      ticket.user.toString() !== req.user.id &&
      req.user.role !== 'Support Agent' &&
      req.user.role !== 'Admin'
    ) {
      return res.status(403).json({ msg: 'User not authorized to comment on this ticket' });
    }

    const newComment = {
      text,
      user: req.user.id,
    };

    ticket.comments.push(newComment);
    await ticket.save();
    res.status(201).json(ticket.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @desc    Upvote a ticket
// @route   PUT /api/tickets/:id/upvote
// @access  Private
const upvoteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    ticket.upvotes += 1;
    await ticket.save();

    res.json({
      upvotes: ticket.upvotes,
      downvotes: ticket.downvotes,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @desc    Downvote a ticket
// @route   PUT /api/tickets/:id/downvote
// @access  Private
const downvoteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    ticket.downvotes += 1;
    await ticket.save();

    res.json({
      upvotes: ticket.upvotes,
      downvotes: ticket.downvotes,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  getAllTickets,
  updateTicket,
  addComment,
  upvoteTicket,
  downvoteTicket,
};