import React, { useEffect, useState } from "react";
import { fetchUser } from "../api/api";

const UsersList = () => {
  const [user, setUser] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("user")); // ✅ Get logged-in user

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (loggedInUser) {
          const userData = await fetchUser(loggedInUser.id); // ✅ Fetch user data with JWT
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <div>
      <h2>Your Profile</h2>
      {user ? (
        <p><strong>Username:</strong> {user.username} <br />
           <strong>Email:</strong> {user.email}
        </p>
      ) : (
        <p>No user found. Please log in.</p>
      )}
    </div>
  );
};

export default UsersList;
