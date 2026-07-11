import { useState } from "react";
import { NavLink } from "react-router";

function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/woods", label: "Woods" },
    { to: "/contact", label: "Contact" },
    { to: "/cms", label: "CMS" },
  ];

  return (
    <header className="header">
      <div className="logo-mark">
        <div className="logo">
          <h2><span className="logo-icon">🌲</span> Mywoods</h2>
        </div>
      </div>

      <nav>
        <ul className={`nav-links ${open ? "open" : ""}`}>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header-actions">
        <button className="btn">Get Started</button>
        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Header;
