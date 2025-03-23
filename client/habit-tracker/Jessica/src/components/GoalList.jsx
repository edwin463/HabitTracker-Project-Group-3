import React, { useEffect, useState } from "react";
import { fetchGoals } from "../api/api";

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const loadGoals = async () => {
      if (!token) {
        console.error("🔴 No token found. Please log in.");
        return;
      }

      try {
        const userGoals = await fetchGoals(token); // ✅ Fetch goals with token
        setGoals(userGoals);
      } catch (error) {
        console.error("🔴 Error fetching goals:", error);
      }
    };

    loadGoals();
  }, []);

  return (
    <div>
      <h2>Your Goals</h2>
      {goals.length === 0 ? (
        <p>No goals found.</p>
      ) : (
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              <strong>Habit:</strong> {goal.habit_name} <br />
              <strong>Description:</strong> {goal.description} <br />
              <strong>Target Days:</strong> {goal.target_days} <br />
              <strong>Target Date:</strong> {goal.target_date} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoalList;
