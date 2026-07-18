const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const existing = await db.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.insert({
      name, email, password: hashedPassword, role: role || 'buyer', phone: phone || '', avatar: '',
      createdAt: new Date().toISOString(),
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    const { password: _, ...userData } = user;
    res.status(201).json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    const { password: _, ...userData } = user;
    res.json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const { password: _, ...userData } = req.user;
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
