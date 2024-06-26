import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { firestore, storage } from "../services/firebase";
import '../styles/WallpaperDay.css'
const WallpaperOfTheDay = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [uploading, setUploading] = useState(false);
    const [wallpapers, setWallpapers] = useState([]);

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
        if (!image || !title) {
            alert('Please select an image and provide a title.');
            return;
        }

        setUploading(true);

        const storageRef = ref(storage, `wallpapers/${image.name}`);
        try {
            await uploadBytes(storageRef, image);
            const imageURL = await getDownloadURL(storageRef);

            const docRef = await addDoc(collection(firestore, 'wallpaperOfTheDay'), {
                title,
                imageURL,
                createdAt: new Date(),
            });

            setWallpapers([...wallpapers, { id: docRef.id, title, imageURL }]);

            alert('Wallpaper uploaded successfully!');
            setImage(null);
            setTitle('');
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
                await deleteDoc(doc(firestore, 'wallpaperOfTheDay', id));

                const imageRef = ref(storage, `wallpapers/${imageURL.split('/').pop()}`);
                await deleteObject(imageRef);

                setWallpapers(wallpapers.filter(wallpaper => wallpaper.id !== id));

                alert('Wallpaper deleted successfully!');
            } catch (error) {
                console.error('Error deleting wallpaper:', error);
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
                type="file"
                onChange={handleImageChange}
                disabled={uploading}
                className="file-input"
            />
            <button onClick={handleUpload} disabled={uploading} className="upload-button">
                {uploading ? 'Uploading...' : 'Upload'}
            </button>

            <h3>Uploaded Wallpapers</h3>
            <div className="wallpaper-grid">
                {wallpapers.map((wallpaper) => (
                    <div key={wallpaper.id} className="wallpaper-item">
                        <h4>{wallpaper.title}</h4>
                        <img src={wallpaper.imageURL} alt={wallpaper.title} className="wallpaper-image" />
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