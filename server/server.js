const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'A TO Z Developer API Running' });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
