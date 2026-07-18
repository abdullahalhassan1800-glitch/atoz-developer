import { useState } from 'react';
import { contactAPI } from '../utils/api';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheck, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <section className="bg-gradient-to-br from-teal-900 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Contact Us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Have a question or want to discuss a property? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-5">Contact Information</h3>
                <div className="space-y-5">
                  {[
                    { icon: FaMapMarkerAlt, label: 'Address', value: '123 Business Avenue, Andheri West, Mumbai 400058' },
                    { icon: FaPhoneAlt, label: 'Phone', value: '+91 98765 43210' },
                    { icon: FaEnvelope, label: 'Email', value: 'info@atozdeveloper.com' },
                    { icon: FaClock, label: 'Hours', value: 'Mon - Sat: 9:00 AM - 7:00 PM' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-teal-700" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                        <p className="text-sm text-gray-900 font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 bg-gray-100 hover:bg-teal-700 hover:text-white rounded-full flex items-center justify-center text-gray-500 transition">
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Send us a Message</h3>
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheck className="text-green-500 text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSent(false)} className="mt-4 text-teal-700 hover:underline text-sm">Send another message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Your Name *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500" />
                      <input type="email" placeholder="Email Address *" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500" />
                      <input type="text" placeholder="Subject *" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>
                    <textarea placeholder="Your Message *" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 resize-none"></textarea>
                    <button type="submit" disabled={loading} className="w-full py-3 bg-teal-700 text-white font-semibold rounded-xl hover:bg-teal-800 transition shadow-lg hover:shadow-xl disabled:opacity-50">
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
};

export default Contact;
