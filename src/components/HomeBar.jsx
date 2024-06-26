import React from 'react';
import Navbar from './NavBar';
import '../styles/Home.css'
const HomeBar = () => {
    return (
        <div className="home">
            {/* <Navbar /> Include Navbar if it's part of the design */}
            <div className="home-content">
                <h1 className="company-namee">MAR Wallpaper</h1>
                <p className="slogan">Deliever the  best, stunning wallpapers for !</p>
                <div className="cta-buttons">
                    <a href="/upload" className="cta-button">Upload Wallpaper</a>
                    <a href="/fetch" className="cta-button">Fetch Wallpapers</a>
                </div>
            </div>
        </div>
    );
};

export default HomeBar;