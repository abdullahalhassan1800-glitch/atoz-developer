import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyAPI, contactAPI } from '../utils/api';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from '../components/Animations';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen flex items-center justify-center bg-deep">
      <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center bg-deep">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Property Not Found</h2>
        <Link to="/properties" className="text-sm font-medium text-accent hover:text-white transition-colors">Back to Properties</Link>
      </div>
    </div>
  );

  const images = property.images?.length > 0 ? property.images : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'];
  const input = "w-full px-4 py-3 glass rounded-xl text-white text-sm font-light placeholder:text-white/30 outline-none focus:border-accent/50 transition-all";

  return (
    <div className="min-h-screen relative pb-20">
      <div className="absolute inset-0 bg-deep" />
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <FadeIn>
          <Link to="/properties" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-white transition-colors mb-8">
            <FaArrowLeft className="text-xs" /> Back to Properties
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <FadeIn delay={0.1}>
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="h-72 sm:h-96 md:h-[28rem] relative">
                  <img src={images[img]} alt={property.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1 text-[10px] font-semibold rounded-lg ${property.type === 'sale' ? 'gradient-accent text-white' : 'gradient-warm text-white'}`}>
                      For {property.type === 'sale' ? 'Sale' : 'Rent'}
                    </span>
                    <span className={`px-3 py-1 text-[10px] font-semibold rounded-lg glass text-white`}>
                      {property.status?.charAt(0).toUpperCase() + property.status?.slice(1)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-3xl font-bold text-white drop-shadow-lg">{fmt(property.price)}</span>
                  </div>
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto">
                    {images.map((i2, i) => (
                      <button key={i} onClick={() => setImg(i)} className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${img === i ? 'border-accent shadow-lg shadow-accent/20' : 'border-transparent hover:border-white/20'}`}>
                        <img src={i2} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">{property.title}</h1>
                    <p className="text-sm font-light text-white/40 flex items-center gap-1.5 mt-2">
                      <FaMapMarkerAlt className="text-accent" /> {property.address}, {property.city}, {property.state}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 glass rounded-xl mb-6">
                  {[
                    { icon: FaBed, value: property.beds, label: 'Beds', hide: property.beds === 0 },
                    { icon: FaBath, value: property.baths, label: 'Baths', hide: property.baths === 0 },
                    { icon: FaRulerCombined, value: property.area, label: 'Sq Ft' },
                    { icon: FaBuilding, value: property.propertyType, label: 'Type', cap: true },
                  ].filter((x) => !x.hide).map((item, i) => (
                    <div key={i} className="text-center">
                      <item.icon className="text-accent text-sm mx-auto mb-1" />
                      <span className="text-sm font-semibold text-white block capitalize">{item.value}</span>
                      <p className="text-[10px] font-light text-white/30 uppercase tracking-wider">{item.label}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold text-white mb-2">Description</h3>
                <p className="text-sm font-light text-white/40 leading-relaxed">{property.description}</p>

                {property.features?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-white mb-3">Features</h3>
                    <StaggerContainer>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {property.features.map((f, i) => (
                          <StaggerItem key={i}>
                            <div className="flex items-center gap-2 text-sm font-light text-white/50 p-2.5 glass rounded-xl">
                              <FaCheck className="text-accent text-[10px] flex-shrink-0" /> {f}
                            </div>
                          </StaggerItem>
                        ))}
                      </div>
                    </StaggerContainer>
                  </div>
                )}

                {property.nearbyPlaces?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-white mb-3">Nearby Places</h3>
                    <StaggerContainer>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {property.nearbyPlaces.map((p, i) => (
                          <StaggerItem key={i}>
                            <div className="flex items-center justify-between p-3 glass rounded-xl">
                              <span className="text-sm font-light text-white/50">{p.name}</span>
                              <span className="text-[10px] font-medium text-accent">{p.distance}</span>
                            </div>
                          </StaggerItem>
                        ))}
                      </div>
                    </StaggerContainer>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          <div className="space-y-5">
            <FadeIn delay={0.15}>
              {property.agent && (
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-semibold text-white mb-4">Listed By</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-accent/20">
                      {property.agent.name?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{property.agent.name}</h4>
                      <p className="text-xs font-light text-white/30">Property Agent</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {property.agent.phone && (
                      <a href={`tel:${property.agent.phone}`} className="flex items-center gap-2.5 text-sm font-light text-white/50 hover:text-accent p-2.5 rounded-xl hover:bg-white/5 transition-all">
                        <FaPhone className="text-accent text-xs" /> {property.agent.phone}
                      </a>
                    )}
                    <a href={`mailto:${property.agent.email}`} className="flex items-center gap-2.5 text-sm font-light text-white/50 hover:text-accent p-2.5 rounded-xl hover:bg-white/5 transition-all">
                      <FaEnvelope className="text-accent text-xs" /> {property.agent.email}
                    </a>
                  </div>
                </div>
              )}
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Send Inquiry</h3>
                {sent ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-12 h-10 gradient-accent rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-accent/20">
                      <FaCheck className="text-white text-sm" />
                    </div>
                    <p className="text-sm font-semibold text-white">Message Sent!</p>
                    <p className="text-xs font-light text-white/30 mt-1">We'll get back to you soon</p>
                  </motion.div>
                ) : (
                  <form onSubmit={send} className="space-y-3">
                    <input type="text" placeholder="Your Name" required value={inquiry.name} onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })} className={input} />
                    <input type="email" placeholder="Email" required value={inquiry.email} onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })} className={input} />
                    <input type="tel" placeholder="Phone" value={inquiry.phone} onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })} className={input} />
                    <textarea placeholder="Message" rows={3} required value={inquiry.message} onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })} className={`${input} resize-none`} />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 gradient-accent text-white text-sm font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-shadow"
                    >
                      Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
