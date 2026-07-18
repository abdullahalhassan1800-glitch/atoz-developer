const express = require('express');
const router = express.Router();
const { createContact, getContacts } = require('../controllers/contactController');
const { auth } = require('../middleware/auth');

router.post('/', createContact);
router.get('/', auth, getContacts);

module.exports = router;
