import logo from './logo.svg';
import './App.css';

import  Home from'../src/components/HomeBar'
import Navbar from '../src/components/NavBar'
import MatchWallpaperUploader from '../src/pages/Upload'
import MatchWallpaperFetcher from '../src/pages/Fetcher'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WallpaperOfTheDay from './pages/WallpaperDay';
import { useEffect, useState } from 'react';
import Requested from './pages/Requested';
import PlayerWallpaperManager from './pages/PlayerWall';



function App({ isAuthenticated }) {
    const [isAuth, setIsAuth] = useState(isAuthenticated);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [showDialog, setShowDialog] = useState(!isAuthenticated); // Show dialog if not authenticated initially

    useEffect(() => {
        setIsAuth(isAuthenticated);
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        // if (id === 'marwallpaper' && password === 'ronaldo') {
            if (id.trim() === 'marwallpaper' && password.trim() === 'ronaldo') {

            setIsAuth(true);
            setShowDialog(false);
        } else {
            alert('Invalid ID or Password');
        }
    };

    return (
        <div>

            <PlayerWallpaperManager/>
        </div>
        // <div className="App">
        //     {showDialog && (
        //         <div className="login-dialog">
        //             <form onSubmit={handleLogin} className="login-form">
        //                 <h2>Please Log In</h2>
        //                 <label>
        //                     ID:
        //                     <input
        //                         type="text"
        //                         value={id}
        //                         onChange={(e) => setId(e.target.value)}
        //                         className="login-input"
        //                     />
        //                 </label>
        //                 <label>
        //                     Password:
        //                     <input
        //                         type="password"
        //                         value={password}
        //                         onChange={(e) => setPassword(e.target.value)}
        //                         className="login-input"
        //                     />
        //                 </label>
        //                 <button type="submit" className="login-button">Login</button>
        //             </form>
        //         </div>
        //     )}

        //     {isAuth && (
        //         <Router>
        //             <div>
        //                 <Navbar />
        //                 <Routes>
        //                     <Route path="/" element={<Home />} />
        //                     <Route path="/upload" element={<MatchWallpaperUploader />} />
        //                     <Route path="/fetch" element={<MatchWallpaperFetcher />} />
        //                     <Route path="/theday" element={<WallpaperOfTheDay />} />
        //                     <Route path="/request" element={<Requested />} />
        //                 </Routes>
        //             </div>
        //         </Router>
        //     )}
        // </div>
    );
}

  export default App;