import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

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
  const loc = useLocation();
  const active = (p) => loc.pathname === p;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-border-light' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 gradient-accent rounded-xl flex items-center justify-center shadow-medium">
            <span className="text-white font-bold text-xs tracking-tight">AZ</span>
          </div>
          <div className="leading-none">
            <span className="text-[15px] font-bold text-slate-800 tracking-tight">A TO Z</span>
            <span className="block text-[8px] font-semibold text-accent tracking-[0.2em] -mt-0.5">DEVELOPER</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link key={l.path} to={l.path} className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${active(l.path) ? 'text-accent bg-sky-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
              {l.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2.5">
          {user ? (
            <>
              <span className="text-xs font-medium text-slate-400">{user.name}</span>
              <button onClick={logout} className="px-4 py-2 text-[13px] font-medium text-red-500 hover:bg-red-50 rounded-lg transition-all">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all">Log in</Link>
              <Link to="/register" className="px-5 py-2 text-[13px] font-semibold text-white gradient-accent rounded-xl shadow-medium hover:shadow-strong transition-shadow">Sign up</Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
          {open ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((l, i) => (
                <motion.div key={l.path} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link to={l.path} onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-xl text-[13px] font-medium transition-all ${active(l.path) ? 'text-accent bg-sky-50' : 'text-slate-500 hover:bg-slate-50'}`}>
                    {l.name}
                  </Link>
                </motion.div>
              ))}
              <div className="border-t border-border-light mt-2 pt-2 flex gap-2">
                {user ? (
                  <button onClick={() => { logout(); setOpen(false); }} className="flex-1 py-3 text-[13px] font-medium text-red-500 bg-red-50 rounded-xl">Logout</button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center py-3 text-[13px] font-medium text-slate-500 bg-slate-50 rounded-xl">Log in</Link>
                    <Link to="/register" onClick={() => setOpen(false)} className="flex-1 text-center py-3 text-[13px] font-semibold text-white gradient-accent rounded-xl">Sign up</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
