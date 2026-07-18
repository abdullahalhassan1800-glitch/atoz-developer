import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

export default function PropertyCard({ property }) {
  const fmt = (p) => {
    if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)} Cr`;
    if (p >= 100000) return `₹${(p / 100000).toFixed(1)} L`;
    return `₹${p.toLocaleString('en-IN')}`;
  };

  return (
    <Link to={`/property/${property._id}`} className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="relative h-52 overflow-hidden">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${property.type === 'sale' ? 'bg-teal-600 text-white' : 'bg-amber-500 text-white'}`}>
            {property.type === 'sale' ? 'Sale' : 'Rent'}
          </span>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/90 text-gray-700 capitalize backdrop-blur-sm">
            {property.propertyType}
          </span>
        </div>
        {property.status === 'sold' && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-red-600 text-white">Sold</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-1 mb-1">
          {property.title}
        </h3>
        <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
          <FaMapMarkerAlt className="text-teal-500" /> {property.city}, {property.state}
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 pb-3 border-b border-gray-100">
          <span className="flex items-center gap-1"><FaBed className="text-gray-400" /> {property.beds}</span>
          <span className="flex items-center gap-1"><FaBath className="text-gray-400" /> {property.baths}</span>
          <span className="flex items-center gap-1"><FaRulerCombined className="text-gray-400" /> {property.area} sqft</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-teal-600">{fmt(property.price)}</span>
          {property.type === 'rent' && <span className="text-[11px] text-gray-400">/month</span>}
        </div>
      </div>
    </Link>
  );
}
