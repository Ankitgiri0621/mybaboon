import { Link } from "react-router";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Mywoods</h2>
          <p>
            Quiet cabins, treehouses, and cottages tucked into the forest —
            built for slow mornings and starlit nights.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/woods">Woods</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>hello@mywoods.example</p>
          <p>+91 98765 43210</p>
          <p>New Delhi, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Mywoods. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
