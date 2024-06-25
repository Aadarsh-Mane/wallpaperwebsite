import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore=getFirestore(app)
const analytics = getAnalytics(app);