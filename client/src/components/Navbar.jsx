import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-700 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">AZ</span>
            </div>
            <div className="leading-none">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">A TO Z</h1>
              <p className="text-[10px] md:text-xs text-amber-500 font-semibold -mt-0.5">DEVELOPER</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors py-1 ${
                  isActive(link.path)
                    ? 'text-teal-700'
                    : 'text-gray-600 hover:text-teal-700'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-700 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-sm">
                  {user.name?.charAt(0)}
                </div>
                <span className="text-sm text-gray-600 font-medium">{user.name}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-teal-700 hover:bg-teal-50 rounded-lg transition">
                  Login
                </Link>
                <Link to="/register" className="px-5 py-2 text-sm font-medium text-white bg-teal-700 rounded-xl hover:bg-teal-800 transition shadow-md hover:shadow-lg">
                  Register
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="bg-white border-t shadow-lg px-4 py-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition ${
                isActive(link.path) ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <hr className="my-2" />
          {user ? (
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <button onClick={() => { logout(); setIsOpen(false); }} className="px-4 py-2 text-sm text-red-600 font-medium rounded-lg hover:bg-red-50 transition">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2 px-1 pb-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex-1 text-center px-4 py-3 text-teal-700 font-medium rounded-xl hover:bg-teal-50 transition text-sm border border-teal-200">
                Login
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="flex-1 text-center px-4 py-3 text-white bg-teal-700 font-medium rounded-xl hover:bg-teal-800 transition text-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
