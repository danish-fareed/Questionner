import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const useFirebase = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyACK5ShG7H_GOu3-IfLi3gNa7p73tL6SQw",
      authDomain: "questionner-795c5.firebaseapp.com",
      projectId: "questionner-795c5",
      storageBucket: "questionner-795c5.appspot.com",
      messagingSenderId: "308137162545",
      appId: "1:308137162545:web:61b1d428ed5b926b776210",
      measurementId: "G-4LPRXNE8YB"
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
