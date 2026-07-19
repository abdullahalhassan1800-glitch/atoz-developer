const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
const { auth, adminOnly } = require('../middleware/auth');

router.use(auth, adminOnly);

router.get('/stats', admin.getStats);
router.get('/users', admin.getUsers);
router.put('/users/:id', admin.updateUser);
router.delete('/users/:id', admin.deleteUser);
router.get('/properties', admin.getProperties);
router.put('/properties/:id', admin.updateProperty);
router.delete('/properties/:id', admin.deleteProperty);
router.get('/contacts', admin.getContacts);
router.delete('/contacts/:id', admin.deleteContact);

module.exports = router;
