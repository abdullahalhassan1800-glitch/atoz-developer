import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'buyer' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const iconInput = "w-full pl-10 pr-4 py-3 glass rounded-xl text-white text-sm font-light placeholder:text-white/20 outline-none focus:border-accent/50 transition-all";

  return (
    <div className="min-h-screen relative flex items-center justify-center pt-20 pb-14 px-4">
      <div className="absolute inset-0 bg-deep" />
      <div className="absolute inset-0 bg-mesh" />
      <div className="relative w-full max-w-md">
        <div className="glass rounded-2xl p-8">
          <div className="text-center mb-7">
            <div className="w-12 h-12 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-accent/20">
              <span className="text-white font-bold text-sm">AZ</span>
            </div>
            <h2 className="text-xl font-bold text-white">Create Account</h2>
            <p className="text-sm font-light text-white/40 mt-1">Join A TO Z Developer</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-4 font-light">{error}</div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-[10px] font-semibold text-white/30 tracking-[0.15em] uppercase mb-1.5 block">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" className={iconInput} />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-white/30 tracking-[0.15em] uppercase mb-1.5 block">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" className={iconInput} />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-white/30 tracking-[0.15em] uppercase mb-1.5 block">Phone</label>
              <div className="relative">
                <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" className={iconInput} />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-white/30 tracking-[0.15em] uppercase mb-1.5 block">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
                <input type={showPass ? 'text' : 'password'} required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min 6 characters" className="w-full pl-10 pr-10 py-3 glass rounded-xl text-white text-sm font-light placeholder:text-white/20 outline-none focus:border-accent/50 transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-accent transition-colors">
                  {showPass ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-white/30 tracking-[0.15em] uppercase mb-1.5 block">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                {[{ v: 'buyer', l: 'Buyer / Renter' }, { v: 'agent', l: 'Property Agent' }].map((o) => (
                  <button type="button" key={o.v} onClick={() => setForm({ ...form, role: o.v })} className={`py-3 rounded-xl text-sm font-medium border transition-all duration-300 ${form.role === o.v ? 'border-accent bg-accent/10 text-accent' : 'border-white/10 text-white/40 hover:border-white/20'}`}>
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3.5 gradient-accent text-white text-sm font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all disabled:opacity-50">
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6">
            <div className="w-8 h-px bg-white/10 mx-auto mb-5" />
            <p className="text-sm font-light text-white/40">
              Already have an account?{' '}
              <Link to="/login" className="text-accent font-medium hover:text-white transition-colors">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
