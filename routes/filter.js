const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Candidate = require('../models/Candidate');

// @route   POST  api/filter
// @desc    Filter Candidates in directory
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { position, login, filterType } = req.body;
    if (filterType === 'or') {
      const filterFields = [];
      if (position) filterFields.push({ position: position });
      if (login) filterFields.push({ login: login });
      const candidates = await Candidate.find({
        user: req.user.id,
        $or: filterFields
      })
        .select('git_account_id notes position -_id')
        .sort({
          date: -1
        });
      res.json(candidates);
    } else if (filterType === 'and') {
      const candidateFields = {};
      if (position) candidateFields.position = position;
      if (login) candidateFields.login = login;
      candidateFields.user = req.user.id;
      const candidates = await Candidate.find(candidateFields)
        .select('git_account_id notes position -_id')
        .sort({
          date: -1
        });
      res.json(candidates);
    }
  } catch (err) {
    console.log(res.error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
