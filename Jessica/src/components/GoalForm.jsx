import React, { useState, useEffect } from "react";
import { addGoal, fetchHabits } from "../api/api";

const GoalForm = ({ onGoalAdded }) => {
  const [habitId, setHabitId] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [description, setDescription] = useState("");
  const [targetDays, setTargetDays] = useState(""); // ✅ Fix: Ensure it's defined
  const [habits, setHabits] = useState([]);

  // ✅ Load Habits when Component Mounts
  useEffect(() => {
    const loadHabits = async () => {
      try {
        const userHabits = await fetchHabits();
        console.log("🟢 Habits Loaded:", userHabits); // ✅ Debugging Log
        setHabits(userHabits);
      } catch (error) {
        console.error("🔴 Error fetching habits:", error);
        alert("Failed to load habits. Please try again.");
      }
    };

    loadHabits();
  }, []);

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🟢 Button Clicked: Adding Goal...");

    // ✅ Validate Input Fields
    if (!habitId || !targetDate || !description || !targetDays) {
      console.error("🔴 ERROR: All fields are required");
      alert("All fields are required.");
      return;
    }

    const goalData = {
      habit_id: parseInt(habitId), // Ensure it's a number
      target_date: targetDate,
      description: description.trim(),
      target_days: parseInt(targetDays), // Ensure it's a number
    };

    console.log("🔵 Sending Data to API:", goalData);

    try {
      const response = await addGoal(goalData);
      console.log("🟢 Goal Added Successfully!", response);

      alert("Goal added successfully!");
      // ✅ Reset Form Fields
      setHabitId("");
      setTargetDate("");
      setDescription("");
      setTargetDays("");
      if (onGoalAdded) onGoalAdded(); // ✅ Refresh Goal List if needed
    } catch (error) {
      console.error("🔴 Error adding goal:", error);
      alert("Failed to add goal.");
    }
  };

  return (
    <div>
      <h2>Add a New Goal</h2>
      <form onSubmit={handleSubmit}>
        {/* ✅ Habit Selection */}
        <label>Habit:</label>
        <select
          value={habitId}
          onChange={(e) => {
            console.log("🟢 Selected Habit ID:", e.target.value); // ✅ Debugging Log
            setHabitId(e.target.value);
          }}
          required
        >
          <option value="">-- Select a Habit --</option>
          {habits.length > 0 ? (
            habits.map((habit) => (
              <option key={habit.id} value={habit.id}>
                {habit.name}
              </option>
            ))
          ) : (
            <option disabled>No habits available</option>
          )}
        </select>

        {/* ✅ Target Date */}
        <label>Target Date:</label>
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          required
        />

        {/* ✅ Description */}
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* ✅ Target Days */}
        <label>Target Days:</label>
        <input
          type="number"
          value={targetDays}
          onChange={(e) => setTargetDays(e.target.value)}
          required
        />

        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
};

export default GoalForm;
