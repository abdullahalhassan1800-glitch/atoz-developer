import { Link } from 'react-router-dom';
import { FaHome, FaTag, FaComments, FaCogs, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const services = [
  { icon: FaHome, title: 'Property Buying', desc: 'Find your perfect home from our curated collection of verified properties across India.', color: 'bg-teal-50 text-teal-600' },
  { icon: FaTag, title: 'Property Selling', desc: 'Get the best price with our marketing expertise and extensive buyer network.', color: 'bg-amber-50 text-amber-600' },
  { icon: FaComments, title: 'Consulting', desc: 'Expert advice on investments, market trends, and property valuations.', color: 'bg-green-50 text-green-600' },
  { icon: FaCogs, title: 'Management', desc: 'Complete property management including tenant screening, maintenance, and rent collection.', color: 'bg-purple-50 text-purple-600' },
  { icon: FaChartLine, title: 'Investment Advisory', desc: 'Strategic investment planning to maximize your returns in real estate.', color: 'bg-red-50 text-red-600' },
  { icon: FaShieldAlt, title: 'Legal Assistance', desc: 'End-to-end legal support for transactions, documentation, and title verification.', color: 'bg-indigo-50 text-indigo-600' },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <section className="bg-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal-400 text-xs font-semibold uppercase tracking-wider">What We Do</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Our Services</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive real estate solutions tailored to your needs</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 group">
                <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <s.icon className="text-lg" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Need a Custom Solution?</h2>
          <p className="text-gray-500 text-sm mb-8 max-w-lg mx-auto">We understand every client is unique. Let us create a personalized plan for your real estate needs.</p>
          <Link to="/contact" className="inline-flex px-6 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
