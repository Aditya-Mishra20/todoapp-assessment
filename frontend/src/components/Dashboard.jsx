import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { testProtectedRoute } from "../api/testapi";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
  try {
    await auth.signOut(); // Firebase logout
    console.log("Logged out successfully");
    setUserData(null);    // clear local state
  } catch (err) {
    console.error("Logout failed:", err);
  }
};


  useEffect(() => {
    const fetchBackend = async () => {
      try {
        // wait for Firebase user to be ready
        const user = auth.currentUser;
        if (!user) {
          console.log("User not logged in yet");
          setLoading(false);
          return;
        }

        const data = await testProtectedRoute();
        // console.log("Backend response:", data);
        setUserData(data.user);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBackend();
  }, []); // empty array = run once

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      {userData && <p>Welcome, {userData.email}</p>}
      <button onClick={handleLogout}>Logout</button>
      <p>Boards and todos will appear here...</p>
    </div>
  );
};

export default Dashboard;
