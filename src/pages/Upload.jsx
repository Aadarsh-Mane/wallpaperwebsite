import React, { useState, useEffect } from "react";
import { getTodaysMatches } from "../api";
// import uploadWallpaper from '../firebase';
import './MatchWallpaperUploader.css'; // Import custom CSS for styling
import { uploadWallpaper } from "../firebase";

const MatchWallpaperUploader = () => {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
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

    const handleMatchChange = (e) => {
        const matchIndex = e.target.value;
        setSelectedMatch(matches[matchIndex]);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file && selectedMatch && title) {
            setLoading(true);
            await uploadWallpaper(file, selectedMatch, title);
            setLoading(false);
        } else {
            alert("Please select a match, enter a title, and choose a file first!");
        }
    };

    return (
        <div className="uploader-container">
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
                <label htmlFor="title-input">Enter a title:</label>
                <input
                    type="text"
                    id="title-input"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter title for the wallpaper"
                    required
                />
                <br />
                <input type="file" onChange={handleFileChange} />
                {loading ? (
                    <h1>loading</h1>
                    // <CircularProgress size={24} className="upload-loader" /> // Show loading spinner if loading is true
                ) : (
                    <button type="submit">Upload</button>
                )}
            </form>
        </div>
    );
};

export default MatchWallpaperUploader;
