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
    <div className="min-h-screen flex items-center justify-center bg-white pt-20">
      <div className="w-8 h-px bg-gold animate-pulse" style={{ width: '40px' }} />
    </div>
  );

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-20">
      <div className="text-center">
        <h2 className="text-2xl font-normal text-charcoal mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Property Not Found</h2>
        <Link to="/properties" className="text-xs font-light text-gold hover:text-gold-dark tracking-[0.15em] uppercase transition-colors">Back to Properties</Link>
      </div>
    </div>
  );

  const images = property.images?.length > 0 ? property.images : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'];
  const input = "w-full px-4 py-3 bg-cream border border-black/10 text-sm font-light text-black/70 placeholder:text-black/30 outline-none focus:border-gold transition-all duration-300";

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/properties" className="inline-flex items-center gap-2 text-xs font-light text-gold hover:text-gold-dark tracking-[0.15em] uppercase transition-colors mb-8">
          <FaArrowLeft className="text-[10px]" /> Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="overflow-hidden border border-black/5">
              <div className="h-72 sm:h-96 md:h-[28rem] relative">
                <img src={images[img]} alt={property.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase ${property.type === 'sale' ? 'bg-gold text-charcoal' : 'bg-charcoal text-white'}`}>
                    For {property.type === 'sale' ? 'Sale' : 'Rent'}
                  </span>
                  <span className={`px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase ${property.status === 'available' ? 'bg-charcoal text-gold' : 'bg-charcoal text-white/60'}`}>
                    {property.status?.charAt(0).toUpperCase() + property.status?.slice(1)}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-3xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{fmt(property.price)}</span>
                </div>
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 p-3 bg-cream overflow-x-auto">
                  {images.map((i2, i) => (
                    <button key={i} onClick={() => setImg(i)} className={`flex-shrink-0 w-20 h-14 overflow-hidden border-2 transition-all duration-300 ${img === i ? 'border-gold' : 'border-transparent hover:border-black/10'}`}>
                      <img src={i2} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 border border-black/5">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-normal text-charcoal leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{property.title}</h1>
                  <p className="text-sm font-light text-black/40 flex items-center gap-1.5 mt-2">
                    <FaMapMarkerAlt className="text-gold" /> {property.address}, {property.city}, {property.state}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-cream mb-6">
                {[
                  { icon: FaBed, value: property.beds, label: 'Beds', hide: property.beds === 0 },
                  { icon: FaBath, value: property.baths, label: 'Baths', hide: property.baths === 0 },
                  { icon: FaRulerCombined, value: property.area, label: 'Sq Ft' },
                  { icon: FaBuilding, value: property.propertyType, label: 'Type', cap: true },
                ].filter((x) => !x.hide).map((item, i) => (
                  <div key={i} className="text-center">
                    <item.icon className="text-gold text-sm mx-auto mb-2" />
                    <span className="text-sm font-light text-charcoal block capitalize">{item.value}</span>
                    <p className="text-[10px] font-light text-black/30 tracking-[0.15em] uppercase mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="w-8 h-px bg-gold/30 mb-6" />
              <h3 className="font-normal text-charcoal mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Description</h3>
              <p className="text-sm font-light text-black/50 leading-relaxed">{property.description}</p>

              {property.features?.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-normal text-charcoal mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Features</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {property.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-light text-black/50 p-3 bg-cream">
                        <FaCheck className="text-gold text-[10px] flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {property.nearbyPlaces?.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-normal text-charcoal mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Nearby Places</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {property.nearbyPlaces.map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-cream">
                        <span className="text-sm font-light text-black/60">{p.name}</span>
                        <span className="text-[10px] font-light text-gold tracking-wider">{p.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {property.agent && (
              <div className="p-6 border border-black/5">
                <h3 className="font-normal text-charcoal mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Listed By</h3>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-charcoal flex items-center justify-center">
                    <span className="text-gold text-lg font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>{property.agent.name?.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-normal text-charcoal text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>{property.agent.name}</h4>
                    <p className="text-[10px] font-light text-black/30 tracking-[0.15em] uppercase mt-0.5">Property Agent</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {property.agent.phone && (
                    <a href={`tel:${property.agent.phone}`} className="flex items-center gap-2.5 text-sm font-light text-black/50 hover:text-gold p-3 hover:bg-cream transition-all duration-300">
                      <FaPhone className="text-gold text-xs" /> {property.agent.phone}
                    </a>
                  )}
                  <a href={`mailto:${property.agent.email}`} className="flex items-center gap-2.5 text-sm font-light text-black/50 hover:text-gold p-3 hover:bg-cream transition-all duration-300">
                    <FaEnvelope className="text-gold text-xs" /> {property.agent.email}
                  </a>
                </div>
              </div>
            )}

            <div className="p-6 border border-black/5">
              <h3 className="font-normal text-charcoal mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Send Inquiry</h3>
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-12 h-px bg-gold mx-auto mb-4" />
                  <p className="text-sm font-normal text-charcoal mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Message Sent!</p>
                  <p className="text-xs font-light text-black/30">We'll get back to you soon</p>
                </div>
              ) : (
                <form onSubmit={send} className="space-y-3">
                  <input type="text" placeholder="Your Name" required value={inquiry.name} onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })} className={input} />
                  <input type="email" placeholder="Email" required value={inquiry.email} onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })} className={input} />
                  <input type="tel" placeholder="Phone" value={inquiry.phone} onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })} className={input} />
                  <textarea placeholder="Message" rows={3} required value={inquiry.message} onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })} className={`${input} resize-none`} />
                  <button type="submit" className="w-full py-3 bg-gold text-charcoal text-xs font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300">
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
