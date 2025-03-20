
import React, { useEffect, useState } from "react";
import { fetchGoals } from "../api/api";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("user")); // ✅ Get logged-in user

  useEffect(() => {
    const loadGoals = async () => {
      if (!loggedInUser) {
        setError("No logged-in user found.");
        setLoading(false);
        return;
      }

      try {
        const userGoals = await fetchGoals(loggedInUser.id, loggedInUser.token);
        setGoals(userGoals);
      } catch (error) {
        console.error("🔴 Error fetching goals:", error);
        setError("Failed to load goals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, []);

  return (
    <div>
      <h2>Your Goals</h2>

      {loading ? (
        <p>Loading goals...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : goals.length === 0 ? (
        <p>No goals found.</p>
      ) : (
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              {goal.target} 
              {/* ✅ Removed `goal.deadline` since it's not in your backend */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Goals;
