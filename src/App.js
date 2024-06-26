import logo from './logo.svg';
import './App.css';

import WallpaperUploader from './pages/Upload';
import MatchWallpaperUploader from './pages/Upload';
import MatchWallpaperFetcher from './pages/Fetcher';
import Navbar from './pages/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomeBar';


function App() {
  return (
      <Router>
          <div className="App">
              <Navbar /> {/* Add the Navbar component */}
              <Routes>
                  <Route path="/" element={<Home />} /> 
                  <Route path="/upload" element={<MatchWallpaperUploader />} />
                  <Route path="/fetch" element={<MatchWallpaperFetcher />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
