import { FaUsers, FaAward, FaHandshake, FaBullseye, FaEye, FaHeart, FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';

const team = [
  { name: 'Vikram Mehta', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { name: 'Sneha Kapoor', role: 'Head of Sales', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  { name: 'Ravi Singh', role: 'Property Consultant', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
  { name: 'Anjali Desai', role: 'Client Relations', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero */}
      <section className="bg-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal-400 text-xs font-semibold uppercase tracking-wider">About Us</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Our Story</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Building trust in real estate since 2010. A TO Z Developer is your complete real estate solution partner.
          </p>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-7 rounded-xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
              <FaBullseye className="text-teal-600 text-xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              To provide transparent, reliable, and personalized real estate services that help our clients make informed decisions and find properties they truly love.
            </p>
          </div>
          <div className="bg-white p-7 rounded-xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
              <FaEye className="text-amber-500 text-xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Our Vision</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              To become India's most trusted and innovative real estate brand, making property transactions simple, accessible, and rewarding for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: FaAward, num: '15+', label: 'Years Experience' },
            { icon: FaHandshake, num: '2,500+', label: 'Happy Clients' },
            { icon: FaUsers, num: '50+', label: 'Team Members' },
            { icon: FaHeart, num: '5,000+', label: 'Properties Sold' },
          ].map((s, i) => (
            <div key={i} className="p-4">
              <s.icon className="text-teal-600 text-2xl mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{s.num}</h3>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-teal-600 text-xs font-semibold uppercase tracking-wider">Our Team</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Meet the Experts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((m, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-56 overflow-hidden">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 text-sm">{m.name}</h3>
                  <p className="text-xs text-teal-600 mt-0.5">{m.role}</p>
                  <div className="flex justify-center gap-2 mt-3">
                    {[FaLinkedinIn, FaTwitter, FaEnvelope].map((Icon, j) => (
                      <a key={j} href="#" className="w-7 h-7 bg-gray-100 hover:bg-teal-600 hover:text-white rounded-full flex items-center justify-center text-gray-400 transition-colors">
                        <Icon size={11} />
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
}
