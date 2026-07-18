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

  const sel = "w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all";

  return (
    <form onSubmit={go} className="bg-white rounded-2xl shadow-xl shadow-black/10 p-4 sm:p-5 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="lg:col-span-2 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            name="search"
            value={f.search}
            onChange={set}
            placeholder="Search city, area..."
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>
        <select name="type" value={f.type} onChange={set} className={sel}>
          <option value="">Buy / Rent</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
        <select name="propertyType" value={f.propertyType} onChange={set} className={sel}>
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="plot">Plot</option>
          <option value="commercial">Commercial</option>
        </select>
        <button type="submit" className="py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
          Search
        </button>
      </div>
    </form>
  );
}
