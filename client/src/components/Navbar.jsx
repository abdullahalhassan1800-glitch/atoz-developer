import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Properties', path: '/properties' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const active = (p) => pathname === p;

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center">
            <span className="text-white font-extrabold text-sm tracking-tight">AZ</span>
          </div>
          <div className="leading-none">
            <span className="text-[15px] font-bold text-gray-900 tracking-tight">A TO Z</span>
            <span className="block text-[9px] font-bold text-teal-600 tracking-[0.15em] -mt-0.5">DEVELOPER</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                active(l.path)
                  ? 'text-teal-700 bg-teal-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {l.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-bold">
                {user.name?.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <button onClick={logout} className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                Log in
              </Link>
              <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
                Sign up
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100">
          {open ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active(l.path) ? 'text-teal-700 bg-teal-50' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {l.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2 flex gap-2">
              {user ? (
                <button onClick={logout} className="flex-1 py-2.5 text-sm font-medium text-red-500 bg-red-50 rounded-lg">Logout</button>
              ) : (
                <>
                  <Link to="/login" className="flex-1 text-center py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg">Log in</Link>
                  <Link to="/register" className="flex-1 text-center py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
