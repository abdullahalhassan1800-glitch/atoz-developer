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

  const iconInput = "w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16 pb-14 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="text-center mb-6">
            <div className="w-11 h-11 bg-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-sm">AZ</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Create Account</h2>
            <p className="text-sm text-gray-400 mt-1">Join A TO Z Developer</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>
          )}

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" className={iconInput} />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" className={iconInput} />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Phone</label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" className={iconInput} />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input type={showPass ? 'text' : 'password'} required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min 6 characters" className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">I am a</label>
              <div className="grid grid-cols-2 gap-2">
                {[{ v: 'buyer', l: 'Buyer / Renter' }, { v: 'agent', l: 'Property Agent' }].map((o) => (
                  <button type="button" key={o.v} onClick={() => setForm({ ...form, role: o.v })} className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${form.role === o.v ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-sm disabled:opacity-50">
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-teal-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
