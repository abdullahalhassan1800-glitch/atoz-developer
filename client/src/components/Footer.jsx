import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border border-gold/60 flex items-center justify-center">
                <span className="text-gold font-bold text-xs tracking-[0.2em]">AZ</span>
              </div>
              <div className="leading-none">
                <span className="text-[15px] font-light text-white tracking-[0.15em] block" style={{ fontFamily: "'Playfair Display', serif" }}>A TO Z</span>
                <span className="block text-[8px] font-light text-gold tracking-[0.3em] mt-0.5">DEVELOPER</span>
              </div>
            </div>
            <p className="text-sm font-light leading-relaxed max-w-xs text-white/40">
              Your trusted partner in finding the perfect property. We make real estate simple and accessible.
            </p>
            <div className="flex gap-3 mt-6">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-white/10 hover:border-gold/60 hover:bg-gold/10 flex items-center justify-center transition-all duration-300 text-white/30 hover:text-gold">
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm font-light tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Quick Links</h3>
            <ul className="space-y-3 text-sm font-light">
              {[
                { name: 'Home', path: '/' },
                { name: 'Properties', path: '/properties' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Contact', path: '/contact' },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="hover:text-gold transition-colors duration-300 tracking-wider">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-light tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Services</h3>
            <ul className="space-y-3 text-sm font-light">
              {['Property Buying', 'Property Selling', 'Consulting', 'Management', 'Investment Advisory'].map((s) => (
                <li key={s} className="tracking-wider">{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-light tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Contact</h3>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gold mt-1 flex-shrink-0" />
                <span className="tracking-wide">123 Business Avenue, Andheri West, Mumbai 400058</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-gold flex-shrink-0" />
                <span className="tracking-wide">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-gold flex-shrink-0" />
                <span className="tracking-wide">info@atozdeveloper.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-light tracking-wider text-white/30">
          <p>&copy; {new Date().getFullYear()} A TO Z Developer. All rights reserved.</p>
          <p>Crafted with elegance for your dream home</p>
        </div>
      </div>
    </footer>
  );
}
