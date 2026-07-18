const express = require('express');
const router = express.Router();
const { getProperties, getProperty, getFeaturedProperties, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const { auth, agentOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/featured', getFeaturedProperties);
router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', auth, agentOnly, upload.array('images', 10), createProperty);
router.put('/:id', auth, agentOnly, updateProperty);
router.delete('/:id', auth, agentOnly, deleteProperty);

module.exports = router;
