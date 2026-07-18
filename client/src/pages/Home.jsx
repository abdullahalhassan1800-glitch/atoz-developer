import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI } from '../utils/api';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { FaHome, FaHandshake, FaCity, FaAward, FaStar, FaQuoteLeft, FaArrowRight, FaCheck } from 'react-icons/fa';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    propertyAPI.getFeatured().then((r) => setFeatured(r.data)).catch(() => {});
  }, []);

  const stats = [
    { icon: FaHome, num: '2,500+', label: 'Properties Sold' },
    { icon: FaHandshake, num: '1,800+', label: 'Happy Clients' },
    { icon: FaCity, num: '50+', label: 'Cities' },
    { icon: FaAward, num: '15+', label: 'Years' },
  ];

  const testimonials = [
    { name: 'Rahul Sharma', role: 'Homeowner', text: 'A TO Z Developer made buying my dream home effortless. Their team guided me through every step with professionalism.', rating: 5 },
    { name: 'Priya Patel', role: 'Investor', text: 'Excellent investment advisory. They helped me choose properties that gave outstanding returns.', rating: 5 },
    { name: 'Amit Kumar', role: 'First-time Buyer', text: 'As a first-time buyer I was nervous, but their team found me the perfect apartment within budget.', rating: 5 },
  ];

  const whyUs = [
    { title: 'Expert Guidance', desc: 'Experienced agents provide personalized help to find your ideal property.' },
    { title: 'Verified Listings', desc: 'Every listing is verified for accuracy and authenticity.' },
    { title: 'Best Deals', desc: 'We negotiate the best prices for maximum value.' },
    { title: 'End-to-End Support', desc: 'From search to registration, we handle everything.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-gray-950 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950/80 via-teal-950/40 to-gray-950/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full text-center">
          <span className="inline-block px-4 py-1.5 bg-teal-500/10 text-teal-400 text-xs font-semibold rounded-full mb-6 border border-teal-500/20 tracking-wide uppercase">
            Welcome to A TO Z Developer
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 leading-[1.1]">
            Find Your <span className="text-teal-400">Dream Home</span><br className="hidden sm:block" /> With Us
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 text-base sm:text-lg">
            India's trusted real estate partner. Discover properties that match your lifestyle and budget.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-3 bg-teal-50 rounded-xl flex items-center justify-center">
                  <s.icon className="text-teal-600 text-lg" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{s.num}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featured.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
              <div>
                <span className="text-teal-600 text-xs font-semibold uppercase tracking-wider">Featured</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Featured Properties</h2>
              </div>
              <Link to="/properties" className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
                View all <FaArrowRight className="text-xs" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-teal-600 text-xs font-semibold uppercase tracking-wider">Why Us</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Why Choose A TO Z Developer</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-gray-50 border border-gray-100 hover:border-teal-200 hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center mb-4 text-white font-bold text-sm">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-teal-400 text-xs font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <FaQuoteLeft className="text-teal-500 text-xl mb-4" />
                <p className="text-gray-300 text-sm leading-relaxed mb-5">{t.text}</p>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <FaStar key={j} className="text-amber-400 text-xs" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold">{t.name}</h4>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Ready to Find Your Dream Home?</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">Get in touch with our expert team and discover the perfect property.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/properties" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-colors shadow-sm">
              Browse Properties <FaArrowRight className="text-xs" />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-teal-300 hover:text-teal-700 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
