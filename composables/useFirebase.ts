import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const useFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyA-zFOEYNNXV9InRIeRaBVXOm7kPiAmql4",
        authDomain: "questionner-9015b.firebaseapp.com",
        projectId: "questionner-9015b",
        storageBucket: "questionner-9015b.appspot.com",
        messagingSenderId: "389546612732",
        appId: "1:389546612732:web:b264a50efa7b07d61bc479"
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const firestore = getFirestore(firebaseApp);
    const auth = getAuth(firebaseApp);

    return {
        firebaseApp,
        firestore,
        auth
    }
}