
import React, { useEffect, useState } from "react";
import { fetchHabits, deleteHabit } from "../api/api"; // ✅ Import API functions

function HabitList({ refreshTrigger }) {
  const [habits, setHabits] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // ✅ Get logged-in user

  useEffect(() => {
    if (user) {
      loadHabits();
    }
  }, [refreshTrigger]); // ✅ Re-fetch whenever refreshTrigger changes

  const loadHabits = async () => {
    try {
      const userHabits = await fetchHabits(user.id);
      setHabits(userHabits); // ✅ Ensure habits are replaced, not duplicated
    } catch (error) {
      console.error("🔴 Error fetching habits:", error);
    }
  };

  // ✅ Function to delete a habit
  const handleDelete = async (habitId) => {
    try {
      await deleteHabit(habitId);
      setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== habitId)); // ✅ Update state
    } catch (error) {
      console.error("🔴 Error deleting habit:", error);
    }
  };

  return (
    <div>
      <h2>Your Habits</h2>
      {habits.length === 0 ? (
        <p>No habits found.</p>
      ) : (
        <ul>
          {habits.map((habit) => (
            <li key={habit.id}>
              {habit.name} - {habit.frequency}
              <button onClick={() => handleDelete(habit.id)}>❌ Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HabitList;
