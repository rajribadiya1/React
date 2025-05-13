import React from 'react'

const Footer = () => {
  return (
    <>
  <footer className="bg-light pt-4 pb-2">
  <div className="container">
    <div className="row">
      <div className="col-md-4 mb-3">
        <h5>About Us</h5>
        <p>Company description and mission statement.</p>
      </div>
      <div className="col-md-4 mb-3">
        <h5>Quick Links</h5>
        <ul className="list-unstyled">
          <li><a href="#" className="text-decoration-none">Home</a></li>
          <li><a href="#" className="text-decoration-none">Services</a></li>
          <li><a href="#" className="text-decoration-none">Contact</a></li>
        </ul>
      </div>
      <div className="col-md-4 mb-3">
        <h5>Contact</h5>
        <address>
          123 Main St<br />
          City, State 12345<br />
          <a href="mailto:info@example.com">info@example.com</a>
        </address>
      </div>
    </div>
    <hr />
    <div className="text-center">
      <p className="mb-0">© 2023 Company Name. All rights reserved.</p>
    </div>
  </div>
</footer>

  </>
  )
}

export default Footer