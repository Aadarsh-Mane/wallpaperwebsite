import React, { useEffect, useState } from "react";
import { getTodaysMatches } from "../api";
import './MatchWallpaperFetcher.css'
import { deleteWallpaper, deleteWallpaperByImageURL, getDocIdByImageURL } from "../firebase";
import { fetchWallpaperByMatch } from "../fetchWall";
const MatchWallpaperFetcher = () => {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [wallpapers, setWallpapers] = useState([]);
    const [loading, setLoading] = useState(false); // State for loading animation

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);
                const matchesData = await getTodaysMatches();
                setMatches(matchesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching matches:', error);
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    const handleMatchChange = async (e) => {
        const matchIndex = e.target.value;
        const match = matches[matchIndex];
        setSelectedMatch(match);

        if (match) {
            try {
                setLoading(true);
                const fetchedWallpapers = await fetchWallpaperByMatch(match);
                setWallpapers(fetchedWallpapers);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching wallpapers:', error);
                setLoading(false);
            }
        }
    };

    const handleDelete = async (imageURL) => {
        if (window.confirm("Are you sure you want to delete this wallpaper?")) {
            try {
                setLoading(true);
                const docId = await getDocIdByImageURL(imageURL);
                if (docId) {
                    await deleteWallpaper(docId, imageURL);
                    // Refresh the list of wallpapers after deletion
                    if (selectedMatch) {
                        const refreshedWallpapers = await fetchWallpaperByMatch(selectedMatch);
                        setWallpapers(refreshedWallpapers);
                    }
                } else {
                    console.log('Document ID not found for imageURL:', imageURL);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error deleting wallpaper:', error.message);
                setLoading(false);
            }
        }
    };


    return (
        <div className="fetcher-container">
            <h1>Fetch Match Wallpapers</h1>
            <label htmlFor="match-select">Choose a match:</label>
            <select id="match-select" onChange={handleMatchChange} defaultValue="">
                <option value="" disabled>Select a match</option>
                {matches.map((match, index) => (
                    <option key={index} value={index}>
                        {match.teamA} vs {match.teamB} - {match.day}
                    </option>
                ))}
            </select>
            {loading ? (
                <div className="fetch-loader">
                    <h1>Loading...</h1>
                    {/* Add loading animation or spinner here */}
                </div>
            ) : (
                <div>
                    {wallpapers.length > 0 ? (
                        wallpapers.map((wallpaper, index) => (
                            <div key={index} className="wallpaper-item">
                                <h2>{wallpaper.title}</h2>
                                <h2>{wallpaper.teamA} vs {wallpaper.teamB} - {wallpaper.day}</h2>
                                <img src={wallpaper.imageURL} alt={`${wallpaper.teamA} vs ${wallpaper.teamB} wallpaper`} className="wallpaper-image" />
                                <button onClick={() => handleDelete(wallpaper.imageURL)}>Delete</button>
                            </div>
                        ))
                    ) : (
                        selectedMatch && <p>No wallpapers found for this match.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MatchWallpaperFetcher;