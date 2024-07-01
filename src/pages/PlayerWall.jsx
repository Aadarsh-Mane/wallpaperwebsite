import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../services/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { players } from "../constants/playersName";
import { useEffect, useState } from "react";
import '../styles/PlayerWallpaperManager.css'
function PlayerWallpaperManager() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [title, setTitle] = useState("");
    const [images, setImages] = useState([]);
    const [playerWallpapers, setPlayerWallpapers] = useState([]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter players based on the search term
    const filteredPlayers = players.filter((player) =>
        player.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle player selection
    const handlePlayerSelect = async (player) => {
        setSelectedPlayer(player);
        await fetchPlayerWallpapers(player);
        setSearchTerm(""); // Clear search term after selection
    };

    // Handle image file change
    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    // Handle title change
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // Upload images to Firebase Storage and save metadata to Firestore
    const handleUpload = async () => {
        if (!selectedPlayer || images.length === 0 || !title) {
            alert("Please select a player, add a title, and choose images to upload.");
            return;
        }

        try {
            const playerDocRef = doc(firestore, "players", selectedPlayer);
            const playerData = await getDoc(playerDocRef);
            const existingWallpapers = playerData.exists() ? playerData.data().wallpapers || [] : [];

            const uploadPromises = images.map(async (image) => {
                const storageRef = ref(storage, `players/${selectedPlayer}/${uuidv4()}_${image.name}`);
                await uploadBytes(storageRef, image);
                const downloadURL = await getDownloadURL(storageRef);
                return { title, url: downloadURL, storagePath: storageRef.fullPath }; // Store storage path for deletion
            });

            const newWallpapers = await Promise.all(uploadPromises);
            const updatedWallpapers = [...existingWallpapers, ...newWallpapers];

            await setDoc(playerDocRef, { wallpapers: updatedWallpapers }, { merge: true });

            alert("Images uploaded successfully!");
            setImages([]);
            setTitle("");
            await fetchPlayerWallpapers(selectedPlayer); // Refresh the displayed wallpapers
        } catch (error) {
            console.error("Error uploading images:", error);
            alert("Failed to upload images. Please try again later.");
        }
    };

    // Fetch player's wallpapers from Firestore
    const fetchPlayerWallpapers = async (player) => {
        try {
            const playerDocRef = doc(firestore, "players", player);
            const playerData = await getDoc(playerDocRef);
            if (playerData.exists()) {
                const wallpapers = playerData.data().wallpapers || [];

                console.log("Fetched wallpapers with storage paths:", wallpapers);
                setPlayerWallpapers(wallpapers);
            } else {
                setPlayerWallpapers([]);
            }
        } catch (error) {
            console.error("Error fetching player wallpapers:", error);
            alert("Failed to fetch player wallpapers. Please try again later.");
        }
    };

    // Delete wallpaper from Firebase Storage and Firestore
    const handleDelete = async (wallpaper) => {
        const confirmed = window.confirm("Are you sure you want to delete this wallpaper?");
        if (!confirmed) return;

        try {
            // Log storagePath to verify it
            console.log("Deleting wallpaper with storage path:", wallpaper.storagePath);

            if (!wallpaper.storagePath) {
                console.error("Invalid storage path:", wallpaper.storagePath);
                return;
            }

            // Delete from Firebase Storage
            const storageRef = ref(storage, wallpaper.storagePath);
            await deleteObject(storageRef);

            // Remove from Firestore
            const playerDocRef = doc(firestore, "players", selectedPlayer);
            const playerData = await getDoc(playerDocRef);
            if (playerData.exists()) {
                const updatedWallpapers = playerData.data().wallpapers.filter(wp => wp.url !== wallpaper.url);
                await updateDoc(playerDocRef, { wallpapers: updatedWallpapers });
                setPlayerWallpapers(updatedWallpapers); // Update the state
            }
        } catch (error) {
            console.error("Error deleting wallpaper:", error);
            alert("Failed to delete wallpaper. Please try again later.");
        }
    };

    // Fetch wallpapers when selectedPlayer changes
    useEffect(() => {
        if (selectedPlayer) {
            fetchPlayerWallpapers(selectedPlayer);
        }
    }, [selectedPlayer]);

    return (
        <div className="fetcher-container">
            <h1>Player Wallpaper Manager</h1>

            <div>
                <input
                    type="text"
                    placeholder="Search player..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {searchTerm && (
                    <ul className="player-list">
                        {filteredPlayers.length > 0 ? (
                            filteredPlayers.map((player) => (
                                <li key={player} onClick={() => handlePlayerSelect(player)} style={{ cursor: "pointer" }}>
                                    {player}
                                </li>
                            ))
                        ) : (
                            <p>No players found.</p>
                        )}
                    </ul>
                )}
            </div>

            {selectedPlayer && (
                <div className="upload-section">
                    <h2>Selected Player: {selectedPlayer}</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                    />
                    <button onClick={handleUpload} className="upload-button">Upload Images</button>
                </div>
            )}

            {playerWallpapers.length > 0 && (
                <div className="wallpapers-grid">
                    {playerWallpapers.map((wallpaper, index) => (
                        <div key={index} className="wallpaper-item">
                            <h2>{wallpaper.title}</h2>
                            <img src={wallpaper.url} alt={wallpaper.title} className="wallpaper-image" />
                            <button
                                className="wallpaper-delete-button"
                                onClick={() => handleDelete(wallpaper)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PlayerWallpaperManager;