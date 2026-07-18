import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center">
                <span className="text-white font-extrabold text-sm">AZ</span>
              </div>
              <div className="leading-none">
                <span className="text-[15px] font-bold text-white tracking-tight">A TO Z</span>
                <span className="block text-[9px] font-bold text-teal-400 tracking-[0.15em] -mt-0.5">DEVELOPER</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Your trusted partner in finding the perfect property. We make real estate simple and accessible.
            </p>
            <div className="flex gap-2 mt-5">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-gray-800 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-colors text-gray-400 hover:text-white">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'Properties', path: '/properties' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Contact', path: '/contact' },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="hover:text-white transition-colors">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {['Property Buying', 'Property Selling', 'Consulting', 'Management', 'Investment Advisory'].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-teal-500 mt-0.5 flex-shrink-0" />
                <span>123 Business Avenue, Andheri West, Mumbai 400058</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-teal-500 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="text-teal-500 flex-shrink-0" />
                <span>info@atozdeveloper.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} A TO Z Developer. All rights reserved.</p>
          <p>Made with care for your dream home</p>
        </div>
      </div>
    </footer>
  );
}
