import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyAPI, contactAPI } from '../utils/api';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheck, FaArrowLeft, FaBuilding } from 'react-icons/fa';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-teal-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
        <Link to="/properties" className="text-teal-700 hover:underline">Back to Properties</Link>
      </div>
    </div>
  );

  const images = property.images?.length > 0 ? property.images : [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/properties" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 mb-6 font-medium text-sm">
          <FaArrowLeft /> Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-md">
              <div className="h-64 sm:h-80 md:h-96 relative">
                <img src={images[activeImage]} alt={property.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-4 py-2 text-sm font-semibold rounded-full shadow-md ${property.type === 'sale' ? 'bg-teal-700 text-white' : 'bg-amber-500 text-white'}`}>
                    For {property.type === 'sale' ? 'Sale' : 'Rent'}
                  </span>
                  <span className={`px-4 py-2 text-sm font-semibold rounded-full shadow-md ${property.status === 'available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {property.status?.charAt(0).toUpperCase() + property.status?.slice(1)}
                  </span>
                </div>
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(i)} className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition ${activeImage === i ? 'border-teal-700' : 'border-transparent hover:border-gray-300'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="mb-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{property.title}</h1>
                  <span className="text-xl sm:text-2xl font-bold text-teal-700 whitespace-nowrap">{formatPrice(property.price)}</span>
                </div>
                <p className="text-gray-500 flex items-center gap-1 mt-2 text-sm">
                  <FaMapMarkerAlt className="text-teal-500 flex-shrink-0" /> {property.address}, {property.city}, {property.state}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6 p-4 bg-gray-50 rounded-xl">
                {[
                  { icon: FaBed, value: property.beds, label: 'Beds', hide: property.beds === 0 },
                  { icon: FaBath, value: property.baths, label: 'Baths', hide: property.baths === 0 },
                  { icon: FaRulerCombined, value: property.area, label: 'Sq Ft' },
                  { icon: FaBuilding, value: property.propertyType, label: 'Type', capitalize: true },
                ].filter(item => !item.hide).map((item, i) => (
                  <div key={i} className="text-center p-2">
                    <item.icon className="text-teal-700 text-lg sm:text-xl mx-auto mb-1" />
                    <span className="text-sm font-semibold text-gray-900 block capitalize">{item.value}</span>
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{property.description}</p>

              {property.features?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Features</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {property.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-gray-50 rounded-lg">
                        <FaCheck className="text-green-500 text-xs flex-shrink-0" /> {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {property.nearbyPlaces?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Nearby Places</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.nearbyPlaces.map((place, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-sm font-medium text-gray-900">{place.name}</span>
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{place.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {property.agent && (
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Listed By</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-700 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {property.agent.name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{property.agent.name}</h4>
                    <p className="text-sm text-gray-500">Property Agent</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {property.agent.phone && (
                    <a href={`tel:${property.agent.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-700 p-2 rounded-lg hover:bg-teal-50 transition">
                      <FaPhone className="text-teal-500" /> {property.agent.phone}
                    </a>
                  )}
                  <a href={`mailto:${property.agent.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-700 p-2 rounded-lg hover:bg-teal-50 transition">
                    <FaEnvelope className="text-teal-500" /> {property.agent.email}
                  </a>
                </div>
              </div>
            )}

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
                  <input type="text" placeholder="Your Name" required value={inquiry.name} onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500" />
                  <input type="email" placeholder="Email" required value={inquiry.email} onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500" />
                  <input type="tel" placeholder="Phone" value={inquiry.phone} onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500" />
                  <textarea placeholder="Message" rows={3} required value={inquiry.message} onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 resize-none"></textarea>
                  <button type="submit" className="w-full py-3 bg-teal-700 text-white font-semibold rounded-xl hover:bg-teal-800 transition shadow-lg hover:shadow-xl">
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
