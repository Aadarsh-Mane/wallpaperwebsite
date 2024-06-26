import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOWprmEMMEKiKbM4Sa8LlBMHF9nryMyqg",
  authDomain: "wallpaper-9dd6b.firebaseapp.com",
  projectId: "wallpaper-9dd6b",
  storageBucket: "wallpaper-9dd6b.appspot.com",
  messagingSenderId: "401242592429",
  appId: "1:401242592429:web:02f759656921b0e6b26224",
  measurementId: "G-5K9CQ52X6L"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);




 const uploadWallpaper = async (file, match, title) => {
  try {
    // Generate a unique identifier for the file
    const uniqueId = uuidv4(); // Generate a UUID

    // Create a storage reference with a unique identifier
    const storageRef = ref(storage, `wallpapers/${match.teamA}_vs_${match.teamB}_${match.day.replace(/ /g, '_')}_${uniqueId}.jpg`);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Save the download URL, match details, and title to Firestore
    await addDoc(collection(firestore, 'wallpapers'), {
      teamA: match.teamA,
      teamB: match.teamB,
      scoreA: match.scoreA,
      scoreB: match.scoreB,
      time: match.time,
      matchOver: match.matchOver,
      month: match.month,
      day: match.day,
      imageURL: downloadURL,
      title: title // Save the title
    });

    console.log("Wallpaper uploaded and match details saved!");
  } catch (error) {
    console.error("Error uploading wallpaper: ", error);
  }
};


//  const deleteWallpaper = async (docId, imageURL) => {
//   try {
//       // Step 1: Delete document from Firestore
//       await deleteDoc(doc(firestore, 'wallpapers', docId));

//       // Step 2: Optionally delete image from storage if imageURL exists
//       if (imageURL) {
//           const imageRef = ref(storage, imageURL);
//           await deleteObject(imageRef);
//       }
//       console.log('Deleting wallpaper:', docId, imageURL);

//       console.log("Wallpaper deleted successfully!");
//   } catch (error) {
//       console.error("Error deleting wallpaper:", error);
//       throw error; // Optionally handle error as per your application's error handling strategy
//   }
// };
const deleteWallpaper = async (docId) => {
  try {
    await deleteDoc(doc(firestore, 'wallpapers', docId));
    console.log('Wallpaper deleted successfully');
  } catch (error) {
    console.error('Error deleting wallpaper:', error.message);
    throw error; // Propagate the error for further handling
  }
};

// Function to get document ID by imageURL
 const getDocIdByImageURL = async (imageURL) => {
  try {
    const wallpapersRef = collection(firestore, 'wallpapers');
    const q = query(wallpapersRef, where('imageURL', '==', imageURL));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].id; // Return the first document ID found
    } else {
      console.log('No document found with the specified imageURL:', imageURL);
      return null;
    }
  } catch (error) {
    console.error('Error fetching document ID:', error.message);
    throw error; // Propagate the error for further handling
  }
};

export { deleteWallpaper,uploadWallpaper, getDocIdByImageURL,};