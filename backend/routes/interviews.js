const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');

// Get all interviews
router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find().populate('applicationId');
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new interview
router.post('/', async (req, res) => {
  const interview = new Interview(req.body);
  try {
    const newInterview = await interview.save();
    res.status(201).json(newInterview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;