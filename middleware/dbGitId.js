// middleware is a function that has access to the request and response cycle and object
const Candidate = require('../models/Candidate');

module.exports = async (req, res, next) => {
  try {
    const candidates = await Candidate.find({ user: req.user.id }).sort({
      date: -1
    });
    // req.json(candidates);
    res.locals.candidates = candidates;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
