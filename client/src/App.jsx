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
  <div className="min-h-[60vh] flex items-center justify-center relative pt-20">
    <div className="absolute inset-0 bg-deep" />
    <div className="absolute inset-0 bg-mesh" />
    <div className="relative text-center">
      <span className="text-6xl font-bold gradient-text">404</span>
      <div className="w-10 h-1 gradient-accent rounded-full mx-auto my-5" />
      <h2 className="text-xl font-bold text-white mb-2">Page Not Found</h2>
      <p className="text-sm font-light text-white/40 mb-7">The page you're looking for doesn't exist.</p>
      <Link to="/" className="inline-flex px-7 py-3 gradient-accent text-white text-sm font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all">
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
