import { useEffect, useState } from "react";
import { getTodaysMatches } from "../api";
import { fetchWallpaperByMatch } from "../fetchWall";

const MatchWallpaperFetcher = () => {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [wallpapers, setWallpapers] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const matchesData = await getTodaysMatches();
                setMatches(matchesData);
            } catch (error) {
                console.error('Error fetching matches:', error);
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
                const fetchedWallpapers = await fetchWallpaperByMatch(match);
                setWallpapers(fetchedWallpapers);
            } catch (error) {
                console.error('Error fetching wallpapers:', error);
            }
        }
    };

    return (
        <div>
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
            <div>
                {wallpapers.length > 0 ? (
                    wallpapers.map((wallpaper, index) => (
                        <div key={index}>
                            <h2>{wallpaper.teamA} vs {wallpaper.teamB} - {wallpaper.day}</h2>
                            <img src={wallpaper.imageURL} alt={`${wallpaper.teamA} vs ${wallpaper.teamB} wallpaper`} style={{ width: '100%', maxWidth: '600px' }} />
                        </div>
                    ))
                ) : (
                    selectedMatch && <p>No wallpapers found for this match.</p>
                )}
            </div>
        </div>
    );
};

export default MatchWallpaperFetcher;