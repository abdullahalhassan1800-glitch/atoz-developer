import { FaUsers, FaAward, FaHandshake, FaBullseye, FaEye, FaHeart, FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';

const About = () => {
  const team = [
    { name: 'Vikram Mehta', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    { name: 'Sneha Kapoor', role: 'Head of Sales', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
    { name: 'Ravi Singh', role: 'Property Consultant', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
    { name: 'Anjali Desai', role: 'Client Relations', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Our Story</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Building trust in real estate since 2010. A TO Z Developer is your complete real estate solution partner.
          </p>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-teal-700">
            <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
              <FaBullseye className="text-teal-700 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide transparent, reliable, and personalized real estate services that help our clients make informed decisions and find properties they truly love.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-amber-500">
            <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
              <FaEye className="text-amber-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become India's most trusted and innovative real estate brand, making property transactions simple, accessible, and rewarding for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: FaAward, num: '15+', label: 'Years Experience' },
            { icon: FaHandshake, num: '2,500+', label: 'Happy Clients' },
            { icon: FaUsers, num: '50+', label: 'Team Members' },
            { icon: FaHeart, num: '5,000+', label: 'Properties Sold' },
          ].map((s, i) => (
            <div key={i}>
              <s.icon className="text-teal-700 text-3xl mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">{s.num}</h3>
              <p className="text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Meet the Experts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition">
                <div className="h-64 overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-teal-700">{member.role}</p>
                  <div className="flex justify-center gap-3 mt-3">
                    {[FaLinkedinIn, FaTwitter, FaEnvelope].map((Icon, j) => (
                      <a key={j} href="#" className="w-8 h-8 bg-gray-100 hover:bg-teal-700 hover:text-white rounded-full flex items-center justify-center text-gray-500 transition text-xs">
                        <Icon />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
