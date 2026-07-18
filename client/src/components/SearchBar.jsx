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

  const selectClass = "w-full px-4 py-3 glass rounded-xl text-white text-sm font-light outline-none focus:border-accent/50 transition-all appearance-none cursor-pointer bg-transparent";

  return (
    <form onSubmit={go} className="glass-strong rounded-2xl p-5 sm:p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="lg:col-span-2 relative">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
          <input
            type="text"
            name="search"
            value={f.search}
            onChange={set}
            placeholder="Search city, area..."
            className="w-full pl-10 pr-4 py-3 glass rounded-xl text-white text-sm font-light placeholder:text-white/30 outline-none focus:border-accent/50 transition-all"
          />
        </div>
        <select name="type" value={f.type} onChange={set} className={selectClass}>
          <option value="" className="bg-deep">Buy / Rent</option>
          <option value="sale" className="bg-deep">For Sale</option>
          <option value="rent" className="bg-deep">For Rent</option>
        </select>
        <select name="propertyType" value={f.propertyType} onChange={set} className={selectClass}>
          <option value="" className="bg-deep">All Types</option>
          <option value="house" className="bg-deep">House</option>
          <option value="apartment" className="bg-deep">Apartment</option>
          <option value="villa" className="bg-deep">Villa</option>
          <option value="plot" className="bg-deep">Plot</option>
          <option value="commercial" className="bg-deep">Commercial</option>
        </select>
        <button type="submit" className="py-3 gradient-accent text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 flex items-center justify-center gap-2">
          <FaSearch className="text-xs" /> Search
        </button>
      </div>
    </form>
  );
}
