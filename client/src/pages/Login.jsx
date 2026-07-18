import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ScaleIn } from '../components/Animations';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-14 px-4 bg-deep">
      <div className="relative w-full max-w-md">
        <ScaleIn>
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-medium">
            <div className="text-center mb-7">
              <div className="w-12 h-12 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-medium">
                <span className="text-white font-bold text-sm">AZ</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800">Welcome Back</h2>
              <p className="text-sm text-slate-400 mt-1">Sign in to your account</p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-4">
                {error}
              </motion.div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 tracking-[0.15em] uppercase mb-1.5 block">Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-xs" />
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm font-light placeholder:text-slate-300 outline-none focus:border-accent focus:ring-2 focus:ring-sky-100 transition-all" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 tracking-[0.15em] uppercase mb-1.5 block">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-xs" />
                  <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter password" className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm font-light placeholder:text-slate-300 outline-none focus:border-accent focus:ring-2 focus:ring-sky-100 transition-all" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-accent transition-colors">
                    {showPass ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                  </button>
                </div>
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full py-3 gradient-accent text-white text-sm font-semibold rounded-xl shadow-medium hover:shadow-strong transition-shadow disabled:opacity-50">
                {loading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </form>

            <div className="text-center mt-6">
              <div className="w-8 h-px bg-slate-200 mx-auto mb-5" />
              <p className="text-sm text-slate-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-accent font-medium hover:text-accent-dark transition-colors">Sign up</Link>
              </p>
            </div>
          </div>
        </ScaleIn>
      </div>
    </div>
  );
}
