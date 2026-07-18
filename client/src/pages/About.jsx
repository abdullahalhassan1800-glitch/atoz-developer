import { FaUsers, FaAward, FaHandshake, FaHeart, FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';

const team = [
  { name: 'Vikram Mehta', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { name: 'Sneha Kapoor', role: 'Head of Sales', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  { name: 'Ravi Singh', role: 'Property Consultant', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
  { name: 'Anjali Desai', role: 'Client Relations', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
];

export default function About() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-deep" />
      <div className="absolute inset-0 bg-mesh opacity-30" />

      {/* Hero */}
      <section className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">About Us</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">Our Story</h1>
          <div className="w-12 h-1 gradient-accent rounded-full mx-auto mb-6" />
          <p className="text-white/40 max-w-2xl mx-auto text-sm font-light leading-relaxed">
            Building trust in real estate since 2010. A TO Z Developer is your complete real estate solution partner.
          </p>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-8 hover:border-accent/20 transition-all duration-500">
            <div className="w-12 h-10 gradient-accent rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-accent/20">
              <FaAward className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Our Mission</h3>
            <p className="text-sm font-light text-white/40 leading-relaxed">
              To provide transparent, reliable, and personalized real estate services that help our clients make informed decisions and find properties they truly love.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-8 hover:border-accent/20 transition-all duration-500">
            <div className="w-12 h-10 gradient-warm rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-pink-500/20">
              <FaHeart className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Our Vision</h3>
            <p className="text-sm font-light text-white/40 leading-relaxed">
              To become India's most trusted and innovative real estate brand, making property transactions simple, accessible, and rewarding for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: FaAward, num: '15+', label: 'Years Experience' },
            { icon: FaHandshake, num: '2,500+', label: 'Happy Clients' },
            { icon: FaUsers, num: '50+', label: 'Team Members' },
            { icon: FaHeart, num: '5,000+', label: 'Properties Sold' },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-6 hover:border-accent/20 transition-all duration-300">
              <s.icon className="text-accent text-xl mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">{s.num}</h3>
              <p className="text-xs font-light text-white/30 tracking-wider uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Our Team</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Meet the Experts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden hover:border-accent/20 transition-all duration-500 group">
                <div className="h-56 overflow-hidden">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-semibold text-white text-sm">{m.name}</h3>
                  <p className="text-xs font-light text-accent mt-1">{m.role}</p>
                  <div className="flex justify-center gap-2 mt-3">
                    {[FaLinkedinIn, FaTwitter, FaEnvelope].map((Icon, j) => (
                      <a key={j} href="#" className="w-7 h-7 glass rounded-lg flex items-center justify-center text-white/30 hover:text-accent hover:border-accent/30 transition-all duration-300">
                        <Icon size={10} />
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
