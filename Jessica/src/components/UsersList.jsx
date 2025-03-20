import React from "react";
import { useEffect, useState } from "react";
import { fetchUser } from "../api/api";

const UsersList = () => {
  const [user, setUser] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("user")); // ✅ Get logged-in user

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (loggedInUser) {
          const userData = await fetchUser(loggedInUser.id);
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
        <p>{user.username} - {user.email}</p>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
};

export default UsersList;

