const express = require('express');
const router = express.Router();
const { getProjects, getProject, getFeaturedProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { auth, agentOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/featured', getFeaturedProjects);
router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', auth, agentOnly, upload.array('images', 10), createProject);
router.put('/:id', auth, agentOnly, updateProject);
router.delete('/:id', auth, agentOnly, deleteProject);

module.exports = router;
