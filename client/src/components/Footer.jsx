import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AZ</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white leading-tight">A TO Z</h2>
                <p className="text-xs text-amber-400 font-semibold -mt-1">DEVELOPER</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted partner in finding the perfect property. We make real estate simple, transparent, and accessible for everyone.
            </p>
            <div className="flex gap-3 mt-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'Properties', path: '/properties' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-amber-400 transition">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-amber-400 transition cursor-pointer">Property Buying</li>
              <li className="hover:text-amber-400 transition cursor-pointer">Property Selling</li>
              <li className="hover:text-amber-400 transition cursor-pointer">Property Consulting</li>
              <li className="hover:text-amber-400 transition cursor-pointer">Property Management</li>
              <li className="hover:text-amber-400 transition cursor-pointer">Investment Advisory</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-amber-400 mt-1 flex-shrink-0" />
                <span>123 Business Avenue, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-amber-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-amber-400 flex-shrink-0" />
                <span>info@atozdeveloper.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-sm text-gray-500">&copy; 2026 A TO Z Developer. All rights reserved.</p>
          <p className="text-sm text-gray-500">Designed with passion for your dream home</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
