const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['sale', 'rent'], required: true },
  status: { type: String, enum: ['available', 'sold', 'pending'], default: 'available' },
  propertyType: { type: String, enum: ['house', 'apartment', 'villa', 'plot', 'commercial'], default: 'house' },
  beds: { type: Number, default: 0 },
  baths: { type: Number, default: 0 },
  area: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, default: '' },
  zipCode: { type: String, default: '' },
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 },
  images: [{ type: String }],
  virtualTourUrl: { type: String, default: '' },
  floorPlanUrl: { type: String, default: '' },
  nearbyPlaces: [{
    name: String,
    type: String,
    distance: String
  }],
  features: [{ type: String }],
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

propertySchema.index({ city: 1, type: 1, price: 1 });

module.exports = mongoose.model('Property', propertySchema);
