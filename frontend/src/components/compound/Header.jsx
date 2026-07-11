import { useState, useContext } from "react";
import { NavLink, Link } from "react-router";
import AuthContext from "../../context/AuthContext";

function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

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
          <Link to="/" style={{textDecoration: "none", color: "inherit"}}>
            <h2><span className="logo-icon">🌲</span> Mywoods</h2>
          </Link>
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
        {user ? (
          <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
            <span style={{color: "#64748b", fontWeight: "500", fontSize: "0.95rem"}}>Hi, {user.name}</span>
            <button className="btn" onClick={() => { logout(); setOpen(false); }}>Logout</button>
          </div>
        ) : (
          <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
            <Link to="/login" style={{textDecoration: "none", color: "#1e293b", fontWeight: "500"}} onClick={() => setOpen(false)}>Log in</Link>
            <Link to="/signup" className="btn" onClick={() => setOpen(false)}>Sign up</Link>
          </div>
        )}

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
