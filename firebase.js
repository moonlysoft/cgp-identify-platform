import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCGHEvEGt5ovd0-yqEeU_bce0Gp4UF5zvQ",
  authDomain: "identity-platform-385807.firebaseapp.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
