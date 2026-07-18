import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI } from '../utils/api';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { FaArrowRight } from 'react-icons/fa';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    propertyAPI.getFeatured().then((r) => setFeatured(r.data)).catch(() => {});
  }, []);

  const stats = [
    { num: '2,500+', label: 'Properties Sold' },
    { num: '1,800+', label: 'Happy Clients' },
    { num: '50+', label: 'Cities' },
    { num: '15+', label: 'Years Experience' },
  ];

  const testimonials = [
    { name: 'Rahul Sharma', role: 'Homeowner', text: 'A TO Z Developer made buying my dream home effortless. Their team guided me through every step with unmatched professionalism and care.', rating: 5 },
    { name: 'Priya Patel', role: 'Investor', text: 'Exceptional investment advisory. They helped me choose properties that delivered outstanding returns beyond expectations.', rating: 5 },
    { name: 'Amit Kumar', role: 'First-time Buyer', text: 'As a first-time buyer I was apprehensive, but their team found me the perfect apartment within budget. Truly a premium experience.', rating: 5 },
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
      <section className="relative min-h-screen flex items-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="max-w-2xl">
            <div className="w-16 h-px bg-gold mb-8" />
            <span className="text-gold text-xs font-light tracking-[0.3em] uppercase block mb-4">Welcome to A TO Z Developer</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal text-white mb-6 leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Find Your<br />
              <span className="text-gold">Dream Home</span><br />
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
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-px h-8 bg-gold/30 mx-auto mb-4" />
                <h3 className="text-3xl sm:text-4xl font-light text-charcoal mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{s.num}</h3>
                <p className="text-xs font-light text-black/40 tracking-[0.15em] uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featured.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
              <div>
                <span className="text-gold text-xs font-light tracking-[0.3em] uppercase">Portfolio</span>
                <h2 className="text-3xl sm:text-4xl font-normal text-charcoal mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>Featured Properties</h2>
              </div>
              <Link to="/properties" className="text-xs font-light text-gold hover:text-gold-dark flex items-center gap-2 tracking-[0.1em] uppercase transition-colors">
                View all <FaArrowRight className="text-[10px]" />
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
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-light tracking-[0.3em] uppercase">Excellence</span>
            <h2 className="text-3xl sm:text-4xl font-normal text-white mt-3" style={{ fontFamily: "'Playfair Display', serif" }}>Why Choose A TO Z Developer</h2>
            <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, i) => (
              <div key={i} className="group p-8 border border-white/5 hover:border-gold/20 transition-all duration-500">
                <span className="text-gold/30 text-xs font-light tracking-[0.2em]">0{i + 1}</span>
                <div className="w-8 h-px bg-gold/20 my-4 group-hover:bg-gold/60 transition-colors duration-500" />
                <h3 className="text-base font-normal text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                <p className="text-sm font-light text-white/30 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-light tracking-[0.3em] uppercase">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-normal text-charcoal mt-3" style={{ fontFamily: "'Playfair Display', serif" }}>What Our Clients Say</h2>
            <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 border border-black/5 hover:border-gold/20 transition-all duration-500">
                <div className="text-gold text-3xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>"</div>
                <p className="text-sm font-light text-black/50 leading-relaxed mb-8">{t.text}</p>
                <div className="w-8 h-px bg-gold/30 mb-4" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-charcoal flex items-center justify-center">
                    <span className="text-gold text-xs font-medium">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-normal text-charcoal" style={{ fontFamily: "'Playfair Display', serif" }}>{t.name}</h4>
                    <p className="text-[11px] font-light text-black/30 tracking-wider uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-normal text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Ready to Find Your Dream Home?</h2>
          <p className="text-white/30 mb-10 max-w-lg mx-auto text-sm font-light leading-relaxed">Connect with our expert team and discover a property that reflects your lifestyle.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold text-charcoal text-xs font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300">
              Browse Properties <FaArrowRight className="text-[10px]" />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 border border-white/20 text-white text-xs font-light tracking-[0.15em] uppercase hover:border-gold/50 hover:text-gold transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
