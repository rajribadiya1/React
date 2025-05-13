
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './Pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Testimonials from './Pages/Testimonial';
import FAQ from './Pages/FAQ';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
        
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;