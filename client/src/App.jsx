import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

const NotFound = () => (
  <div className="min-h-[60vh] flex items-center justify-center pt-20 bg-white">
    <div className="text-center">
      <span className="text-6xl font-light text-gold" style={{ fontFamily: "'Playfair Display', serif" }}>404</span>
      <div className="w-8 h-px bg-gold/30 mx-auto my-6" />
      <h2 className="text-xl font-normal text-charcoal mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Page Not Found</h2>
      <p className="text-sm font-light text-black/40 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="inline-flex px-8 py-3 bg-gold text-charcoal text-xs font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300">
        Go Home
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
