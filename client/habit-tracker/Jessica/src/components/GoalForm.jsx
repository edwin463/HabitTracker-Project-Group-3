import React, { useState } from "react";
import { addGoal } from "../api/api";

const GoalForm = ({ habit, onGoalAdded }) => {
  const [targetDate, setTargetDate] = useState("");
  const [description, setDescription] = useState("");
  const [targetDays, setTargetDays] = useState("");
  const token = localStorage.getItem("access_token");

  if (!habit) return null; // ✅ Don't render if no habit is selected

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to create a goal.");
      return;
    }

    if (!targetDate || !description || !targetDays) {
      alert("All fields are required.");
      return;
    }

    const goalData = {
      habit_id: habit.id, // ✅ Automatically assign habit ID
      target_date: targetDate,
      description: description.trim(),
      target_days: parseInt(targetDays),
    };

    try {
      await addGoal(goalData, token);
      alert(`Goal added for "${habit.name}" successfully!`);
      setTargetDate("");
      setDescription("");
      setTargetDays("");
      onGoalAdded(); // ✅ Close form after adding goal
    } catch (error) {
      console.error("🔴 Error adding goal:", error);
    }
  };

  return (
    <div className="goal-form">
      <h2>Add a Goal for "{habit.name}"</h2>
      <form onSubmit={handleSubmit}>
        <label>Target Date:</label>
        <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} required />

        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Target Days:</label>
        <input type="number" value={targetDays} onChange={(e) => setTargetDays(e.target.value)} required />

        <button type="submit">Add Goal</button>
        <button type="button" onClick={onGoalAdded}>Cancel</button>
      </form>
    </div>
  );
};

export default GoalForm;
