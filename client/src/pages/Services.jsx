import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/Animations';
import { FaHome, FaTag, FaComments, FaCogs, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const services = [
  { icon: FaHome, title: 'Property Buying', desc: 'Find your perfect home from our curated collection of verified properties across India.', gradient: 'gradient-accent' },
  { icon: FaTag, title: 'Property Selling', desc: 'Get the best price with our marketing expertise and extensive buyer network.', gradient: 'gradient-primary' },
  { icon: FaComments, title: 'Consulting', desc: 'Expert advice on investments, market trends, and property valuations.', gradient: 'gradient-warm' },
  { icon: FaCogs, title: 'Management', desc: 'Complete property management including tenant screening, maintenance, and rent collection.', gradient: 'gradient-accent' },
  { icon: FaChartLine, title: 'Investment Advisory', desc: 'Strategic investment planning to maximize your returns in real estate.', gradient: 'gradient-primary' },
  { icon: FaShieldAlt, title: 'Legal Assistance', desc: 'End-to-end legal support for transactions, documentation, and title verification.', gradient: 'gradient-warm' },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-deep">
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">What We Do</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mt-4 mb-4">Our Services</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="w-12 h-1 gradient-accent rounded-full mx-auto mb-6" />
            <p className="text-slate-400 max-w-2xl mx-auto text-sm font-light">Comprehensive real estate solutions tailored to your needs</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl p-7 border border-slate-200 hover:border-sky-200 shadow-soft hover:shadow-medium transition-all duration-300 group h-full"
                  >
                    <div className={`w-12 h-12 ${s.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-medium transition-shadow`}>
                      <s.icon className="text-white text-lg" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-2">{s.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="bg-white rounded-2xl p-10 sm:p-14 border border-slate-200 shadow-soft">
              <div className="w-12 h-1 gradient-accent rounded-full mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Need a Custom Solution?</h2>
              <p className="text-sm text-slate-400 mb-8 max-w-lg mx-auto">We understand every client is unique. Let us create a personalized plan for your real estate needs.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/contact" className="inline-flex px-8 py-3 gradient-accent text-white text-sm font-semibold rounded-xl shadow-medium hover:shadow-strong transition-shadow">
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
