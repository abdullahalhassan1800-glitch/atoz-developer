import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const navigate = useNavigate();
  const [f, setF] = useState({ search: '', type: '', propertyType: '', minPrice: '', maxPrice: '' });

  const set = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const go = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    Object.entries(f).forEach(([k, v]) => { if (v) p.set(k, v); });
    navigate(`/properties?${p}`);
  };

  return (
    <form onSubmit={go} className="bg-charcoal/60 backdrop-blur-md border border-white/10 p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 text-xs" />
          <input
            type="text"
            name="search"
            value={f.search}
            onChange={set}
            placeholder="Search city, area..."
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-white text-sm font-light placeholder:text-white/30 outline-none focus:border-gold/50 transition-all duration-300"
          />
        </div>
        <select name="type" value={f.type} onChange={set} className="py-3 px-4 bg-white/5 border border-white/10 text-white/70 text-sm font-light outline-none focus:border-gold/50 transition-all appearance-none cursor-pointer">
          <option value="" className="bg-charcoal">Buy / Rent</option>
          <option value="sale" className="bg-charcoal">For Sale</option>
          <option value="rent" className="bg-charcoal">For Rent</option>
        </select>
        <select name="propertyType" value={f.propertyType} onChange={set} className="py-3 px-4 bg-white/5 border border-white/10 text-white/70 text-sm font-light outline-none focus:border-gold/50 transition-all appearance-none cursor-pointer">
          <option value="" className="bg-charcoal">All Types</option>
          <option value="house" className="bg-charcoal">House</option>
          <option value="apartment" className="bg-charcoal">Apartment</option>
          <option value="villa" className="bg-charcoal">Villa</option>
          <option value="plot" className="bg-charcoal">Plot</option>
          <option value="commercial" className="bg-charcoal">Commercial</option>
        </select>
        <button type="submit" className="py-3 bg-gold text-charcoal text-xs font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2">
          <FaSearch className="text-[10px]" /> Search
        </button>
      </div>
    </form>
  );
}
