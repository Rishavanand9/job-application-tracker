const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  applicationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Application', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['Technical', 'HR', 'System Design', 'Behavioral', 'Coding', 'Other'],
    required: true 
  },
  round: Number,
  dateTime: { type: Date, required: true },
  duration: Number,
  location: {
    type: { type: String, enum: ['Remote', 'OnSite', 'Hybrid'] },
    link: String,
    address: String
  },
  interviewers: [{
    name: String,
    position: String,
    email: String
  }],
  requirements: [{
    topic: String,
    description: String,
    resources: [String]
  }],
  notes: String,
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'],
    default: 'Scheduled'
  },
  feedback: {
    rating: Number,
    strengths: [String],
    improvements: [String],
    notes: String
  }
}, { timestamps: true });

const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;