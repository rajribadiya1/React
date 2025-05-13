// src/components/Navigation.jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/testimonials">Testimonials</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;