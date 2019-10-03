const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Candidate = require('../models/Candidate');

// @route   GET api/candidate
// @desc    Check if candidate exists
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const candidate = await Candidate.findOne({
      user: req.user.id,
      git_account_id: req.params.id
    });

    if (candidate) {
      // Countermeasure for those savy enough out there to cause trouble
      if (candidate.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Unauthorized' });
      }
      return res.json({ msg: 'This candidate exists in your directory' });
    }

    res.json({ msg: 'Does not exist' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
