import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tyres from './pages/Tyres';
import TyreDetail from './pages/TyreDetail';
import Wheels from './pages/Wheels';
import CarServices from './pages/CarServices';
import AutoRepairs from './pages/AutoRepairs';
import Deals from './pages/Deals';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tyres" element={<Tyres />} />
          <Route path="/tyres/:id" element={<TyreDetail />} />
          <Route path="/wheels" element={<Wheels />} />
          <Route path="/car-services" element={<CarServices />} />
          <Route path="/services" element={<CarServices />} />
          <Route path="/car-repairs" element={<AutoRepairs />} />
          <Route path="/repairs" element={<AutoRepairs />} />
          <Route path="/auto-repairs" element={<AutoRepairs />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
