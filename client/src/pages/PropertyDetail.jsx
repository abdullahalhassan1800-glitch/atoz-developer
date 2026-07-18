import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyAPI, contactAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheck, FaArrowLeft, FaBuilding, FaCalendar, FaCar, FaSwimmingPool, FaWifi } from 'react-icons/fa';

const PropertyDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiry, setInquiry] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    propertyAPI.getOne(id)
      .then(res => { setProperty(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleInquiry = async (e) => {
    e.preventDefault();
    try {
      await contactAPI.send({ ...inquiry, property: id });
      setSent(true);
      setInquiry({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const featureIcons = {
    parking: FaCar, pool: FaSwimmingPool, wifi: FaWifi, furnished: FaBuilding, 'year built': FaCalendar,
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
        <Link to="/properties" className="text-blue-700 hover:underline">Back to Properties</Link>
      </div>
    </div>
  );

  const images = property.images?.length > 0 ? property.images : [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/properties" className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-6">
          <FaArrowLeft /> Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-md">
              <div className="h-96 relative">
                <img src={images[activeImage]} alt={property.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-4 py-2 text-sm font-semibold rounded-full ${property.type === 'sale' ? 'bg-blue-700 text-white' : 'bg-amber-500 text-white'}`}>
                    For {property.type === 'sale' ? 'Sale' : 'Rent'}
                  </span>
                  <span className={`px-4 py-2 text-sm font-semibold rounded-full capitalize ${property.status === 'available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {property.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 p-3 overflow-x-auto">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition ${activeImage === i ? 'border-blue-700' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                  <p className="text-gray-500 flex items-center gap-1 mt-1">
                    <FaMapMarkerAlt className="text-blue-500" /> {property.address}, {property.city}, {property.state}
                  </p>
                </div>
                <span className="text-2xl font-bold text-blue-700">{formatPrice(property.price)}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <FaBed className="text-blue-700 text-xl mx-auto mb-1" />
                  <span className="text-sm font-semibold text-gray-900">{property.beds}</span>
                  <p className="text-xs text-gray-500">Beds</p>
                </div>
                <div className="text-center">
                  <FaBath className="text-blue-700 text-xl mx-auto mb-1" />
                  <span className="text-sm font-semibold text-gray-900">{property.baths}</span>
                  <p className="text-xs text-gray-500">Baths</p>
                </div>
                <div className="text-center">
                  <FaRulerCombined className="text-blue-700 text-xl mx-auto mb-1" />
                  <span className="text-sm font-semibold text-gray-900">{property.area}</span>
                  <p className="text-xs text-gray-500">Sq Ft</p>
                </div>
                <div className="text-center">
                  <FaBuilding className="text-blue-700 text-xl mx-auto mb-1" />
                  <span className="text-sm font-semibold text-gray-900 capitalize">{property.propertyType}</span>
                  <p className="text-xs text-gray-500">Type</p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>

              {/* Features */}
              {property.features?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheck className="text-green-500 text-xs" /> {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nearby Places */}
              {property.nearbyPlaces?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Nearby Places</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.nearbyPlaces.map((place, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-sm font-medium text-gray-900">{place.name}</span>
                        <span className="text-xs text-gray-500">{place.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            {property.agent && (
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Listed By</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
                    {property.agent.name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{property.agent.name}</h4>
                    <p className="text-sm text-gray-500">Property Agent</p>
                  </div>
                </div>
                {property.agent.phone && (
                  <a href={`tel:${property.agent.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700 mb-2">
                    <FaPhone className="text-blue-500" /> {property.agent.phone}
                  </a>
                )}
                <a href={`mailto:${property.agent.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700">
                  <FaEnvelope className="text-blue-500" /> {property.agent.email}
                </a>
              </div>
            )}

            {/* Inquiry Form */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Interested? Send Inquiry</h3>
              {sent ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaCheck className="text-green-500 text-2xl" />
                  </div>
                  <p className="text-green-600 font-semibold">Message Sent!</p>
                  <p className="text-sm text-gray-500 mt-1">We'll get back to you soon</p>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-3">
                  <input type="text" placeholder="Your Name" required value={inquiry.name} onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="email" placeholder="Email" required value={inquiry.email} onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="tel" placeholder="Phone" value={inquiry.phone} onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  <textarea placeholder="Message" rows={3} required value={inquiry.message} onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
                  <button type="submit" className="w-full py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
