import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

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

  const selectClass = "w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none cursor-pointer";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Search</label>
          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="City, address, or keyword..."
              className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Type</label>
          <select name="type" value={filters.type} onChange={handleChange} className={selectClass}>
            <option value="">All</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Property</label>
          <select name="propertyType" value={filters.propertyType} onChange={handleChange} className={selectClass}>
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Min Price</label>
          <select name="minPrice" value={filters.minPrice} onChange={handleChange} className={selectClass}>
            <option value="">No Min</option>
            <option value="500000">₹5 Lakh</option>
            <option value="1000000">₹10 Lakh</option>
            <option value="2500000">₹25 Lakh</option>
            <option value="5000000">₹50 Lakh</option>
            <option value="10000000">₹1 Crore</option>
            <option value="25000000">₹2.5 Crore</option>
            <option value="50000000">₹5 Crore</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Max Price</label>
          <select name="maxPrice" value={filters.maxPrice} onChange={handleChange} className={selectClass}>
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

        <div className="sm:col-span-2 lg:col-span-3 flex items-end">
          <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <FaSearch /> Search Properties
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
