const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  src: { type: String, required: true },
  title: { type: String, default: '' },
  category: { type: String, default: 'Site' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

gallerySchema.index({ order: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);
