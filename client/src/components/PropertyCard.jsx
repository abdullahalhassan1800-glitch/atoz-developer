import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

export default function PropertyCard({ property }) {
  const fmt = (p) => {
    if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)} Cr`;
    if (p >= 100000) return `₹${(p / 100000).toFixed(1)} L`;
    return `₹${p.toLocaleString('en-IN')}`;
  };

  return (
    <Link to={`/property/${property._id}`} className="group block glass-card rounded-2xl overflow-hidden hover:border-accent/20 transition-all duration-500 hover:shadow-lg hover:shadow-accent/5">
      <div className="relative h-52 overflow-hidden rounded-t-2xl">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-xl font-bold text-white drop-shadow-lg">{fmt(property.price)}</span>
          {property.type === 'rent' && <span className="text-xs text-white/60 ml-1">/month</span>}
        </div>
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
    </Link>
  );
}
