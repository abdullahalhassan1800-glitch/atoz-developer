import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'buyer' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20 pb-16 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-700 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">AZ</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-500 text-sm mt-1">Join A TO Z Developer today</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Phone</label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Enter phone number" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPass ? 'text' : 'password'} required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Create password (min 6 chars)" className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'buyer', label: 'Buyer / Renter' },
                  { value: 'agent', label: 'Property Agent' },
                ].map((opt) => (
                  <button type="button" key={opt.value} onClick={() => setForm({ ...form, role: opt.value })} className={`py-3 rounded-xl text-sm font-medium border-2 transition ${form.role === opt.value ? 'border-blue-700 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-800 hover:to-blue-600 transition shadow-lg disabled:opacity-50">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-700 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
