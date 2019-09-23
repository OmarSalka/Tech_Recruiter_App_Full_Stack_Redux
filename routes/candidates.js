const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Candidate = require('../models/Candidate');

// @route   GET  api/candidates
// @desc    Get all user's candidates
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const candidates = await Candidate.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(candidates);
  } catch (err) {
    console.log(res.error);
    res.status(500).send('Server Error');
  }
});

// @route   POST  api/candidates
// @desc    Add candidate
// @access  Private
router.post(
  '/',
  [
    auth,
    check('login', 'Please enter login')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { login } = req.body;
    try {
      let newCandidate = await Candidate.findOne({
        login: login
      });

      if (newCandidate) {
        return res
          .status(400)
          .json({ msg: 'Candidate already exists in your directory' });
      }

      newCandidate = new Candidate({
        user: req.user.id,
        login: login
      });

      const candidate = await newCandidate.save();
      res.json(candidate);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT  api/candidates/:id
// @desc    Update candidate
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { notes } = req.body;

  // Building candidate object
  const candidateFields = {};
  if (notes) candidateFields.notes = notes;

  try {
    let candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ msg: 'Candidate not found' });
    }

    // Counter measure for those savy enough out there to cause trouble
    if (candidate.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      {
        $set: candidateFields
      },
      { new: true }
    );

    res.json(candidate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE  api/candidates/:id
// @desc    Delete candidate
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ msg: 'Candidate not found' });
    }

    // Counter measure for those savy enough out there to cause trouble
    if (candidate.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    await Candidate.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
