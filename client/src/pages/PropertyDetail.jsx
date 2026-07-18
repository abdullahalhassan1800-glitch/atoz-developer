import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyAPI, contactAPI } from '../utils/api';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheck, FaArrowLeft, FaBuilding } from 'react-icons/fa';

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(0);
  const [inquiry, setInquiry] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    propertyAPI.getOne(id).then((r) => { setProperty(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  const send = async (e) => {
    e.preventDefault();
    try {
      await contactAPI.send({ ...inquiry, property: id });
      setSent(true);
      setInquiry({ name: '', email: '', phone: '', message: '' });
    } catch (err) { console.error(err); }
  };

  const fmt = (p) => {
    if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)} Cr`;
    if (p >= 100000) return `₹${(p / 100000).toFixed(2)} L`;
    return `₹${p.toLocaleString('en-IN')}`;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="w-10 h-10 border-[3px] border-teal-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Property Not Found</h2>
        <Link to="/properties" className="text-sm text-teal-600 hover:underline">Back to Properties</Link>
      </div>
    </div>
  );

  const images = property.images?.length > 0 ? property.images : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'];

  const input = "w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all";

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link to="/properties" className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium mb-5">
          <FaArrowLeft className="text-xs" /> Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="h-64 sm:h-80 md:h-96 relative">
                <img src={images[img]} alt={property.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${property.type === 'sale' ? 'bg-teal-600 text-white' : 'bg-amber-500 text-white'}`}>
                    For {property.type === 'sale' ? 'Sale' : 'Rent'}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${property.status === 'available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {property.status?.charAt(0).toUpperCase() + property.status?.slice(1)}
                  </span>
                </div>
              </div>
              {images.length > 1 && (
                <div className="flex gap-1.5 p-2 overflow-x-auto">
                  {images.map((i2, i) => (
                    <button key={i} onClick={() => setImg(i)} className={`flex-shrink-0 w-18 h-14 rounded-lg overflow-hidden border-2 transition ${img === i ? 'border-teal-600' : 'border-transparent hover:border-gray-200'}`}>
                      <img src={i2} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{property.title}</h1>
                  <p className="text-sm text-gray-400 flex items-center gap-1 mt-1.5">
                    <FaMapMarkerAlt className="text-teal-500 flex-shrink-0" /> {property.address}, {property.city}, {property.state}
                  </p>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-teal-600 whitespace-nowrap">{fmt(property.price)}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg mb-5">
                {[
                  { icon: FaBed, value: property.beds, label: 'Beds', hide: property.beds === 0 },
                  { icon: FaBath, value: property.baths, label: 'Baths', hide: property.baths === 0 },
                  { icon: FaRulerCombined, value: property.area, label: 'Sq Ft' },
                  { icon: FaBuilding, value: property.propertyType, label: 'Type', cap: true },
                ].filter((x) => !x.hide).map((item, i) => (
                  <div key={i} className="text-center p-2">
                    <item.icon className="text-teal-600 text-sm mx-auto mb-1" />
                    <span className="text-sm font-semibold text-gray-900 block capitalize">{item.value}</span>
                    <p className="text-[11px] text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{property.description}</p>

              {property.features?.length > 0 && (
                <div className="mt-5">
                  <h3 className="font-bold text-gray-900 mb-2">Features</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {property.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-gray-50 rounded-lg">
                        <FaCheck className="text-teal-500 text-[10px] flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {property.nearbyPlaces?.length > 0 && (
                <div className="mt-5">
                  <h3 className="font-bold text-gray-900 mb-2">Nearby Places</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {property.nearbyPlaces.map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">{p.name}</span>
                        <span className="text-[11px] text-gray-400 bg-white px-2 py-0.5 rounded-md">{p.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-5">
            {property.agent && (
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">Listed By</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    {property.agent.name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{property.agent.name}</h4>
                    <p className="text-xs text-gray-400">Property Agent</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {property.agent.phone && (
                    <a href={`tel:${property.agent.phone}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <FaPhone className="text-teal-500 text-xs" /> {property.agent.phone}
                    </a>
                  )}
                  <a href={`mailto:${property.agent.email}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaEnvelope className="text-teal-500 text-xs" /> {property.agent.email}
                  </a>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Send Inquiry</h3>
              {sent ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaCheck className="text-teal-600 text-xl" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Message Sent!</p>
                  <p className="text-xs text-gray-400 mt-1">We'll get back to you soon</p>
                </div>
              ) : (
                <form onSubmit={send} className="space-y-2.5">
                  <input type="text" placeholder="Your Name" required value={inquiry.name} onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })} className={input} />
                  <input type="email" placeholder="Email" required value={inquiry.email} onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })} className={input} />
                  <input type="tel" placeholder="Phone" value={inquiry.phone} onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })} className={input} />
                  <textarea placeholder="Message" rows={3} required value={inquiry.message} onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })} className={`${input} resize-none`} />
                  <button type="submit" className="w-full py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
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
}
