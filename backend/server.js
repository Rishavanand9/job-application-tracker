const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const applicationsRouter = require('./routes/applications');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (to be added)
app.use('/api/applications', applicationsRouter); // Ensure the route is prefixed correctly
app.use('/api/interviews', require('./routes/interviews'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});