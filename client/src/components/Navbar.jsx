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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const active = (p) => pathname === p;

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-2xl shadow-black/20' : 'bg-charcoal'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 border border-gold/60 flex items-center justify-center">
            <span className="text-gold font-bold text-xs tracking-[0.2em]">AZ</span>
          </div>
          <div className="leading-none">
            <span className="text-[15px] font-light text-white tracking-[0.15em] block" style={{ fontFamily: "'Playfair Display', serif" }}>A TO Z</span>
            <span className="block text-[8px] font-light text-gold tracking-[0.3em] mt-0.5">DEVELOPER</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-4 py-2 text-xs font-light tracking-[0.1em] uppercase transition-all duration-300 ${
                active(l.path)
                  ? 'text-gold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {l.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 border border-gold/40 flex items-center justify-center">
                <span className="text-gold text-xs font-medium">{user.name?.charAt(0)}</span>
              </div>
              <span className="text-xs font-light text-white/80 tracking-wider uppercase">{user.name}</span>
              <button onClick={logout} className="text-xs font-light text-white/40 hover:text-gold transition-colors tracking-wider uppercase">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-xs font-light text-white/60 hover:text-white tracking-[0.1em] uppercase transition-colors">
                Log in
              </Link>
              <Link to="/register" className="px-5 py-2 text-xs font-light text-charcoal bg-gold hover:bg-gold-light tracking-[0.15em] uppercase transition-all duration-300">
                Sign up
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white/60 hover:text-gold transition-colors">
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-charcoal border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`block px-4 py-3 text-xs font-light tracking-[0.15em] uppercase transition-colors ${
                  active(l.path) ? 'text-gold' : 'text-white/60 hover:text-white'
                }`}
              >
                {l.name}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-3 pt-3 flex gap-2">
              {user ? (
                <button onClick={logout} className="flex-1 py-3 text-xs font-light text-gold border border-gold/30 tracking-[0.15em] uppercase hover:bg-gold hover:text-charcoal transition-all">Logout</button>
              ) : (
                <>
                  <Link to="/login" className="flex-1 text-center py-3 text-xs font-light text-white/60 border border-white/10 tracking-[0.15em] uppercase hover:border-gold/40 hover:text-gold transition-all">Log in</Link>
                  <Link to="/register" className="flex-1 text-center py-3 text-xs font-light text-charcoal bg-gold tracking-[0.15em] uppercase hover:bg-gold-light transition-all">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
