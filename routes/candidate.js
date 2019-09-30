const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Candidate = require('../models/Candidate');

// @route   GET api/candidates/check
// @desc    Check if candidate exists
// @access  Private
router.get('/', auth, async (req, res) => {
  const { git_account_id } = req.body;
  try {
    let candidate = await Candidate.find({ user: req.user.id }).findOne({
      git_account_id: git_account_id
    });

    if (candidate) {
      // Countermeasure for those savy enough out there to cause trouble
      if (candidate.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Unauthorized' });
      }
      return res.json({ candidate: candidate });
    }

    res.json({ candidate: 'Does not exist' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
