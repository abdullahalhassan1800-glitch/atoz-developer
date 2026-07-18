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

  const input = "w-full px-4 py-3 bg-cream border border-black/10 text-sm font-light text-black/70 placeholder:text-black/30 outline-none focus:border-gold transition-all duration-300";

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-charcoal py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold text-xs font-light tracking-[0.3em] uppercase">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl font-normal text-white mt-4 mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Contact Us</h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-6" />
          <p className="text-white/40 max-w-2xl mx-auto text-sm font-light">Have a question or want to discuss a property? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="space-y-6">
              <div className="p-8 border border-black/5">
                <h3 className="font-normal text-charcoal mb-6 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Contact Information</h3>
                <div className="space-y-5">
                  {[
                    { icon: FaMapMarkerAlt, label: 'Address', value: '123 Business Avenue, Andheri West, Mumbai 400058' },
                    { icon: FaPhoneAlt, label: 'Phone', value: '+91 98765 43210' },
                    { icon: FaEnvelope, label: 'Email', value: 'info@atozdeveloper.com' },
                    { icon: FaClock, label: 'Hours', value: 'Mon - Sat: 9:00 AM - 7:00 PM' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-9 h-px bg-gold mt-2 flex-shrink-0 flex items-center justify-center">
                        <item.icon className="text-gold text-xs" />
                      </div>
                      <div>
                        <p className="text-[10px] font-light text-black/30 tracking-[0.2em] uppercase mb-1">{item.label}</p>
                        <p className="text-sm font-light text-black/60">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 border border-black/5">
                <h3 className="font-normal text-charcoal mb-4 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Follow Us</h3>
                <div className="flex gap-3">
                  {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                    <a key={i} href="#" className="w-9 h-9 border border-black/10 hover:border-gold/40 hover:bg-gold/10 flex items-center justify-center text-black/20 hover:text-gold transition-all duration-300">
                      <Icon size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="p-8 sm:p-10 border border-black/5">
                <h3 className="font-normal text-charcoal mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Send us a Message</h3>
                {sent ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-px bg-gold mx-auto mb-6" />
                    <h3 className="text-xl font-normal text-charcoal mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Message Sent!</h3>
                    <p className="text-sm font-light text-black/40">We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSent(false)} className="mt-6 text-xs font-light text-gold hover:text-gold-dark tracking-[0.15em] uppercase transition-colors">Send another</button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
                      <input type="email" placeholder="Email Address" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} />
                      <input type="text" placeholder="Subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={input} />
                    </div>
                    <textarea placeholder="Your Message" rows={4} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${input} resize-none`} />
                    <button type="submit" disabled={loading} className="w-full py-3.5 bg-gold text-charcoal text-xs font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-50">
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
