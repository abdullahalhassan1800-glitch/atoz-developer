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

  const sel = "py-3 px-4 bg-white border border-black/10 text-sm font-light text-black/60 outline-none focus:border-gold transition-all duration-300 appearance-none cursor-pointer";

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Header */}
      <section className="bg-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold text-xs font-light tracking-[0.3em] uppercase">Portfolio</span>
          <h1 className="text-3xl sm:text-4xl font-normal text-white mt-3 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Find Your Perfect Property</h1>
          <p className="text-sm font-light text-white/40">{pagination.total} properties available</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="bg-cream p-6 sm:p-8 mb-12">
          <form onSubmit={search}>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-2 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 text-xs" />
                <input type="text" name="search" value={filters.search} onChange={set} placeholder="Search properties..." className="w-full pl-10 pr-4 py-3 bg-white border border-black/10 text-sm font-light outline-none focus:border-gold transition-all duration-300" />
              </div>
              <select name="type" value={filters.type} onChange={set} className={sel}>
                <option value="">All Types</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              <button type="submit" className="py-3 bg-gold text-charcoal text-xs font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2">
                <FaSearch className="text-[10px]" /> Search
              </button>
            </div>

            <button type="button" onClick={() => setShowFilters(!showFilters)} className="mt-4 text-xs font-light text-gold flex items-center gap-2 hover:text-gold-dark transition-colors tracking-wider uppercase">
              <FaSlidersH /> {showFilters ? 'Hide' : 'Show'} Filters
            </button>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-black/5">
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

        {/* Results */}
        {loading ? (
          <div className="text-center py-24">
            <div className="w-8 h-px bg-gold animate-pulse mx-auto mb-4" style={{ width: '40px' }} />
            <p className="text-xs font-light text-black/30 tracking-[0.2em] uppercase">Loading...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-px bg-gold/30 mx-auto mb-6" />
            <p className="text-xl font-normal text-charcoal mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>No properties found</p>
            <p className="text-sm font-light text-black/30">Try adjusting your search criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p) => <PropertyCard key={p._id} property={p} />)}
            </div>
            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => fetchProperties(page)}
                    className={`w-10 h-10 text-xs font-light tracking-wider transition-all duration-300 ${
                      pagination.currentPage === page
                        ? 'bg-gold text-charcoal'
                        : 'bg-white text-black/40 border border-black/10 hover:border-gold/40 hover:text-gold'
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
