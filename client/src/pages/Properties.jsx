import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertyAPI } from '../utils/api';
import PropertyCard from '../components/PropertyCard';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/Animations';
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

  const sel = "py-3 px-4 glass rounded-xl text-white text-sm font-light outline-none focus:border-accent/50 transition-all appearance-none cursor-pointer bg-transparent";

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-deep" />
      <div className="absolute inset-0 bg-mesh opacity-30" />

      {/* Header */}
      <section className="relative pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Portfolio</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-3">Find Your Perfect Property</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-sm font-light text-white/40">{pagination.total} properties available</p>
          </FadeIn>
        </div>
      </section>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search */}
        <FadeIn delay={0.3}>
          <div className="glass-strong rounded-2xl p-6 sm:p-8 mb-10">
            <form onSubmit={search}>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2 relative">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
                  <input type="text" name="search" value={filters.search} onChange={set} placeholder="Search properties..." className="w-full pl-10 pr-4 py-3 glass rounded-xl text-white text-sm font-light placeholder:text-white/30 outline-none focus:border-accent/50 transition-all" />
                </div>
                <select name="type" value={filters.type} onChange={set} className={sel}>
                  <option value="" className="bg-deep">All Types</option>
                  <option value="sale" className="bg-deep">For Sale</option>
                  <option value="rent" className="bg-deep">For Rent</option>
                </select>
                <button type="submit" className="py-3 gradient-accent text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/20 transition-all flex items-center justify-center gap-2">
                  <FaSearch className="text-xs" /> Search
                </button>
              </div>

              <button type="button" onClick={() => setShowFilters(!showFilters)} className="mt-4 text-xs font-medium text-accent flex items-center gap-2 hover:text-white transition-colors">
                <FaSlidersH /> {showFilters ? 'Hide' : 'Show'} Filters
              </button>

              {showFilters && (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5">
                  <select name="propertyType" value={filters.propertyType} onChange={set} className={sel}>
                    <option value="" className="bg-deep">Property Type</option>
                    <option value="house" className="bg-deep">House</option>
                    <option value="apartment" className="bg-deep">Apartment</option>
                    <option value="villa" className="bg-deep">Villa</option>
                    <option value="plot" className="bg-deep">Plot</option>
                    <option value="commercial" className="bg-deep">Commercial</option>
                  </select>
                  <select name="minPrice" value={filters.minPrice} onChange={set} className={sel}>
                    <option value="" className="bg-deep">Min Price</option>
                    <option value="500000" className="bg-deep">5 Lakh</option>
                    <option value="1000000" className="bg-deep">10 Lakh</option>
                    <option value="2500000" className="bg-deep">25 Lakh</option>
                    <option value="5000000" className="bg-deep">50 Lakh</option>
                    <option value="10000000" className="bg-deep">1 Crore</option>
                  </select>
                  <select name="maxPrice" value={filters.maxPrice} onChange={set} className={sel}>
                    <option value="" className="bg-deep">Max Price</option>
                    <option value="2500000" className="bg-deep">25 Lakh</option>
                    <option value="5000000" className="bg-deep">50 Lakh</option>
                    <option value="10000000" className="bg-deep">1 Crore</option>
                    <option value="50000000" className="bg-deep">5 Crore</option>
                  </select>
                  <select name="sort" value={filters.sort} onChange={set} className={sel}>
                    <option value="-createdAt" className="bg-deep">Newest</option>
                    <option value="price" className="bg-deep">Price: Low to High</option>
                    <option value="-price" className="bg-deep">Price: High to Low</option>
                  </select>
                </div>
              )}
            </form>
          </div>
        </FadeIn>

        {/* Results */}
        {loading ? (
          <div className="text-center py-24">
            <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-light text-white/30">Loading...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-12 h-1 gradient-accent rounded-full mx-auto mb-6" />
            <p className="text-xl font-bold text-white mb-2">No properties found</p>
            <p className="text-sm font-light text-white/30">Try adjusting your search criteria</p>
          </div>
        ) : (
          <>
            <StaggerContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((p) => (
                  <StaggerItem key={p._id}>
                    <PropertyCard property={p} />
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => fetchProperties(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                      pagination.currentPage === page
                        ? 'gradient-accent text-white shadow-lg shadow-accent/20'
                        : 'glass text-white/40 hover:text-accent hover:border-accent/30'
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
