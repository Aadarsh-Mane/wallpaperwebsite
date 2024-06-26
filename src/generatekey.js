import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
const firestore = getFirestore();

export const getWallpapersForTeamA = async (teamA) => {
    try {
      // Reference to the uploads collection
      const uploadsRef = collection(firestore, 'uploads');
  
      // Query for documents where teamA matches the selected teamA
      const q = query(uploadsRef, where('teamA', '==', teamA));
      
      // Execute the query
      const querySnapshot = await getDocs(q);
  
      // Map query results to an array of wallpaper data
      const wallpapers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      return wallpapers;
    } catch (error) {
      console.error('Error retrieving wallpapers:', error);
      throw error;
    }
  };