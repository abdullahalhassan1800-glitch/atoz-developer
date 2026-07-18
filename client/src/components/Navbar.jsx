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
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const active = (p) => pathname === p;

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-18 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 gradient-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
            <span className="text-white font-bold text-xs tracking-tight">AZ</span>
          </div>
          <div className="leading-none">
            <span className="text-[15px] font-bold text-white tracking-tight">A TO Z</span>
            <span className="block text-[8px] font-semibold text-accent tracking-[0.2em] -mt-0.5">DEVELOPER</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-4 py-2 text-[13px] font-medium rounded-xl transition-all duration-300 ${
                active(l.path)
                  ? 'text-accent bg-accent/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-accent/20">
                {user.name?.charAt(0)}
              </div>
              <span className="text-[13px] font-medium text-white/80">{user.name}</span>
              <button onClick={logout} className="text-[13px] font-medium text-white/40 hover:text-red-400 transition-colors px-3 py-1.5 rounded-xl hover:bg-red-500/10">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-[13px] font-medium text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all">
                Log in
              </Link>
              <Link to="/register" className="px-5 py-2 text-[13px] font-semibold text-white gradient-accent rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all">
                Sign up
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl text-white/60 hover:bg-white/10 transition-all">
          {open ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-strong border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`block px-4 py-3 rounded-xl text-[13px] font-medium transition-all ${
                  active(l.path) ? 'text-accent bg-accent/10' : 'text-white/60 hover:bg-white/5'
                }`}
              >
                {l.name}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-2 pt-2 flex gap-2">
              {user ? (
                <button onClick={logout} className="flex-1 py-3 text-[13px] font-medium text-red-400 bg-red-500/10 rounded-xl">Logout</button>
              ) : (
                <>
                  <Link to="/login" className="flex-1 text-center py-3 text-[13px] font-medium text-white/60 glass rounded-xl">Log in</Link>
                  <Link to="/register" className="flex-1 text-center py-3 text-[13px] font-semibold text-white gradient-accent rounded-xl">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
