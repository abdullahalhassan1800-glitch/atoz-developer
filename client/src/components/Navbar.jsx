import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AZ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">A TO Z</h1>
              <p className="text-xs text-amber-500 font-semibold -mt-1">DEVELOPER</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-700 border-b-2 border-blue-700 pb-1'
                    : 'text-gray-600 hover:text-blue-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-lg transition">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg hover:from-blue-800 hover:to-blue-600 transition shadow-md">
                  Register
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600">
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.path) ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <hr />
            {user ? (
              <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-4 py-2 text-red-600 font-medium rounded-lg hover:bg-red-50">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-blue-700 font-medium rounded-lg hover:bg-blue-50">Login</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-white bg-blue-700 font-medium rounded-lg text-center">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
