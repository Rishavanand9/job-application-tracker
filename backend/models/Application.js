const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  position: { type: String, required: true },
  jobUrl: String,
  jobDescription: String,
  jobType: { 
    type: String, 
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship']
  },
  salary: {
    min: Number,
    max: Number,
    currency: String
  },
  location: {
    city: String,
    state: String,
    country: String,
    type: { type: String, enum: ['Remote', 'OnSite', 'Hybrid'] }
  },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  pointOfContact: { type: mongoose.Schema.Types.ObjectId, ref: 'PointOfContact' },
  postedDate: Date,
  dueDate: Date,
  appliedDate: Date,
  lastActivityDate: { type: Date, default: Date.now },
  hasApplied: { type: Boolean, default: false },
  isEligible: { type: Boolean, default: true },
  currentStatus: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Interview Scheduled', 'Rejected', 
           'Not Pursuing', 'Offer Letter', 'Signed'],
    required: true,
    default: 'Applied'
  },
  statusHistory: [{
    status: String,
    date: { type: Date, default: Date.now },
    notes: String
  }],
  interviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' }],
  preparationTopics: [{
    topic: String,
    category: String,
    status: { 
      type: String, 
      enum: ['Not Started', 'In Progress', 'Completed', 'Need Review'],
      default: 'Not Started'
    },
    priority: { 
      type: String, 
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    resources: [{
      title: String,
      url: String,
      type: String,
      completed: Boolean
    }],
    notes: String,
    lastReviewDate: Date
  }],
  materials: {
    resume: { version: String, url: String },
    coverLetter: { version: String, url: String },
    portfolio: { version: String, url: String },
    otherDocuments: [{
      name: String,
      version: String,
      url: String
    }]
  },
  notes: [{
    content: String,
    date: { type: Date, default: Date.now },
    category: String
  }],
  tags: [String]
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;