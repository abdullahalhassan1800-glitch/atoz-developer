import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertyAPI } from '../utils/api';
import PropertyCard from '../components/PropertyCard';
import { FaSearch, FaSlidersH } from 'react-icons/fa';

export default function Properties() {
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
    sort: searchParams.get('sort') || '-createdAt',
  });

  const fetchProperties = async (page = 1) => {
    setLoading(true);
    try {
      const params = { ...filters, page, limit: 9 };
      Object.keys(params).forEach((k) => { if (!params[k]) delete params[k]; });
      const res = await propertyAPI.getAll(params);
      setProperties(res.data.properties);
      setPagination({ totalPages: res.data.totalPages, currentPage: res.data.currentPage, total: res.data.total });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProperties(); }, [filters]);

  const set = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const search = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v) p.set(k, v); });
    setSearchParams(p);
    fetchProperties(1);
  };

  const sel = "px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all";

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find Your Perfect Property</h1>
          <p className="text-sm text-gray-500 mt-2">{pagination.total} properties available</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-8">
          <form onSubmit={search}>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2 relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input type="text" name="search" value={filters.search} onChange={set} placeholder="Search properties..." className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all" />
              </div>
              <select name="type" value={filters.type} onChange={set} className={sel}>
                <option value="">All Types</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              <button type="submit" className="py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                <FaSearch className="text-xs" /> Search
              </button>
            </div>

            <button type="button" onClick={() => setShowFilters(!showFilters)} className="mt-3 text-xs text-teal-600 font-medium flex items-center gap-1 hover:text-teal-700">
              <FaSlidersH /> {showFilters ? 'Hide' : 'Show'} Filters
            </button>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-3 pt-3 border-t border-gray-100">
                <select name="propertyType" value={filters.propertyType} onChange={set} className={sel}>
                  <option value="">Property Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                  <option value="commercial">Commercial</option>
                </select>
                <select name="minPrice" value={filters.minPrice} onChange={set} className={sel}>
                  <option value="">Min Price</option>
                  <option value="500000">5 Lakh</option>
                  <option value="1000000">10 Lakh</option>
                  <option value="2500000">25 Lakh</option>
                  <option value="5000000">50 Lakh</option>
                  <option value="10000000">1 Crore</option>
                </select>
                <select name="maxPrice" value={filters.maxPrice} onChange={set} className={sel}>
                  <option value="">Max Price</option>
                  <option value="2500000">25 Lakh</option>
                  <option value="5000000">50 Lakh</option>
                  <option value="10000000">1 Crore</option>
                  <option value="50000000">5 Crore</option>
                </select>
                <select name="sort" value={filters.sort} onChange={set} className={sel}>
                  <option value="-createdAt">Newest</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                </select>
              </div>
            )}
          </form>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-[3px] border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-gray-400 mt-4">Loading...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg font-semibold text-gray-900">No properties found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {properties.map((p) => <PropertyCard key={p._id} property={p} />)}
            </div>
            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-1.5 mt-10">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => fetchProperties(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      pagination.currentPage === page
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-gray-500 border border-gray-200 hover:border-teal-300'
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
}
