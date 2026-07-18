import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertyAPI } from '../utils/api';
import PropertyCard from '../components/PropertyCard';
import { FaSearch, FaSlidersH } from 'react-icons/fa';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1, total: 0 });
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || '',
    propertyType: searchParams.get('propertyType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    beds: searchParams.get('beds') || '',
    sort: searchParams.get('sort') || '-createdAt',
  });

  const fetchProperties = async (page = 1) => {
    setLoading(true);
    try {
      const params = { ...filters, page, limit: 9 };
      Object.keys(params).forEach(key => { if (!params[key]) delete params[key]; });
      const res = await propertyAPI.getAll(params);
      setProperties(res.data.properties);
      setPagination({ totalPages: res.data.totalPages, currentPage: res.data.currentPage, total: res.data.total });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => { if (value) params.set(key, value); });
    setSearchParams(params);
    fetchProperties(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Find Your Perfect Property</h1>
          <p className="text-gray-500 mt-2">{pagination.total} properties available</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <input type="text" name="search" value={filters.search} onChange={handleChange} placeholder="Search properties..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <select name="type" value={filters.type} onChange={handleChange} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                <option value="">All Types</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              <button type="submit" className="py-3 bg-teal-700 text-white font-semibold rounded-xl hover:bg-teal-800 transition flex items-center justify-center gap-2">
                <FaSearch /> Search
              </button>
            </div>

            <button type="button" onClick={() => setShowFilters(!showFilters)} className="mt-4 text-sm text-teal-600 flex items-center gap-1 hover:text-teal-800">
              <FaSlidersH /> {showFilters ? 'Hide' : 'Show'} Advanced Filters
            </button>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                <select name="propertyType" value={filters.propertyType} onChange={handleChange} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
                  <option value="">Property Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                  <option value="commercial">Commercial</option>
                </select>
                <select name="minPrice" value={filters.minPrice} onChange={handleChange} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
                  <option value="">Min Price</option>
                  <option value="500000">₹5 Lakh</option>
                  <option value="1000000">₹10 Lakh</option>
                  <option value="2500000">₹25 Lakh</option>
                  <option value="5000000">₹50 Lakh</option>
                  <option value="10000000">₹1 Crore</option>
                </select>
                <select name="maxPrice" value={filters.maxPrice} onChange={handleChange} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
                  <option value="">Max Price</option>
                  <option value="2500000">₹25 Lakh</option>
                  <option value="5000000">₹50 Lakh</option>
                  <option value="10000000">₹1 Crore</option>
                  <option value="50000000">₹5 Crore</option>
                </select>
                <select name="sort" value={filters.sort} onChange={handleChange} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
                  <option value="-createdAt">Newest First</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                </select>
              </div>
            )}
          </form>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-teal-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No properties found</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => fetchProperties(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                      pagination.currentPage === page
                        ? 'bg-teal-700 text-white'
                        : 'bg-white text-gray-600 hover:bg-teal-50 border border-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Properties;
