const jwt = require('jsonwebtoken');
const db = require('../config/db');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.findOne({ _id: decoded.id });
    if (!user) return res.status(401).json({ message: 'Token is not valid' });

    const { password, ...userData } = user;
    req.user = userData;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const agentOnly = (req, res, next) => {
  if (req.user.role !== 'agent' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Agent only.' });
  }
  next();
};

module.exports = { auth, agentOnly };
