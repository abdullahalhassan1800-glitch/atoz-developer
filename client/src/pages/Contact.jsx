import { useState } from 'react';
import { contactAPI } from '../utils/api';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheck, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.send(form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const input = "w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all";

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <section className="bg-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal-400 text-xs font-semibold uppercase tracking-wider">Get in Touch</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Contact Us</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Have a question or want to discuss a property? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-5">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: FaMapMarkerAlt, label: 'Address', value: '123 Business Avenue, Andheri West, Mumbai 400058' },
                    { icon: FaPhoneAlt, label: 'Phone', value: '+91 98765 43210' },
                    { icon: FaEnvelope, label: 'Email', value: 'info@atozdeveloper.com' },
                    { icon: FaClock, label: 'Hours', value: 'Mon - Sat: 9:00 AM - 7:00 PM' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-teal-600 text-sm" />
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm text-gray-700">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Follow Us</h3>
                <div className="flex gap-2">
                  {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                    <a key={i} href="#" className="w-9 h-9 bg-gray-100 hover:bg-teal-600 hover:text-white rounded-lg flex items-center justify-center text-gray-400 transition-colors">
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white p-7 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-5">Send us a Message</h3>
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheck className="text-teal-600 text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Message Sent!</h3>
                    <p className="text-sm text-gray-500">We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSent(false)} className="mt-4 text-sm text-teal-600 font-medium hover:underline">Send another</button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
                      <input type="email" placeholder="Email Address" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} />
                      <input type="text" placeholder="Subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={input} />
                    </div>
                    <textarea placeholder="Your Message" rows={4} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${input} resize-none`} />
                    <button type="submit" disabled={loading} className="w-full py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-sm disabled:opacity-50">
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
