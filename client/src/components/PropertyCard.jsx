import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <Link to={`/property/${property._id}`} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            property.type === 'sale' ? 'bg-teal-700 text-white' : 'bg-amber-500 text-white'
          }`}>
            For {property.type === 'sale' ? 'Sale' : 'Rent'}
          </span>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-gray-700 capitalize">
            {property.propertyType}
          </span>
        </div>
        {property.status === 'sold' && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-600 text-white">Sold</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-700 transition mb-1 line-clamp-1">
          {property.title}
        </h3>
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
          <FaMapMarkerAlt className="text-teal-500" /> {property.city}, {property.state}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
          <span className="flex items-center gap-1"><FaBed className="text-teal-500" /> {property.beds} Beds</span>
          <span className="flex items-center gap-1"><FaBath className="text-teal-500" /> {property.baths} Baths</span>
          <span className="flex items-center gap-1"><FaRulerCombined className="text-teal-500" /> {property.area} sqft</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-teal-700">{formatPrice(property.price)}</span>
          {property.type === 'rent' && <span className="text-xs text-gray-500">/month</span>}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
