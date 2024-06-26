import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

// Fetch wallpapers for a specific match
export const fetchWallpaperByMatch = async (match) => {
  const firestore = getFirestore();
  try {
    const q = query(
      collection(firestore, 'wallpapers'),
      where('teamA', '==', match.teamA),
      where('teamB', '==', match.teamB),
      where('day', '==', match.day)
    );

    const querySnapshot = await getDocs(q);
    const wallpapers = [];
    querySnapshot.forEach((doc) => {
      wallpapers.push(doc.data());
    });

    return wallpapers;
  } catch (error) {
    console.error('Error fetching wallpaper:', error);
    throw error;
  }
};