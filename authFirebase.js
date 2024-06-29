import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function register(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado: ", userCredential.user);
    } catch (error) {
        console.error("Error al registrar usuario: ", error);
    }
}

async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario logueado: ", userCredential.user);
    } catch (error) {
        console.error("Error al loguear usuario: ", error);
    }
}

async function logout() {
    try {
        await signOut(auth);
        console.log("Usuario deslogueado");
    } catch (error) {
        console.error("Error al desloguear usuario: ", error);
    }
}

register("test@example.com", "password123");
login("test@example.com", "password123");
logout();
