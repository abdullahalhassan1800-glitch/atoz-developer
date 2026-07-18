import { FaUsers, FaAward, FaHandshake, FaHeart, FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';

const team = [
  { name: 'Vikram Mehta', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { name: 'Sneha Kapoor', role: 'Head of Sales', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  { name: 'Ravi Singh', role: 'Property Consultant', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
  { name: 'Anjali Desai', role: 'Client Relations', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
];

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-charcoal py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold text-xs font-light tracking-[0.3em] uppercase">About Us</span>
          <h1 className="text-4xl sm:text-5xl font-normal text-white mt-4 mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Our Story</h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-6" />
          <p className="text-white/40 max-w-2xl mx-auto text-sm font-light leading-relaxed">
            Building trust in real estate since 2010. A TO Z Developer is your complete real estate solution partner.
          </p>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 border border-black/5 hover:border-gold/20 transition-all duration-500">
            <div className="w-12 h-px bg-gold mb-6" />
            <h3 className="text-xl font-normal text-charcoal mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Our Mission</h3>
            <p className="text-sm font-light text-black/40 leading-relaxed">
              To provide transparent, reliable, and personalized real estate services that help our clients make informed decisions and find properties they truly love.
            </p>
          </div>
          <div className="p-10 border border-black/5 hover:border-gold/20 transition-all duration-500">
            <div className="w-12 h-px bg-gold mb-6" />
            <h3 className="text-xl font-normal text-charcoal mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Our Vision</h3>
            <p className="text-sm font-light text-black/40 leading-relaxed">
              To become India's most trusted and innovative real estate brand, making property transactions simple, accessible, and rewarding for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: FaAward, num: '15+', label: 'Years Experience' },
            { icon: FaHandshake, num: '2,500+', label: 'Happy Clients' },
            { icon: FaUsers, num: '50+', label: 'Team Members' },
            { icon: FaHeart, num: '5,000+', label: 'Properties Sold' },
          ].map((s, i) => (
            <div key={i} className="p-6">
              <div className="w-px h-8 bg-gold/30 mx-auto mb-4" />
              <h3 className="text-3xl font-light text-charcoal mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{s.num}</h3>
              <p className="text-xs font-light text-black/40 tracking-[0.15em] uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold text-xs font-light tracking-[0.3em] uppercase">Our Team</span>
            <h2 className="text-3xl sm:text-4xl font-normal text-charcoal mt-3" style={{ fontFamily: "'Playfair Display', serif" }}>Meet the Experts</h2>
            <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={i} className="group overflow-hidden border border-black/5 hover:border-gold/20 transition-all duration-500">
                <div className="h-64 overflow-hidden">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-normal text-charcoal text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>{m.name}</h3>
                  <p className="text-[10px] font-light text-gold tracking-[0.2em] uppercase mt-1">{m.role}</p>
                  <div className="flex justify-center gap-3 mt-4">
                    {[FaLinkedinIn, FaTwitter, FaEnvelope].map((Icon, j) => (
                      <a key={j} href="#" className="w-8 h-8 border border-black/10 hover:border-gold/40 hover:bg-gold/10 flex items-center justify-center text-black/20 hover:text-gold transition-all duration-300">
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
