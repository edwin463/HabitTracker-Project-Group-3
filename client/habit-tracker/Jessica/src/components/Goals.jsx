import React, { useEffect, useState } from "react";
import { fetchGoals } from "../api/api";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("user")); // ✅ Get logged-in user
  const token = localStorage.getItem("access_token"); // ✅ Get JWT token

  useEffect(() => {
    const loadGoals = async () => {
      if (!loggedInUser || !token) {
        setError("No logged-in user or token found.");
        setLoading(false);
        return;
      }

      try {
        const userGoals = await fetchGoals(token); // ✅ Send token for authentication
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
              {goal.description} - Target Date: {goal.target_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Goals;
