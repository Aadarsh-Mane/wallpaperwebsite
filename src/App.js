import logo from './logo.svg';
import './App.css';

import WallpaperUploader from './pages/Upload';
import MatchWallpaperUploader from './pages/Upload';
import MatchWallpaperFetcher from './pages/Fetcher';

function App() {
  return (
    <div className="App">
    {/* <UploadForm/> */}
    {/* <WallpaperUploader/
    > */}
    <MatchWallpaperUploader/>
    <MatchWallpaperFetcher/>
    {/* <TodayMatchesWallpapers/> */}
    {/* <DisplayWallpapers/> */}
    </div>
  );
}

export default App;
