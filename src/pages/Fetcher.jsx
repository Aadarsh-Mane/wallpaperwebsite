import React, { useEffect, useState } from "react";
import '../styles/MatchWallpaperFetcher.css'
import { getTodaysMatches } from '../services/api'
import { deleteWallpaper, getDocIdByImageURL } from '../services/firebase'
import { fetchWallpaperByMatch } from '../services/fetchWall'
const MatchWallpaperFetcher = () => {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [wallpapers, setWallpapers] = useState([]);
    const [loading, setLoading] = useState(false);

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
                </div>
            ) : (
                <div className="wallpapers-grid">
                    {wallpapers.length > 0 ? (
                        wallpapers.map((wallpaper, index) => (
                            <div key={index} className="wallpaper-item">
                                <h2>{wallpaper.title}</h2>
                                <img
                                    src={wallpaper.imageURL}
                                    alt={`${wallpaper.teamA} vs ${wallpaper.teamB} wallpaper`}
                                    className="wallpaper-image"
                                />
                                <button
                                    onClick={() => handleDelete(wallpaper.imageURL)}
                                    className="wallpaper-delete-button"
                                >
                                    Delete
                                </button>
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