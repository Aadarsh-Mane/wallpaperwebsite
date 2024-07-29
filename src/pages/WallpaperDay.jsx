import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { firestore, storage } from "../services/firebase";
import '../styles/WallpaperDay.css';
import { v4 as uuidv4 } from "uuid";  // Import UUID library

const WallpaperOfTheDay = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [uploading, setUploading] = useState(false);
    const [wallpapers, setWallpapers] = useState([]);
    const [isPremium, setIsPremium] = useState(false); // New state for premium status

    useEffect(() => {
        const fetchWallpapers = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'wallpaperOfTheDay'));
            const fetchedWallpapers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setWallpapers(fetchedWallpapers);
        };

        fetchWallpapers();
    }, []);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!image || !title || !price) {
            alert('Please select an image, provide a title and a price.');
            return;
        }

        setUploading(true);

        const storageRef = ref(storage, `wallpapers/${image.name}`);
        try {
            await uploadBytes(storageRef, image);
            const imageURL = await getDownloadURL(storageRef);

            // Generate a unique wallpaper ID
            const wallpaperId = uuidv4();

            const docRef = await addDoc(collection(firestore, 'wallpaperOfTheDay'), {
                wallpaperId,  // Include the generated ID
                title,
                imageURL,
                price: parseFloat(price),
                isPremium, // Save premium status
                createdAt: new Date(),
            });

            setWallpapers([...wallpapers, { id: docRef.id, wallpaperId, title, imageURL, price: parseFloat(price), isPremium }]);

            alert('Wallpaper uploaded successfully!');
            setImage(null);
            setTitle('');
            setPrice('');
            setIsPremium(false);
        } catch (error) {
            console.error('Error uploading wallpaper:', error);
            alert('Failed to upload wallpaper.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id, imageURL) => {
        if (window.confirm("Are you sure you want to delete this wallpaper?")) {
            try {
                // Delete Firestore document
                await deleteDoc(doc(firestore, 'wallpaperOfTheDay', id));

                // Extracting the correct path from the URL
                const storagePath = imageURL.split('?')[0].split('/o/')[1];
                const imageRef = ref(storage, decodeURIComponent(storagePath));
                await deleteObject(imageRef);

                // Update local state
                setWallpapers(wallpapers.filter(wallpaper => wallpaper.id !== id));

                alert('Wallpaper deleted successfully!');
            } catch (error) {
                console.error('Error deleting wallpaper:', error.message);
                alert('Failed to delete wallpaper.');
            }
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Wallpaper of the Day</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={uploading}
                className="title-input"
            />
            <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={uploading}
                className="price-input"
            />
            <input
                type="file"
                onChange={handleImageChange}
                disabled={uploading}
                className="file-input"
            />
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={isPremium}
                        onChange={(e) => setIsPremium(e.target.checked)}
                        disabled={uploading}
                    />
                    Premium Wallpaper
                </label>
            </div>
            <button onClick={handleUpload} disabled={uploading} className="upload-button">
                {uploading ? 'Uploading...' : 'Upload'}
            </button>

            <h3>Uploaded Wallpapers</h3>
            <div className="wallpaper-grid">
                {wallpapers.map((wallpaper) => (
                    <div key={wallpaper.id} className="wallpaper-item">
                        <h4>{wallpaper.title}</h4>
                        <img src={wallpaper.imageURL} alt={wallpaper.title} className="wallpaper-image" />
                        <p>Price: ${wallpaper.price}</p>
                        <p>{wallpaper.isPremium ? 'Premium' : 'Free'}</p>
                        <button
                            onClick={() => handleDelete(wallpaper.id, wallpaper.imageURL)}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WallpaperOfTheDay;
