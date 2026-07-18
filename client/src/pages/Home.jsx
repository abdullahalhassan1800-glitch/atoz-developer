import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI } from '../utils/api';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { FaHome, FaHandshake, FaCity, FaAward, FaStar, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    propertyAPI.getFeatured().then(res => setFeatured(res.data)).catch(() => {});
  }, []);

  const stats = [
    { icon: FaHome, number: '2,500+', label: 'Properties Sold' },
    { icon: FaHandshake, number: '1,800+', label: 'Happy Clients' },
    { icon: FaCity, number: '50+', label: 'Cities Covered' },
    { icon: FaAward, number: '15+', label: 'Years Experience' },
  ];

  const testimonials = [
    { name: 'Rahul Sharma', role: 'Homeowner', text: 'A TO Z Developer made buying my dream home effortless. Their team was professional and guided me through every step.', rating: 5 },
    { name: 'Priya Patel', role: 'Investor', text: 'Excellent investment advisory services. They helped me choose properties that gave great returns. Highly recommended!', rating: 5 },
    { name: 'Amit Kumar', role: 'First-time Buyer', text: 'As a first-time buyer, I was nervous. But their team explained everything clearly and found me the perfect apartment.', rating: 5 },
  ];

  const whyUs = [
    { title: 'Expert Guidance', desc: 'Our experienced agents provide personalized guidance to help you find the perfect property.' },
    { title: 'Verified Listings', desc: 'Every property on our platform is thoroughly verified for accuracy and authenticity.' },
    { title: 'Best Deals', desc: 'We negotiate the best prices and ensure you get maximum value for your investment.' },
    { title: 'End-to-End Support', desc: 'From property search to registration, we handle everything so you can relax.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="text-center mb-12">
            <span className="inline-block px-5 py-2 bg-amber-500/20 text-amber-400 text-sm font-semibold rounded-full mb-6 border border-amber-400/30">
              Welcome to A TO Z Developer
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your <span className="text-amber-400">Dream Home</span><br className="hidden sm:block" /> With Us
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Your trusted real estate partner. We help you discover the perfect property that matches your lifestyle and budget.
            </p>
          </div>
          <SearchBar />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl hover:bg-teal-50 transition-colors duration-300 cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-50 rounded-2xl flex items-center justify-center">
                  <stat.icon className="text-2xl text-teal-700" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</h3>
                <p className="text-gray-500 mt-1 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featured.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Featured</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Featured Properties</h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">Handpicked premium properties for you</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featured.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/properties" className="inline-flex items-center gap-2 px-8 py-3 bg-teal-700 text-white font-semibold rounded-xl hover:bg-teal-800 transition-all shadow-lg hover:shadow-xl hover:gap-3">
                View All Properties <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
              <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Why Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Why Choose A TO Z Developer</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {whyUs.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-teal-700 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-lg">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-teal-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-colors">
                <FaQuoteLeft className="text-amber-400 text-2xl mb-4 opacity-80" />
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <FaStar key={j} className="text-amber-400 text-sm" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{t.name}</h4>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">Let us help you find the perfect property. Get in touch with our expert team today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-teal-700 text-white font-semibold rounded-xl hover:bg-teal-800 transition shadow-lg hover:shadow-xl">
              Browse Properties <FaArrowRight />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 border-2 border-teal-700 text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
