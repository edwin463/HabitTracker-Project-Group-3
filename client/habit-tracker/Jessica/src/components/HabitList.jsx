import React, { useEffect, useState } from "react";
import { fetchHabits, deleteHabit } from "../api/api";
import GoalForm from "./GoalForm"; // ✅ Import GoalForm

const HabitList = ({ refreshTrigger }) => {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null); // ✅ Track selected habit for goal form
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      console.error("🔴 No token found. Please log in.");
      return;
    }

    const loadHabits = async () => {
      try {
        const userHabits = await fetchHabits(token);
        setHabits(userHabits);
      } catch (error) {
        console.error("🔴 Error fetching habits:", error);
      }
    };

    loadHabits();
  }, [refreshTrigger]);

  // ✅ Handle Habit Deletion
  const handleDelete = async (habitId) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;
    try {
      await deleteHabit(habitId, token);
      setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
    } catch (error) {
      console.error("🔴 Error deleting habit:", error);
    }
  };

  // ✅ Handle "Create Goal" button click
  const openGoalForm = (habit) => {
    setSelectedHabit(habit); // ✅ Open form for this habit
  };

  // ✅ Close GoalForm after adding a goal
  const closeGoalForm = () => {
    setSelectedHabit(null);
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
              <button onClick={() => openGoalForm(habit)}>🎯 Create Goal</button>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ Show only one GoalForm at a time */}
      {selectedHabit && <GoalForm habit={selectedHabit} onGoalAdded={closeGoalForm} />}
    </div>
  );
};

export default HabitList;
