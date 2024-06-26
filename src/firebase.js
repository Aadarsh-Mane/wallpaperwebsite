import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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


export const uploadWallpaper = async (file, match) => {
  try {
    // Create a storage reference
    const storageRef = ref(storage, `wallpapers/${match.teamA}_vs_${match.teamB}_${match.day.replace(/ /g, '_')}.jpg`);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Save the download URL and match details to Firestore
    await addDoc(collection(firestore, 'wallpapers'), {
      teamA: match.teamA,
      teamB: match.teamB,
      scoreA: match.scoreA,
      scoreB: match.scoreB,
      time: match.time,
      matchOver: match.matchOver,
      month: match.month,
      day: match.day,
      imageURL: downloadURL
    });

    console.log("Wallpaper uploaded and match details saved!");
  } catch (error) {
    console.error("Error uploading wallpaper: ", error);
  }
};
export default uploadWallpaper