const express = require('express');
const router = express.Router();

const Company = require('../models/Company');

// Get all companies
router.get('/', async(req, res) => {
    try{
        const company = await Company.find()
            .populate('name')
            .populate('website');
        res.json(company);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// Create new company
router.post('/', async (req, res) => {
    const company = new Company(req.body);
    try {
      const newCompany = await company.save();
      res.status(201).json(newCompany);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



module.exports = router