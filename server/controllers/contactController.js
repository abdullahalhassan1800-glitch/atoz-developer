const db = require('../config/dbContact');

exports.createContact = async (req, res) => {
  try {
    const contact = await db.insert({ ...req.body, createdAt: new Date().toISOString() });
    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await db.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
