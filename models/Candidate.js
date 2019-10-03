const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  git_account_id: {
    type: Number,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('candidate', CandidateSchema);
