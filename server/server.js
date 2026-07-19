const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://abdullahalhassan1800-glitch.github.io',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'A TO Z Developer API Running' });
  });
}

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');

    if (process.env.NODE_ENV === 'production') {
      const User = require('./models/User');
      const Property = require('./models/Property');
      const bcrypt = require('bcryptjs');

      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('No data found. Seeding database...');
        const hashedPassword = await bcrypt.hash('password123', 10);

        const admin = await User.create({
          name: 'Admin', email: 'admin@atozdeveloper.com', password: hashedPassword, role: 'admin', phone: '+91 99999 00000',
        });

        const agent = await User.create({
          name: 'A TO Z Developer', email: 'agent@atozdeveloper.com', password: hashedPassword, role: 'agent', phone: '+91 98765 43210',
        });

        await Property.insertMany([
          { title: 'Luxury Villa with Swimming Pool', description: 'Stunning 4BHK luxury villa in Mumbai with private swimming pool, landscaped garden, modular kitchen.', price: 25000000, type: 'sale', status: 'available', propertyType: 'villa', beds: 4, baths: 5, area: 3500, address: '45 Palm Grove Avenue', city: 'Mumbai', state: 'Maharashtra', zipCode: '400001', images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'], features: ['Swimming Pool', 'Garden', 'Modular Kitchen', 'Parking'], nearbyPlaces: [{ name: 'DPS School', type: 'education', distance: '2 km' }], agent: agent._id, isFeatured: true },
          { title: 'Modern Apartment in Cyber City', description: 'Spacious 3BHK apartment in Gurgaon with city views, gym, and club house.', price: 12000000, type: 'sale', status: 'available', propertyType: 'apartment', beds: 3, baths: 2, area: 1800, address: '12 Cyber Hub Tower', city: 'Gurgaon', state: 'Haryana', zipCode: '122002', images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'], features: ['Gym', 'Club House', 'Parking'], nearbyPlaces: [{ name: 'Metro Station', type: 'transport', distance: '500 m' }], agent: agent._id, isFeatured: true },
          { title: 'Sea View Apartment for Rent', description: 'Beautiful 2BHK sea-facing apartment in Bandra. Fully furnished.', price: 65000, type: 'rent', status: 'available', propertyType: 'apartment', beds: 2, baths: 2, area: 1200, address: '88 Marine Drive', city: 'Mumbai', state: 'Maharashtra', zipCode: '400050', images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'], features: ['Fully Furnished', 'Sea View', 'AC'], nearbyPlaces: [{ name: 'Bandra Station', type: 'transport', distance: '1 km' }], agent: agent._id, isFeatured: true },
          { title: 'Independent House in Whitefield', description: 'Spacious 3BHK independent house in Bangalore with parking and garden.', price: 8500000, type: 'sale', status: 'available', propertyType: 'house', beds: 3, baths: 3, area: 2200, address: '23 Rose Garden Lane', city: 'Bangalore', state: 'Karnataka', zipCode: '560066', images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'], features: ['Garden', 'Parking', 'Modular Kitchen'], nearbyPlaces: [{ name: 'Whitefield Metro', type: 'transport', distance: '2 km' }], agent: agent._id, isFeatured: true },
          { title: 'Premium Plot in Noida', description: 'Corner plot in prime Noida location. 120 sq yards, all approvals in place.', price: 15000000, type: 'sale', status: 'available', propertyType: 'plot', beds: 0, baths: 0, area: 1080, address: 'Sector 62, Plot 15', city: 'Noida', state: 'Uttar Pradesh', zipCode: '201301', images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'], features: ['Corner Plot', 'All Approvals'], nearbyPlaces: [{ name: 'Sector 62 Metro', type: 'transport', distance: '1 km' }], agent: agent._id, isFeatured: false },
          { title: 'Cozy 1BHK for Bachelors', description: 'Affordable 1BHK apartment near Hinjewadi IT Park. Fully furnished.', price: 18000, type: 'rent', status: 'available', propertyType: 'apartment', beds: 1, baths: 1, area: 650, address: '7 Green Valley Society', city: 'Pune', state: 'Maharashtra', zipCode: '411057', images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'], features: ['Furnished', 'AC', 'Wifi'], nearbyPlaces: [{ name: 'Hinjewadi IT Park', type: 'office', distance: '1.5 km' }], agent: agent._id, isFeatured: true },
          { title: 'Commercial Office Space in BKC', description: 'Prime commercial office space in Bandra Kurla Complex. 2000 sqft.', price: 50000000, type: 'sale', status: 'available', propertyType: 'commercial', beds: 0, baths: 4, area: 2000, address: 'Tower B, FIFC, BKC', city: 'Mumbai', state: 'Maharashtra', zipCode: '400051', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'], features: ['Furnished', 'Conference Room', 'CCTV'], nearbyPlaces: [{ name: 'BKC Metro', type: 'transport', distance: '500 m' }], agent: agent._id, isFeatured: false },
          { title: 'Beachfront Villa in Goa', description: 'Exquisite 3BHK beachfront villa with private beach access.', price: 35000000, type: 'sale', status: 'available', propertyType: 'villa', beds: 3, baths: 4, area: 4000, address: 'Beach Road, Anjuna', city: 'Goa', state: 'Goa', zipCode: '403509', images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'], features: ['Private Beach', 'Pool', 'Sea Facing'], nearbyPlaces: [{ name: 'Anjuna Beach', type: 'beach', distance: '50 m' }], agent: agent._id, isFeatured: true },
          { title: 'Farm House Near Delhi', description: 'Sprawling 5BHK farmhouse on 2 acres of land.', price: 45000000, type: 'sale', status: 'available', propertyType: 'house', beds: 5, baths: 6, area: 6000, address: 'Chattarpur Road', city: 'New Delhi', state: 'Delhi', zipCode: '110074', images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'], features: ['Pool', 'Orchard', 'Sports Court'], nearbyPlaces: [{ name: 'Chattarpur Metro', type: 'transport', distance: '3 km' }], agent: agent._id, isFeatured: false },
        ]);
        console.log('Database seeded!');
      } else {
        console.log('Database already has data. Skipping seed.');
      }
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

start();
