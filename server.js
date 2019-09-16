const express = require('express');

const app = express();

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the Tech Recruiter API...' })
);

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/candidates', require('./routes/candidates'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
