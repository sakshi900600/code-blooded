// src/api/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, admin } = require('../middlewares/authMiddleware');

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
router.post('/', protect, admin, createCategory);

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
router.get('/', getCategories);

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
router.put('/:id', protect, admin, updateCategory);

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;