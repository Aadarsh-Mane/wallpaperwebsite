import { useEffect, useState } from "react";
import { getTodaysMatches } from "../api";
import uploadWallpaper from '../firebase'
const MatchWallpaperUploader = () => {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [file, setFile] = useState(null);

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

    const handleMatchChange = (e) => {
        const matchIndex = e.target.value;
        setSelectedMatch(matches[matchIndex]);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file && selectedMatch) {
            await uploadWallpaper(file, selectedMatch);
        } else {
            alert("Please select a match and a file first!");
        }
    };

    return (
        <div>
            <h1>Upload Match Wallpaper</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="match-select">Choose a match:</label>
                <select id="match-select" onChange={handleMatchChange} defaultValue="">
                    <option value="" disabled>Select a match</option>
                    {matches.map((match, index) => (
                        <option key={index} value={index}>
                            {match.teamA} vs {match.teamB} - {match.day}
                        </option>
                    ))}
                </select>
                <br />
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default MatchWallpaperUploader;