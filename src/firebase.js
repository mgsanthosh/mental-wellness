import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDpquwFTjGNs5YdkHImbHRJIWbQOJky8dA",
    authDomain: "nurturing-mental-health.firebaseapp.com",
    projectId: "nurturing-mental-health",
    storageBucket: "nurturing-mental-health.appspot.com",
    messagingSenderId: "374804404901",
    appId: "1:374804404901:web:2ea51e5a9f66ee50518b4c",
    measurementId: "G-QBR2NS1Y16"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
