const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  website: { type: String },
  industry: { type: String },
}, { timestamps: true });

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;