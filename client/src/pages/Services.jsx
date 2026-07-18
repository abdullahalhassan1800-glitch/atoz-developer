import { FaHome, FaTag, FaComments, FaCogs, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const Services = () => {
  const services = [
    { icon: FaHome, title: 'Property Buying', desc: 'Find your perfect home from our curated collection of verified properties across India. Our experts guide you through every step.', color: 'blue' },
    { icon: FaTag, title: 'Property Selling', desc: 'Get the best price for your property with our marketing expertise, professional photography, and extensive buyer network.', color: 'amber' },
    { icon: FaComments, title: 'Property Consulting', desc: 'Expert advice on real estate investments, market trends, and property valuations to help you make informed decisions.', color: 'green' },
    { icon: FaCogs, title: 'Property Management', desc: 'Complete property management services including tenant screening, maintenance, rent collection, and legal compliance.', color: 'purple' },
    { icon: FaChartLine, title: 'Investment Advisory', desc: 'Strategic investment planning to maximize your returns. We analyze market trends and identify high-growth opportunities.', color: 'red' },
    { icon: FaShieldAlt, title: 'Legal Assistance', desc: 'End-to-end legal support for property transactions including documentation, registration, and title verification.', color: 'indigo' },
  ];

  const colorMap = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-700', hover: 'hover:border-blue-700' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-500', hover: 'hover:border-amber-500' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', hover: 'hover:border-green-600' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', hover: 'hover:border-purple-600' },
    red: { bg: 'bg-red-50', icon: 'text-red-600', hover: 'hover:border-red-600' },
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', hover: 'hover:border-indigo-600' },
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <section className="bg-gradient-to-br from-blue-900 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">What We Do</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Our Services</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Comprehensive real estate solutions tailored to your needs
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const c = colorMap[service.color];
              return (
                <div key={i} className={`bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent ${c.hover} group`}>
                  <div className={`w-16 h-16 ${c.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`text-2xl ${c.icon}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-500 mb-8">We understand every client is unique. Let us create a personalized plan for your real estate needs.</p>
          <a href="/contact" className="inline-flex px-8 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition shadow-lg">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
