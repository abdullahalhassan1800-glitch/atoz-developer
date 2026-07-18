import { Link } from 'react-router-dom';
import { FaHome, FaTag, FaComments, FaCogs, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const services = [
  { icon: FaHome, title: 'Property Buying', desc: 'Find your perfect home from our curated collection of verified properties across India.', gradient: 'gradient-accent' },
  { icon: FaTag, title: 'Property Selling', desc: 'Get the best price with our marketing expertise and extensive buyer network.', gradient: 'gradient-primary' },
  { icon: FaComments, title: 'Consulting', desc: 'Expert advice on investments, market trends, and property valuations.', gradient: 'gradient-warm' },
  { icon: FaCogs, title: 'Management', desc: 'Complete property management including tenant screening, maintenance, and rent collection.', gradient: 'gradient-accent' },
  { icon: FaChartLine, title: 'Investment Advisory', desc: 'Strategic investment planning to maximize your returns in real estate.', gradient: 'gradient-primary' },
  { icon: FaShieldAlt, title: 'Legal Assistance', desc: 'End-to-end legal support for transactions, documentation, and title verification.', gradient: 'gradient-warm' },
];

export default function Services() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-deep" />
      <div className="absolute inset-0 bg-mesh opacity-30" />

      <section className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">What We Do</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">Our Services</h1>
          <div className="w-12 h-1 gradient-accent rounded-full mx-auto mb-6" />
          <p className="text-white/40 max-w-2xl mx-auto text-sm font-light">Comprehensive real estate solutions tailored to your needs</p>
        </div>
      </section>

      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="glass-card rounded-2xl p-7 hover:border-accent/20 transition-all duration-500 group">
                <div className={`w-12 h-12 ${s.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}>
                  <s.icon className="text-white text-lg" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm font-light text-white/30 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card rounded-2xl p-10 sm:p-14">
            <div className="w-12 h-1 gradient-accent rounded-full mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Need a Custom Solution?</h2>
            <p className="text-sm font-light text-white/30 mb-8 max-w-lg mx-auto">We understand every client is unique. Let us create a personalized plan for your real estate needs.</p>
            <Link to="/contact" className="inline-flex px-8 py-3 gradient-accent text-white text-sm font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
