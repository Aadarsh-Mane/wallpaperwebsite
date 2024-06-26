import logo from './logo.svg';
import './App.css';

import  Home from'../src/components/HomeBar'
import Navbar from '../src/components/NavBar'
import MatchWallpaperUploader from '../src/pages/Upload'
import MatchWallpaperFetcher from '../src/pages/Fetcher'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WallpaperOfTheDay from './pages/WallpaperDay';
import { useEffect, useState } from 'react';


function App({ isAuthenticated }) {
    // State to manage authentication and visibility of the dialog
    const [isAuth, setIsAuth] = useState(isAuthenticated);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [showDialog, setShowDialog] = useState(!isAuthenticated); // Show dialog if not authenticated initially
  
    // Effect to update authentication state when prop changes
    useEffect(() => {
      setIsAuth(isAuthenticated);
    }, [isAuthenticated]);
  
    // Function to handle the login submission
    const handleLogin = (e) => {
      e.preventDefault();
      // Check the credentials
      if (id === 'marwallpaper' && password === 'ronaldo') {
        setIsAuth(true);
        setShowDialog(false);
      } else {
        alert('Invalid ID or Password');
      }
    };
  
    return (
      <div className="App">
        {/* Conditional rendering of the dialog box */}
        {showDialog && (
          <div className="login-dialog">
            <form onSubmit={handleLogin}>
              <h2>Please Log In</h2>
              <label>
                ID:
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <br />
              <button type="submit">Login</button>
            </form>
          </div>
        )}
  
        {/* Render the app content only if authenticated */}
        {isAuth && (
          <Router>
            <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<MatchWallpaperUploader />} />
                <Route path="/fetch" element={<MatchWallpaperFetcher />} />
                <Route path="/theday" element={<WallpaperOfTheDay />} />
              </Routes>
            </div>
          </Router>
        )}
      </div>
    );
  }
  
  export default App;