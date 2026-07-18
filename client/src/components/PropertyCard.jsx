import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

export default function PropertyCard({ property }) {
  const fmt = (p) => {
    if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)} Cr`;
    if (p >= 100000) return `₹${(p / 100000).toFixed(1)} L`;
    return `₹${p.toLocaleString('en-IN')}`;
  };

  return (
    <Link to={`/property/${property._id}`} className="block">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass-card rounded-2xl overflow-hidden hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 transition-colors duration-500 group"
      >
        <div className="relative h-52 overflow-hidden rounded-t-2xl">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-lg ${property.type === 'sale' ? 'gradient-accent text-white' : 'gradient-warm text-white'}`}>
              {property.type === 'sale' ? 'Sale' : 'Rent'}
            </span>
            <span className="px-2.5 py-1 text-[10px] font-semibold rounded-lg glass text-white backdrop-blur-sm">
              {property.propertyType}
            </span>
          </div>
          {property.status === 'sold' && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 text-[10px] font-semibold rounded-lg bg-red-500/80 text-white backdrop-blur-sm">Sold</span>
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 left-3"
          >
            <span className="text-xl font-bold text-white drop-shadow-lg">{fmt(property.price)}</span>
            {property.type === 'rent' && <span className="text-xs text-white/60 ml-1">/month</span>}
          </motion.div>
        </div>

        <div className="p-4">
          <h3 className="text-[15px] font-semibold text-white group-hover:text-accent transition-colors duration-300 line-clamp-1 mb-1.5">
            {property.title}
          </h3>
          <p className="text-xs font-light text-white/30 flex items-center gap-1 mb-3">
            <FaMapMarkerAlt className="text-accent" /> {property.city}, {property.state}
          </p>

          <div className="flex items-center gap-3 text-xs font-light text-white/30 pt-3 border-t border-white/5">
            <span className="flex items-center gap-1"><FaBed className="text-accent/60" /> {property.beds}</span>
            <span className="flex items-center gap-1"><FaBath className="text-accent/60" /> {property.baths}</span>
            <span className="flex items-center gap-1"><FaRulerCombined className="text-accent/60" /> {property.area} sqft</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
