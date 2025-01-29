const mongoose = require('mongoose');
const Application = require('../models/Application');
const Company = require('../models/Company');
const Interview = require('../models/Interview');
const PointOfContact = require('../models/PointOfContact');

const sampleData = {
    companies: Array.from({ length: 10 }, (_, i) => ({
      name: `Company ${i + 1}`,
      website: `https://company${i + 1}.com`,
      industry: i % 2 === 0 ? 'Technology' : 'Finance'
    })),
  
    pointsOfContact: Array.from({ length: 10 }, (_, i) => ({
      name: `Contact ${i + 1}`,
      position: i % 2 === 0 ? 'HR Manager' : 'Tech Recruiter',
      email: `contact${i + 1}@company${i + 1}.com`,
      phone: `123-456-78${i}0`
    })),
  
    applications: Array.from({ length: 10 }, (_, i) => ({
      position: `Position ${i + 1}`,
      jobType: i % 2 === 0 ? 'Full-time' : 'Contract',
      salary: { min: 100000 + i * 5000, max: 150000 + i * 5000, currency: 'USD' },
      location: { city: `City ${i + 1}`, state: `State ${i + 1}`, country: 'USA', type: i % 2 === 0 ? 'Hybrid' : 'Remote' },
      currentStatus: 'Applied',
      hasApplied: true,
      statusHistory: [{ status: 'Applied', notes: `Application submitted for Position ${i + 1}` }]
    })),
  
    interviews: Array.from({ length: 10 }, (_, i) => ({
      type: i % 2 === 0 ? 'Technical' : 'HR',
      round: i + 1,
      dateTime: new Date(2024, 2, 20 + i, 10, 0),
      duration: 60,
      location: { type: i % 2 === 0 ? 'Remote' : 'OnSite', link: i % 2 === 0 ? `https://meet.company${i + 1}.com` : null },
      status: 'Scheduled',
      interviewers: [{ name: `Interviewer ${i + 1}`, position: i % 2 === 0 ? 'Senior Engineer' : 'HR Manager' }]
    }))
  };
  

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/job-tracker');
    
    // Clear existing data
    await Promise.all([
      Company.deleteMany({}),
      PointOfContact.deleteMany({}),
      Application.deleteMany({}),
      Interview.deleteMany({})
    ]);

    // Insert data
    const companies = await Company.insertMany(sampleData.companies);
    const contacts = await PointOfContact.insertMany(sampleData.pointsOfContact);
    
    const applications = await Application.insertMany(
      sampleData.applications.map((app, i) => ({
        ...app,
        company: companies[i % companies.length]._id,
        pointOfContact: contacts[i % contacts.length]._id
      }))
    );
    
    await Interview.insertMany(
      sampleData.interviews.map((interview, i) => ({
        ...interview,
        applicationId: applications[i % applications.length]._id
      }))
    );

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();