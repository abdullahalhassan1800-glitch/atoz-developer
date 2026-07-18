import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const SearchBar = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label className="text-xs font-medium text-gray-500 mb-1 block">Search</label>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="City, address, or keyword..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Type</label>
          <select name="type" value={filters.type} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="">All</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Property</label>
          <select name="propertyType" value={filters.propertyType} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Min Price</label>
          <select name="minPrice" value={filters.minPrice} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="">No Min</option>
            <option value="100000">₹1 Lakh</option>
            <option value="250000">₹2.5 Lakh</option>
            <option value="500000">₹5 Lakh</option>
            <option value="1000000">₹10 Lakh</option>
            <option value="2500000">₹25 Lakh</option>
            <option value="5000000">₹50 Lakh</option>
            <option value="10000000">₹1 Crore</option>
            <option value="25000000">₹2.5 Crore</option>
            <option value="50000000">₹5 Crore</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Max Price</label>
          <select name="maxPrice" value={filters.maxPrice} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="">No Max</option>
            <option value="1000000">₹10 Lakh</option>
            <option value="2500000">₹25 Lakh</option>
            <option value="5000000">₹50 Lakh</option>
            <option value="10000000">₹1 Crore</option>
            <option value="25000000">₹2.5 Crore</option>
            <option value="50000000">₹5 Crore</option>
            <option value="100000000">₹10 Crore</option>
          </select>
        </div>

        <div className="flex items-end">
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-800 hover:to-blue-600 transition shadow-lg flex items-center justify-center gap-2">
            <FaSearch /> Search Properties
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
