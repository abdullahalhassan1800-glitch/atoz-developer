const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  try {
    const { city, status, search, page = 1, limit = 12, sort = '-createdAt' } = req.query;

    let query = {};
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { tagline: new RegExp(search, 'i') },
        { 'location.city': new RegExp(search, 'i') },
        { 'location.address': new RegExp(search, 'i') },
      ];
    }

    const desc = sort.startsWith('-');
    const field = desc ? sort.substring(1) : sort;
    const sortObj = { [field]: desc ? -1 : 1 };

    const total = await Project.countDocuments(query);
    const skip = (Number(page) - 1) * Number(limit);
    const projects = await Project.find(query).sort(sortObj).skip(skip).limit(Number(limit));

    res.json({
      projects,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findOne({ $or: [{ _id: req.params.id }, { slug: req.params.id }] });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isFeatured: true, status: 'active' }).limit(6);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const data = { ...req.body };

    const parseFields = ['features', 'images', 'plotSizes', 'amenities', 'nearbyPlaces'];
    for (const field of parseFields) {
      if (data[field] && typeof data[field] === 'string') {
        try { data[field] = JSON.parse(data[field]); } catch {}
      }
    }
    if (req.body.location && typeof req.body.location === 'string') {
      try { data.location = JSON.parse(req.body.location); } catch {}
    }
    if (req.body.developer && typeof req.body.developer === 'string') {
      try { data.developer = JSON.parse(req.body.developer); } catch {}
    }
    if (req.body.contact && typeof req.body.contact === 'string') {
      try { data.contact = JSON.parse(req.body.contact); } catch {}
    }
    if (req.body.stats && typeof req.body.stats === 'string') {
      try { data.stats = JSON.parse(req.body.stats); } catch {}
    }

    if (!data.slug && data.name) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    if (req.files) data.images = req.files.map(f => f.path);

    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
