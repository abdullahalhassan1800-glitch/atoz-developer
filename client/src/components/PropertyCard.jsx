import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

export default function PropertyCard({ property }) {
  const fmt = (p) => {
    if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)} Cr`;
    if (p >= 100000) return `₹${(p / 100000).toFixed(1)} L`;
    return `₹${p.toLocaleString('en-IN')}`;
  };

  return (
    <Link to={`/property/${property._id}`} className="group block bg-white overflow-hidden border border-black/5 hover:border-gold/30 transition-all duration-500">
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase ${property.type === 'sale' ? 'bg-gold text-charcoal' : 'bg-charcoal text-white'}`}>
            {property.type === 'sale' ? 'Sale' : 'Rent'}
          </span>
          <span className="px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase bg-white/90 text-charcoal backdrop-blur-sm">
            {property.propertyType}
          </span>
        </div>
        {property.status === 'sold' && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase bg-charcoal/90 text-gold">Sold</span>
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <span className="text-2xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{fmt(property.price)}</span>
          {property.type === 'rent' && <span className="text-xs text-white/60 ml-1">/month</span>}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-base font-normal text-charcoal group-hover:text-gold-dark transition-colors duration-300 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          {property.title}
        </h3>
        <p className="text-xs font-light text-black/40 flex items-center gap-1.5 mb-4">
          <FaMapMarkerAlt className="text-gold" /> {property.city}, {property.state}
        </p>

        <div className="flex items-center gap-4 text-xs font-light text-black/40 pt-4 border-t border-black/5">
          <span className="flex items-center gap-1.5"><FaBed className="text-gold/60" /> {property.beds} Beds</span>
          <span className="flex items-center gap-1.5"><FaBath className="text-gold/60" /> {property.baths} Baths</span>
          <span className="flex items-center gap-1.5"><FaRulerCombined className="text-gold/60" /> {property.area} sqft</span>
        </div>
      </div>
    </Link>
  );
}
