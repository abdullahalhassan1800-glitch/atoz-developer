import { Link } from 'react-router-dom';
import { FaHome, FaTag, FaComments, FaCogs, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const services = [
  { icon: FaHome, title: 'Property Buying', desc: 'Find your perfect home from our curated collection of verified properties across India.' },
  { icon: FaTag, title: 'Property Selling', desc: 'Get the best price with our marketing expertise and extensive buyer network.' },
  { icon: FaComments, title: 'Consulting', desc: 'Expert advice on investments, market trends, and property valuations.' },
  { icon: FaCogs, title: 'Management', desc: 'Complete property management including tenant screening, maintenance, and rent collection.' },
  { icon: FaChartLine, title: 'Investment Advisory', desc: 'Strategic investment planning to maximize your returns in real estate.' },
  { icon: FaShieldAlt, title: 'Legal Assistance', desc: 'End-to-end legal support for transactions, documentation, and title verification.' },
];

export default function Services() {
  return (
    <div className="min-h-screen pt-20">
      <section className="bg-charcoal py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold text-xs font-light tracking-[0.3em] uppercase">What We Do</span>
          <h1 className="text-4xl sm:text-5xl font-normal text-white mt-4 mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Our Services</h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-6" />
          <p className="text-white/40 max-w-2xl mx-auto text-sm font-light">Comprehensive real estate solutions tailored to your needs</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="group p-8 border border-black/5 hover:border-gold/20 transition-all duration-500">
                <s.icon className="text-gold text-xl mb-5 group-hover:scale-110 transition-transform duration-500" />
                <div className="w-8 h-px bg-gold/20 mb-5 group-hover:bg-gold/60 transition-colors duration-500" />
                <h3 className="text-base font-normal text-charcoal mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h3>
                <p className="text-sm font-light text-black/40 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <h2 className="text-3xl font-normal text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Need a Custom Solution?</h2>
          <p className="text-sm font-light text-white/30 mb-10 max-w-lg mx-auto">We understand every client is unique. Let us create a personalized plan for your real estate needs.</p>
          <Link to="/contact" className="inline-flex px-8 py-3.5 bg-gold text-charcoal text-xs font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
