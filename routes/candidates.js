const express = require('express');
const router = express.Router();

// @route   GET  api/candidates
// @desc    Get all user's candidates
// @access  Private
router.get('/', (req, res) => {
  res.send('Get all candidates');
});

// @route   POST  api/candidates
// @desc    Add candidate
// @access  Private
router.post('/', (req, res) => {
  res.send('Add candidate');
});

// @route   PUT  api/candidates/:id
// @desc    Update candidate
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update candidate');
});

// @route   DELETE  api/candidates/:id
// @desc    Delete candidate
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete candidate');
});

module.exports = router;
