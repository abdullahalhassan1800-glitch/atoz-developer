import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI } from '../utils/api';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { FaArrowRight, FaHome, FaHandshake, FaCity, FaAward } from 'react-icons/fa';

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
    { name: 'Rahul Sharma', role: 'Homeowner', text: 'A TO Z Developer made buying my dream home effortless. Their team guided me through every step with unmatched professionalism.' },
    { name: 'Priya Patel', role: 'Investor', text: 'Exceptional investment advisory. They helped me choose properties that delivered outstanding returns beyond expectations.' },
    { name: 'Amit Kumar', role: 'First-time Buyer', text: 'As a first-time buyer I was nervous, but their team found me the perfect apartment within budget. Truly premium service.' },
  ];

  const whyUs = [
    { title: 'Expert Guidance', desc: 'Seasoned professionals providing personalized counsel for your property journey.' },
    { title: 'Verified Listings', desc: 'Every property meticulously verified for accuracy and authenticity.' },
    { title: 'Best Deals', desc: 'Skilled negotiation ensuring maximum value for your investment.' },
    { title: 'End-to-End Support', desc: 'From discovery to registration, we handle every detail.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-deep" />
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600" alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
          <div className="max-w-2xl">
            <div className="w-12 h-1 gradient-accent rounded-full mb-6" />
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase block mb-4">Welcome to A TO Z Developer</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05]">
              Find Your<br />
              <span className="gradient-text">Dream Home</span><br />
              With Us
            </h1>
            <p className="text-white/40 max-w-lg mb-12 text-sm sm:text-base font-light leading-relaxed">
              India's premier real estate partner. Discover properties that embody elegance, comfort, and timeless value.
            </p>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-deep-light" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center hover:border-accent/20 transition-all duration-300">
                <s.icon className="text-accent text-xl mx-auto mb-3" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{s.num}</h3>
                <p className="text-xs font-light text-white/30 tracking-wider uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featured.length > 0 && (
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-deep" />
          <div className="absolute inset-0 bg-mesh opacity-30" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
              <div>
                <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Portfolio</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Featured Properties</h2>
              </div>
              <Link to="/properties" className="text-sm font-medium text-accent hover:text-white flex items-center gap-2 transition-colors">
                View all <FaArrowRight className="text-xs" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-deep-light" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Excellence</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Why Choose A TO Z Developer</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-7 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500 group">
                <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center mb-4 text-white font-bold text-sm group-hover:shadow-lg group-hover:shadow-accent/20 transition-shadow">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm font-light text-white/30 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-deep" />
        <div className="absolute inset-0 bg-mesh" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass rounded-2xl p-7 hover:border-accent/20 transition-all duration-500">
                <div className="w-8 h-1 gradient-accent rounded-full mb-5" />
                <p className="text-sm font-light text-white/50 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-accent rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-accent/20">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                    <p className="text-[11px] font-light text-white/30">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-deep-light" />
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600" alt="" className="w-full h-full object-cover opacity-5" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-1 gradient-accent rounded-full mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-white/30 mb-10 max-w-lg mx-auto text-sm font-light leading-relaxed">Connect with our expert team and discover a property that reflects your lifestyle.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 gradient-accent text-white text-sm font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all">
              Browse Properties <FaArrowRight className="text-xs" />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 glass text-white text-sm font-medium rounded-xl hover:border-accent/30 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
