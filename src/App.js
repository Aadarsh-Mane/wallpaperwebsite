import logo from './logo.svg';
import './App.css';

import  Home from'../src/components/HomeBar'
import Navbar from '../src/components/NavBar'
import MatchWallpaperUploader from '../src/pages/Upload'
import MatchWallpaperFetcher from '../src/pages/Fetcher'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WallpaperOfTheDay from './pages/WallpaperDay';


function App() {
  return (
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
  );
}

export default App;
