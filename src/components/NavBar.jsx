import React, { useState } from 'react';
// import logo from './logo.svg'; // Import your logo file
import '../styles/NavBar.css'
import { Link } from 'react-router-dom';
import logo from '../logo.png';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="navbar">
            <div className="logo-container">
                <img src={logo} alt="Company Logo" className="logo" />
                <h1 className="company-name">MAR Wallpaper</h1>
            </div>
            <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/upload" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Upload Wallpaper</Link>
                <Link to="/fetch" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Fetch Wallpapers</Link>
                <Link to="/theday" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Wallpaper of the Day</Link>
                <Link to="/request" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Request Box</Link>
            </div>
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                ☰
            </button>
        </div>
    );
};

export default Navbar;