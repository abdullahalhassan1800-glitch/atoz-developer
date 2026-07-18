import { useState } from 'react';
import { contactAPI } from '../utils/api';
import { motion } from 'framer-motion';
import { FadeIn, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '../components/Animations';
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

  const input = "w-full px-4 py-3 glass rounded-xl text-white text-sm font-light placeholder:text-white/30 outline-none focus:border-accent/50 transition-all";

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-deep" />
      <div className="absolute inset-0 bg-mesh opacity-30" />

      <section className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Get in Touch</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">Contact Us</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="w-12 h-1 gradient-accent rounded-full mx-auto mb-6" />
            <p className="text-white/40 max-w-2xl mx-auto text-sm font-light">Have a question or want to discuss a property? We'd love to hear from you.</p>
          </FadeIn>
        </div>
      </section>

      <section className="relative py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FadeInLeft delay={0.1}>
              <div className="space-y-5">
                <div className="glass-card rounded-2xl p-7">
                  <h3 className="font-semibold text-white mb-5">Contact Information</h3>
                  <StaggerContainer>
                    <div className="space-y-5">
                      {[
                        { icon: FaMapMarkerAlt, label: 'Address', value: '123 Business Avenue, Andheri West, Mumbai 400058' },
                        { icon: FaPhoneAlt, label: 'Phone', value: '+91 98765 43210' },
                        { icon: FaEnvelope, label: 'Email', value: 'info@atozdeveloper.com' },
                        { icon: FaClock, label: 'Hours', value: 'Mon - Sat: 9:00 AM - 7:00 PM' },
                      ].map((item, i) => (
                        <StaggerItem key={i}>
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 gradient-accent rounded-xl flex items-center justify-center flex-shrink-0">
                              <item.icon className="text-white text-xs" />
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-white/30 tracking-[0.15em] uppercase mb-1">{item.label}</p>
                              <p className="text-sm font-light text-white/60">{item.value}</p>
                            </div>
                          </div>
                        </StaggerItem>
                      ))}
                    </div>
                  </StaggerContainer>
                </div>

                <div className="glass-card rounded-2xl p-7">
                  <h3 className="font-semibold text-white mb-3 text-sm">Follow Us</h3>
                  <div className="flex gap-2">
                    {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/30 hover:text-accent hover:border-accent/30 transition-all duration-300"
                      >
                        <Icon size={12} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInLeft>

            <FadeInRight delay={0.2}>
              <div className="lg:col-span-2">
                <div className="glass-card rounded-2xl p-7 sm:p-9">
                  <h3 className="font-semibold text-white mb-6">Send us a Message</h3>
                  {sent ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-14"
                    >
                      <div className="w-14 h-12 gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/20">
                        <FaCheck className="text-white text-xl" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">Message Sent!</h3>
                      <p className="text-sm font-light text-white/40">We'll get back to you within 24 hours.</p>
                      <button onClick={() => setSent(false)} className="mt-5 text-sm font-medium text-accent hover:text-white transition-colors">Send another</button>
                    </motion.div>
                  ) : (
                    <form onSubmit={submit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
                        <input type="email" placeholder="Email Address" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} />
                        <input type="text" placeholder="Subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={input} />
                      </div>
                      <textarea placeholder="Your Message" rows={4} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${input} resize-none`} />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 gradient-accent text-white text-sm font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-shadow disabled:opacity-50"
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>
    </div>
  );
}
