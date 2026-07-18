import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI } from '../utils/api';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { FadeIn, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem, HeroText, SlideUp, ScaleIn } from '../components/Animations';
import { FaArrowRight, FaHome, FaHandshake, FaCity, FaAward } from 'react-icons/fa';
import { motion } from 'framer-motion';

function AnimatedCounter({ target, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/[^0-9]/g, ''));
    const step = num / (duration * 60);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  const formatted = target.includes('+') ? `${count.toLocaleString()}+` : target.includes(',') ? count.toLocaleString() : count;
  return <span ref={ref}>{formatted}{suffix}</span>;
}

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    propertyAPI.getFeatured().then((r) => setFeatured(r.data)).catch(() => {});
  }, []);

  const stats = [
    { icon: FaHome, num: '2500+', label: 'Properties Sold' },
    { icon: FaHandshake, num: '1800+', label: 'Happy Clients' },
    { icon: FaCity, num: '50', label: 'Cities' },
    { icon: FaAward, num: '15', label: 'Years' },
  ];

  const testimonials = [
    { name: 'Rahul Sharma', role: 'Homeowner', text: 'A TO Z Developer made buying my dream home effortless. Their team guided me through every step with unmatched professionalism.' },
    { name: 'Priya Patel', role: 'Investor', text: 'Exceptional investment advisory. They helped me choose properties that delivered outstanding returns beyond expectations.' },
    { name: 'Amit Kumar', role: 'First-time Buyer', text: 'As a first-time buyer I was nervous, but their team found me the perfect apartment within budget. Truly premium service.' },
  ];

  const whyUs = [
    { title: 'Expert Guidance', desc: 'Seasoned professionals providing personalized counsel for your property journey.' },
    { title: 'Verified Listings', desc: 'Every property meticulously verified for accuracy and authenticity.' },
    { title: 'Best Deals', desc: 'Skilled negotiation ensuring maximum value for your investment.' },
    { title: 'End-to-End Support', desc: 'From discovery to registration, we handle every detail.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-deep" />
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600" alt="" className="w-full h-full object-cover opacity-10" />
        </div>

        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-10 animate-float"
          style={{ background: 'radial-gradient(circle, #06d6a0, transparent 70%)' }}
        />
        <motion.div
          className="absolute bottom-32 left-10 w-96 h-96 rounded-full opacity-5 animate-float-slow"
          style={{ background: 'radial-gradient(circle, #667eea, transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
          <div className="max-w-2xl">
            <HeroText>
              <div className="w-12 h-1 gradient-accent rounded-full mb-6 animate-pulse-glow" />
            </HeroText>
            <HeroText delay={0.1}>
              <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase block mb-4">Welcome to A TO Z Developer</span>
            </HeroText>
            <HeroText delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05]">
                Find Your<br />
                <span className="gradient-text text-glow">Dream Home</span><br />
                With Us
              </h1>
            </HeroText>
            <HeroText delay={0.3}>
              <p className="text-white/40 max-w-lg mb-12 text-sm sm:text-base font-light leading-relaxed">
                India's premier real estate partner. Discover properties that embody elegance, comfort, and timeless value.
              </p>
            </HeroText>
            <HeroText delay={0.4}>
              <SearchBar />
            </HeroText>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-deep-light" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <StaggerItem key={i}>
                <div className="glass rounded-2xl p-6 text-center hover:border-accent/20 transition-all duration-300 group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-block"
                  >
                    <s.icon className="text-accent text-xl mb-3" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    <AnimatedCounter target={s.num} suffix={s.num.includes('+') ? '' : '+'} />
                  </h3>
                  <p className="text-xs font-light text-white/30 tracking-wider uppercase">{s.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Properties */}
      {featured.length > 0 && (
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-deep" />
          <div className="absolute inset-0 bg-mesh opacity-30" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
              <div>
                <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Portfolio</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Featured Properties</h2>
              </div>
              <Link to="/properties" className="text-sm font-medium text-accent hover:text-white flex items-center gap-2 transition-colors group">
                View all <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
            <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p) => (
                <StaggerItem key={p._id}>
                  <PropertyCard property={p} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-deep-light" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Excellence</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Why Choose A TO Z Developer</h2>
          </FadeIn>
          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl p-7 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-colors duration-300 group h-full"
                >
                  <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center mb-4 text-white font-bold text-sm shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-shadow">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm font-light text-white/30 leading-relaxed">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-deep" />
        <div className="absolute inset-0 bg-mesh" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">What Our Clients Say</h2>
          </FadeIn>
          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="glass rounded-2xl p-7 hover:border-accent/20 transition-colors duration-300 h-full"
                >
                  <div className="w-8 h-1 gradient-accent rounded-full mb-5" />
                  <p className="text-sm font-light text-white/50 leading-relaxed mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 gradient-accent rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-accent/20"
                    >
                      {t.name.charAt(0)}
                    </motion.div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                      <p className="text-[11px] font-light text-white/30">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-deep-light" />
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600" alt="" className="w-full h-full object-cover opacity-5" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideUp>
            <div className="w-12 h-1 gradient-accent rounded-full mx-auto mb-8 animate-pulse-glow" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Find Your Dream Home?</h2>
            <p className="text-white/30 mb-10 max-w-lg mx-auto text-sm font-light leading-relaxed">Connect with our expert team and discover a property that reflects your lifestyle.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/properties" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 gradient-accent text-white text-sm font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-shadow">
                  Browse Properties <FaArrowRight className="text-xs" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 glass text-white text-sm font-medium rounded-xl hover:border-accent/30 transition-all">
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
