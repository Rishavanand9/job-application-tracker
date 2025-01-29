const mongoose = require('mongoose');

const pointOfContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String },
  email: { type: String },
  phone: { type: String },
  notes: { type: String }
});

const PointOfContact = mongoose.model('PointOfContact', pointOfContactSchema);
module.exports = PointOfContact;