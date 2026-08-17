const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true, trim: true },
  tagline: { type: String, default: '' },
  description: { type: String, required: true },
  location: {
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    pinCode: { type: String, default: '' },
    landmark: { type: String, default: '' },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
  },
  developer: {
    name: { type: String, default: '' },
    experience: { type: String, default: '' },
    description: { type: String, default: '' },
    deliveredSites: [{
      name: String,
      status: { type: String, default: 'delivered' },
    }],
  },
  plotSizes: [{
    size: String,
    pricePerGaj: Number,
  }],
  startingPrice: { type: Number, default: 0 },
  contact: {
    phone: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    email: { type: String, default: '' },
  },
  features: [{ type: String }],
  amenities: [{
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  }],
  stats: {
    loanPercentage: { type: Number, default: 0 },
    yearsTrust: { type: Number, default: 0 },
    sitesDelivered: { type: Number, default: 0 },
    totalArea: { type: String, default: '' },
  },
  nearbyPlaces: [{
    name: String,
    type: String,
    distance: String,
  }],
  images: [{ type: String }],
  status: { type: String, enum: ['active', 'sold_out', 'coming_soon'], default: 'active' },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

projectSchema.index({ slug: 1 });
projectSchema.index({ isFeatured: 1, status: 1 });

module.exports = mongoose.model('Project', projectSchema);
