// src/pages/Contact.jsx
import React from 'react';

function Contact() {
  return (
    <div className="page contact">
      <h1>Contact Us</h1>
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Message"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;