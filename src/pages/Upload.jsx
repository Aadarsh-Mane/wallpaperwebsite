import React, { useState, useEffect } from "react";
import { uploadWallpaper } from '../services/firebase';
import '../styles/MatchWallpaperUploader.css'; // Import custom CSS for styling
// import { uploadWallpaper } from "../firebase";
import { getTodaysMatches } from "../services/api";
const MatchWallpaperUploader = () => {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [files, setFiles] = useState([]); // State to store selected files
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false); // State for loading animation
    const [uploadStatus, setUploadStatus] = useState(""); // State for upload status text


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
        // Convert FileList to Array
        const fileList = Array.from(e.target.files);
        setFiles(fileList);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (files.length > 0 && selectedMatch && title) {
            setLoading(true);
            // setUploadStatus("Uploading..."); // Set initial status

            // Iterate through each file and upload it
            await Promise.all(files.map(file => uploadWallpaper(file, selectedMatch, title)));
            setLoading(false);
            // setUploadStatus("done"); // Clear status on successful upload

        } else {
            // setUploadStatus(""); // Clear status on successful upload

            alert("Please select a match, enter a title, and choose at least one file first!");
        }
    };

    return (
        <div className="uploader-container">
            <h1>Upload Match Wallpapers</h1>
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
                    placeholder="Enter title for the wallpapers"
                    required
                />
                <br />
                <input type="file" onChange={handleFileChange} multiple />
                {loading ? (
                    <div className="custom-loader">
                        {/* <div className="loader-text">{uploadStatus}</div> */}
                    </div>
                    // <CircularProgress size={24} className="upload-loader" /> // Show loading spinner if loading is true
                ) : (
                    <button type="submit">Upload</button>
                )}
            </form>
        </div>
    );
};

export default MatchWallpaperUploader;