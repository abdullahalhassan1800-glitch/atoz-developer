const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  message: { type: String, required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
