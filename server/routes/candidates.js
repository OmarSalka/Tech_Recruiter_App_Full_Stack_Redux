const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Candidate = require('../models/Candidate');

// @route   GET  api/candidates
// @desc    Get all user's candidates
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const candidates = await Candidate.find({ user: req.user.id })
      .select('git_account_id notes position -_id')
      .sort({
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
    check('position', 'Please enter position')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.errors.map(error => error.msg).toString() });
    }

    const { git_account_id, login, position, notes } = req.body;
    try {
      let newCandidate = await Candidate.findOne({
        user: req.user.id,
        git_account_id: git_account_id
      });

      if (newCandidate) {
        return res
          .status(400)
          .json({ msg: 'Candidate already exists in your directory' });
      }

      newCandidate = new Candidate({
        user: req.user.id,
        git_account_id: git_account_id,
        login: login,
        position: position,
        notes: notes
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
  const { notes, position } = req.body;
  // Building candidate object
  const candidateFields = {};
  if (notes) {
    candidateFields.notes = notes;
  } else if (notes === '') candidateFields.notes = '';

  if (position) {
    candidateFields.position = position;
  } else if (position === '') candidateFields.position = '';

  try {
    // let candidate = await Candidate.findById(req.params.id);
    let candidate = await Candidate.findOne({
      user: req.user.id,
      git_account_id: req.params.id
    });

    if (!candidate) {
      return res.status(404).json({ msg: 'Candidate not found' });
    }

    // Counter measure for those savy enough out there to cause trouble
    if (candidate.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    candidate = await Candidate.findOneAndUpdate(
      { user: req.user.id, git_account_id: req.params.id },
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
    let candidate = await Candidate.findOne({
      user: req.user.id,
      git_account_id: req.params.id
    });

    if (!candidate) {
      return res.status(404).json({ msg: 'Candidate not found' });
    }

    // Counter measure for those savy enough out there to cause trouble
    if (candidate.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    await Candidate.findOneAndRemove({
      user: req.user.id,
      git_account_id: req.params.id
    });

    res.json({ msg: 'Candidate Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
