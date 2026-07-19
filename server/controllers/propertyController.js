const Property = require('../models/Property');
const User = require('../models/User');

exports.getProperties = async (req, res) => {
  try {
    const { city, type, propertyType, minPrice, maxPrice, beds, baths, search, page = 1, limit = 9, sort = '-createdAt' } = req.query;

    let query = {};
    if (city) query.city = new RegExp(city, 'i');
    if (type) query.type = type;
    if (propertyType) query.propertyType = propertyType;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (beds) query.beds = { $gte: Number(beds) };
    if (baths) query.baths = { $gte: Number(baths) };
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { address: new RegExp(search, 'i') },
        { city: new RegExp(search, 'i') },
      ];
    }

    const desc = sort.startsWith('-');
    const field = desc ? sort.substring(1) : sort;
    const sortObj = { [field]: desc ? -1 : 1 };

    const total = await Property.countDocuments(query);
    const skip = (Number(page) - 1) * Number(limit);
    let properties = await Property.find(query).sort(sortObj).skip(skip).limit(Number(limit)).populate('agent', '-password');

    res.json({
      properties,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('agent', '-password');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeaturedProperties = async (req, res) => {
  try {
    const properties = await Property.find({ isFeatured: true, status: 'available' })
      .limit(6)
      .populate('agent', '-password');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProperty = async (req, res) => {
  try {
    const propertyData = { ...req.body, agent: req.user._id };
    if (req.body.nearbyPlaces) {
      try { propertyData.nearbyPlaces = JSON.parse(req.body.nearbyPlaces); } catch {}
    }
    if (req.body.features) {
      try { propertyData.features = JSON.parse(req.body.features); } catch {}
    }
    if (req.body.images) {
      try { propertyData.images = JSON.parse(req.body.images); } catch {}
    }
    if (req.files) propertyData.images = req.files.map(f => f.path);

    propertyData.status = propertyData.status || 'available';
    propertyData.propertyType = propertyData.propertyType || 'house';
    propertyData.beds = Number(propertyData.beds) || 0;
    propertyData.baths = Number(propertyData.baths) || 0;
    propertyData.area = Number(propertyData.area) || 0;
    propertyData.price = Number(propertyData.price) || 0;
    propertyData.isFeatured = propertyData.isFeatured === 'true';

    const property = await Property.create(propertyData);
    await property.populate('agent', '-password');
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('agent', '-password');
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
