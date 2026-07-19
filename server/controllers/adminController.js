const User = require('../models/User');
const Property = require('../models/Property');
const Contact = require('../models/Contact');

exports.getStats = async (req, res) => {
  try {
    const [totalUsers, totalProperties, totalContacts, featuredProperties, saleProperties, rentProperties] = await Promise.all([
      User.countDocuments({}),
      Property.countDocuments({}),
      Contact.countDocuments({}),
      Property.countDocuments({ isFeatured: true }),
      Property.countDocuments({ type: 'sale' }),
      Property.countDocuments({ type: 'rent' }),
    ]);
    res.json({ totalUsers, totalProperties, totalContacts, featuredProperties, saleProperties, rentProperties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;
    let query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
      ];
    }
    const total = await User.countDocuments(query);
    const users = await User.find(query).select('-password').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    res.json({ users, total, totalPages: Math.ceil(total / limit), currentPage: Number(page) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, phone } = req.body;
    const update = {};
    if (name) update.name = name;
    if (email) update.email = email;
    if (role) update.role = role;
    if (phone !== undefined) update.phone = phone;

    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin') return res.status(400).json({ message: 'Cannot delete admin user' });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const { type, status, search, page = 1, limit = 20 } = req.query;
    let query = {};
    if (type) query.type = type;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { city: new RegExp(search, 'i') },
        { address: new RegExp(search, 'i') },
      ];
    }
    const total = await Property.countDocuments(query);
    const properties = await Property.find(query).populate('agent', '-password').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    res.json({ properties, total, totalPages: Math.ceil(total / limit), currentPage: Number(page) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const update = { ...req.body };
    if (update.beds !== undefined) update.beds = Number(update.beds);
    if (update.baths !== undefined) update.baths = Number(update.baths);
    if (update.area !== undefined) update.area = Number(update.area);
    if (update.price !== undefined) update.price = Number(update.price);
    if (update.isFeatured !== undefined) update.isFeatured = update.isFeatured === 'true' || update.isFeatured === true;

    const property = await Property.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const total = await Contact.countDocuments({});
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    res.json({ contacts, total, totalPages: Math.ceil(total / limit), currentPage: Number(page) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
