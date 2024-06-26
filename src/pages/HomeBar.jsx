import React from 'react';
import Navbar from './NavBar';
import './Home.css'; // Import your custom CSS for homepage styling

const HomeBar = () => {
    return (
        <div className="home">
            {/* <Navbar /> Assuming you have a Navbar component */}
            <div className="home-content">
                <h1 className="company-namee">MAR Wallpaper</h1>
                <p className="slogan">Discover and download stunning wallpapers for free!</p>
                <div className="cta-buttons">
                    <a href="/upload" className="cta-button">Upload Wallpaper</a>
                    <a href="/fetch" className="cta-button">Fetch Wallpapers</a>
                </div>
            </div>
        </div>
    );
};

export default HomeBar;