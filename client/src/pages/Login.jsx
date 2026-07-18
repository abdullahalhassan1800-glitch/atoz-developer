import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
    <div className="min-h-screen bg-cream flex items-center justify-center pt-20 pb-14 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 border border-gold/60 flex items-center justify-center mx-auto mb-4">
            <span className="text-gold font-bold text-xs tracking-[0.2em]">AZ</span>
          </div>
          <h1 className="text-2xl font-normal text-charcoal" style={{ fontFamily: "'Playfair Display', serif" }}>Welcome Back</h1>
          <p className="text-sm font-light text-black/40 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white p-8 border border-black/5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 mb-6 font-light">{error}</div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="text-[10px] font-light text-black/40 tracking-[0.2em] uppercase mb-2 block">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 text-xs" />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" className="w-full pl-10 pr-4 py-3 bg-cream border border-black/10 text-sm font-light outline-none focus:border-gold transition-all duration-300" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-light text-black/40 tracking-[0.2em] uppercase mb-2 block">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 text-xs" />
                <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter password" className="w-full pl-10 pr-10 py-3 bg-cream border border-black/10 text-sm font-light outline-none focus:border-gold transition-all duration-300" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20 hover:text-gold transition-colors">
                  {showPass ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3.5 bg-gold text-charcoal text-xs font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-8">
            <div className="w-8 h-px bg-gold/30 mx-auto mb-6" />
            <p className="text-sm font-light text-black/40">
              Don't have an account?{' '}
              <Link to="/register" className="text-gold font-light hover:text-gold-dark transition-colors">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
