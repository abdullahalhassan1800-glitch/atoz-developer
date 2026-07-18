import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 gradient-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xs tracking-tight">AZ</span>
              </div>
              <div className="leading-none">
                <span className="text-[15px] font-bold text-white tracking-tight">A TO Z</span>
                <span className="block text-[8px] font-semibold text-sky-400 tracking-[0.2em] -mt-0.5">DEVELOPER</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Your trusted partner in finding the perfect property. We make real estate simple and accessible.
            </p>
            <div className="flex gap-2 mt-5">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
                >
                  <Icon size={12} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-xs tracking-[0.15em] uppercase mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'Properties', path: '/properties' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Contact', path: '/contact' },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-slate-400 hover:text-white transition-colors duration-300">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-xs tracking-[0.15em] uppercase mb-5">Services</h3>
            <ul className="space-y-3 text-sm">
              {['Property Buying', 'Property Selling', 'Consulting', 'Management', 'Investment Advisory'].map((s) => (
                <li key={s} className="text-slate-400">{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-xs tracking-[0.15em] uppercase mb-5">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-sky-400 mt-1 flex-shrink-0" />
                <span className="text-slate-400">123 Business Avenue, Andheri West, Mumbai 400058</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-sky-400 flex-shrink-0" />
                <span className="text-slate-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-sky-400 flex-shrink-0" />
                <span className="text-slate-400">info@atozdeveloper.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} A TO Z Developer. All rights reserved.</p>
          <p>Crafted with care for your dream home</p>
        </div>
      </div>
    </footer>
  );
}
