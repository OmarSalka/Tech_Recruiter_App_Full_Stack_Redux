const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Candidate = require('../models/Candidate');

// @route   GET api/candidate
// @desc    Check if candidate exists
// @access  Private
router.get('/', auth, async (req, res) => {
  const { git_account_id } = req.body;
  try {
    const candidate = await Candidate.findOne({
      user: req.user.id,
      git_account_id: git_account_id
    });

    if (candidate) {
      // Countermeasure for those savy enough out there to cause trouble
      if (candidate.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Unauthorized' });
      }
      return res.json({ msg: 'This candidate exists in your directory' });
      // return res.json({ candidate: candidate });
    }

    res.json({ msg: 'Does not exist' });
  } catch (err) {
    console.error(err.message);
    console.log(typeof git_account_id);
    console.log(typeof req.user.id);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
