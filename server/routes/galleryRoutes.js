const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Gallery = require('../models/Gallery');

const GALLERY_PASSWORD = 'atoz@2026';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads', 'gallery');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error('Only JPG, PNG, GIF, WEBP images allowed (max 5MB)'));
};

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter });

function checkAuth(req, res, next) {
  const p = req.query.p || req.headers['x-panel-password'];
  if (p !== GALLERY_PASSWORD) {
    return res.status(401).json({ message: 'Invalid panel password' });
  }
  next();
}

router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ order: 1, createdAt: -1 });
    const images = items.map((item) => ({
      src: item.src,
      title: item.title,
      category: item.category,
      _id: item._id,
    }));
    res.json({ images });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/verify', (req, res) => {
  const p = req.query.p || req.headers['x-panel-password'];
  if (p === GALLERY_PASSWORD) {
    return res.json({ verified: true });
  }
  res.status(401).json({ verified: false });
});

router.post('/upload', checkAuth, upload.array('images', 10), async (req, res) => {
  try {
    const titles = req.body['titles[]'] || req.body.titles || [];
    const categories = req.body['categories[]'] || req.body.categories || [];
    const created = [];

    for (let i = 0; i < (req.files || []).length; i++) {
      const file = req.files[i];
      const title = Array.isArray(titles) ? titles[i] || '' : titles || '';
      const category = Array.isArray(categories) ? categories[i] || 'Site' : categories || 'Site';
      const src = `/uploads/gallery/${file.filename}`;

      const item = await Gallery.create({
        src,
        title: title || file.originalname.replace(/\.[^.]+$/, ''),
        category,
        order: Date.now() + i,
      });
      created.push(item);
    }

    res.json({ success: true, images: created });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/', checkAuth, async (req, res) => {
  try {
    const { src } = req.body;
    if (!src) return res.status(400).json({ message: 'src is required' });

    const item = await Gallery.findOneAndDelete({ src });
    if (!item) return res.status(404).json({ message: 'Image not found' });

    const filename = path.basename(src);
    const filePath = path.join(__dirname, '..', 'uploads', 'gallery', filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
