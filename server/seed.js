const bcrypt = require('bcryptjs');
const usersDb = require('./config/db');
const propertiesDb = require('./config/dbProperty');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const seed = async () => {
  try {
    await usersDb.remove({}, { multi: true });
    await propertiesDb.remove({}, { multi: true });

    const hashedPassword = await bcrypt.hash('password123', 10);

    const agent = await usersDb.insert({
      name: 'A TO Z Developer',
      email: 'agent@atozdeveloper.com',
      password: hashedPassword,
      role: 'agent',
      phone: '+91 98765 43210',
      avatar: '',
      createdAt: new Date().toISOString(),
    });

    const properties = [
      {
        title: 'Luxury Villa with Swimming Pool',
        description: 'Stunning 4BHK luxury villa in the heart of Mumbai. Features a private swimming pool, landscaped garden, modular kitchen, and premium fittings throughout. Perfect for families looking for a premium lifestyle.',
        price: 25000000, type: 'sale', status: 'available', propertyType: 'villa',
        beds: 4, baths: 5, area: 3500,
        address: '45 Palm Grove Avenue', city: 'Mumbai', state: 'Maharashtra', zipCode: '400001',
        images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'],
        features: ['Swimming Pool', 'Garden', 'Modular Kitchen', 'Parking', '24/7 Security', 'Power Backup'],
        nearbyPlaces: [{ name: 'DPS School', type: 'education', distance: '2 km' }, { name: 'Apollo Hospital', type: 'hospital', distance: '3 km' }, { name: 'Phoenix Mall', type: 'shopping', distance: '1.5 km' }],
        agent: agent._id, isFeatured: true, createdAt: new Date().toISOString(),
      },
      {
        title: 'Modern Apartment in Cyber City',
        description: 'Spacious 3BHK apartment in Gurgaon with city views. Equipped with modern amenities, gym, and club house. Close to metro station and IT parks.',
        price: 12000000, type: 'sale', status: 'available', propertyType: 'apartment',
        beds: 3, baths: 2, area: 1800,
        address: '12 Cyber Hub Tower', city: 'Gurgaon', state: 'Haryana', zipCode: '122002',
        images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'],
        features: ['Gym', 'Club House', 'Parking', 'Power Backup', 'Lift', 'Gated Community'],
        nearbyPlaces: [{ name: 'Metro Station', type: 'transport', distance: '500 m' }, { name: 'Medanta Hospital', type: 'hospital', distance: '4 km' }],
        agent: agent._id, isFeatured: true, createdAt: new Date().toISOString(),
      },
      {
        title: 'Sea View Apartment for Rent',
        description: 'Beautiful 2BHK sea-facing apartment in Bandra. Fully furnished with modern interiors, kitchen appliances, and balcony with Arabian Sea views.',
        price: 65000, type: 'rent', status: 'available', propertyType: 'apartment',
        beds: 2, baths: 2, area: 1200,
        address: '88 Marine Drive', city: 'Mumbai', state: 'Maharashtra', zipCode: '400050',
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
        features: ['Fully Furnished', 'Sea View', 'AC', 'Washing Machine', 'Wifi'],
        nearbyPlaces: [{ name: 'Bandra Station', type: 'transport', distance: '1 km' }],
        agent: agent._id, isFeatured: true, createdAt: new Date().toISOString(),
      },
      {
        title: 'Independent House in Whitefield',
        description: 'Spacious 3BHK independent house in Bangalore with parking and garden. Ideal for families. Close to IT hubs and schools.',
        price: 8500000, type: 'sale', status: 'available', propertyType: 'house',
        beds: 3, baths: 3, area: 2200,
        address: '23 Rose Garden Lane', city: 'Bangalore', state: 'Karnataka', zipCode: '560066',
        images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
        features: ['Garden', 'Parking', 'Servant Room', 'Modular Kitchen'],
        nearbyPlaces: [{ name: 'Whitefield Metro', type: 'transport', distance: '2 km' }],
        agent: agent._id, isFeatured: true, createdAt: new Date().toISOString(),
      },
      {
        title: 'Premium Plot in Noida',
        description: 'Corner plot in a prime location in Noida. 120 sq yards, ideal for constructing your dream home. All approvals in place.',
        price: 15000000, type: 'sale', status: 'available', propertyType: 'plot',
        beds: 0, baths: 0, area: 1080,
        address: 'Sector 62, Plot 15', city: 'Noida', state: 'Uttar Pradesh', zipCode: '201301',
        images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'],
        features: ['Corner Plot', 'All Approvals', 'Road Facing'],
        nearbyPlaces: [{ name: 'Sector 62 Metro', type: 'transport', distance: '1 km' }],
        agent: agent._id, isFeatured: false, createdAt: new Date().toISOString(),
      },
      {
        title: 'Cozy 1BHK for Bachelors',
        description: 'Affordable and well-maintained 1BHK apartment near Hinjewadi IT Park. Fully furnished with all essentials.',
        price: 18000, type: 'rent', status: 'available', propertyType: 'apartment',
        beds: 1, baths: 1, area: 650,
        address: '7 Green Valley Society', city: 'Pune', state: 'Maharashtra', zipCode: '411057',
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
        features: ['Furnished', 'AC', 'Wifi', 'Power Backup', 'Security'],
        nearbyPlaces: [{ name: 'Hinjewadi IT Park', type: 'office', distance: '1.5 km' }],
        agent: agent._id, isFeatured: true, createdAt: new Date().toISOString(),
      },
      {
        title: 'Commercial Office Space in BKC',
        description: 'Prime commercial office space in Bandra Kurla Complex. 2000 sqft with modern infrastructure. Ready to move in.',
        price: 50000000, type: 'sale', status: 'available', propertyType: 'commercial',
        beds: 0, baths: 4, area: 2000,
        address: 'Tower B, FIFC, BKC', city: 'Mumbai', state: 'Maharashtra', zipCode: '400051',
        images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
        features: ['Furnished', 'Conference Room', 'CCTV', 'High Speed Internet'],
        nearbyPlaces: [{ name: 'BKC Metro', type: 'transport', distance: '500 m' }],
        agent: agent._id, isFeatured: false, createdAt: new Date().toISOString(),
      },
      {
        title: 'Beachfront Villa in Goa',
        description: 'Exquisite 3BHK beachfront villa with private beach access. Modern design with traditional Goan architecture.',
        price: 35000000, type: 'sale', status: 'available', propertyType: 'villa',
        beds: 3, baths: 4, area: 4000,
        address: 'Beach Road, Anjuna', city: 'Goa', state: 'Goa', zipCode: '403509',
        images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'],
        features: ['Private Beach', 'Pool', 'Sea Facing', 'Furnished'],
        nearbyPlaces: [{ name: 'Anjuna Beach', type: 'beach', distance: '50 m' }],
        agent: agent._id, isFeatured: true, createdAt: new Date().toISOString(),
      },
      {
        title: 'Farm House Near Delhi',
        description: 'Sprawling 5BHK farmhouse on 2 acres of land. Perfect weekend getaway or permanent residence.',
        price: 45000000, type: 'sale', status: 'available', propertyType: 'house',
        beds: 5, baths: 6, area: 6000,
        address: 'Chattarpur Road', city: 'New Delhi', state: 'Delhi', zipCode: '110074',
        images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
        features: ['Pool', 'Orchard', 'Sports Court', 'Helipad', 'Guest House'],
        nearbyPlaces: [{ name: 'Chattarpur Metro', type: 'transport', distance: '3 km' }],
        agent: agent._id, isFeatured: false, createdAt: new Date().toISOString(),
      },
    ];

    await propertiesDb.insert(properties);
    console.log('Seed data created successfully!');
    console.log('Agent login: agent@atozdeveloper.com / password123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
