import { useState, useContext } from "react";
import { NavLink, Link } from "react-router";
import AuthContext from "../../context/AuthContext";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo">
                    MY<span>WOODS</span>
                </Link>

                <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/woods" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                Stays
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                Contact
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/cms" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                CMS
                            </NavLink>
                        </li>
                        
                        {user ? (
                            <>
                                <li className="nav-item" style={{marginLeft: "1rem", color: "#64748b", fontWeight: "500"}}>
                                    Hi, {user.name}
                                </li>
                                <li className="nav-item">
                                    <button 
                                        onClick={() => { logout(); setIsMenuOpen(false); }} 
                                        className="btn btn-outline"
                                        style={{padding: "0.5rem 1rem", fontSize: "0.875rem"}}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item" style={{marginLeft: "auto"}}>
                                    <NavLink to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                        Log in
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/signup" className="btn btn-primary" onClick={() => setIsMenuOpen(false)} style={{textDecoration: "none", color: "white"}}>
                                        Sign up
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
