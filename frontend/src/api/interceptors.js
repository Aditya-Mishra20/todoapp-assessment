import api from "./axios";
import { auth } from "../firebase/firebase";

api.interceptors.request.use(
  async (config) => {
    // wait for Firebase to finish initializing
    const user = auth.currentUser;

    if (user) {
      try {
        const token = await user.getIdToken(true);
        config.headers.Authorization = `Bearer ${token}`;
      } catch (err) {
        console.error("Failed to get Firebase token:", err);
        // optionally throw error to prevent API call
      }
    } else {
      console.warn("No user logged in yet. Request may fail.");
    }

    return config;
  },
  (error) => Promise.reject(error)
);
