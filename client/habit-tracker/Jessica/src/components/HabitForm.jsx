import React, { useState } from "react";
import { addHabit } from "../api/api";
import GoalForm from "./GoalForm"; // ✅ Import GoalForm

const HabitForm = ({ onHabitAdded }) => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [newHabit, setNewHabit] = useState(null); // ✅ Track newly added habit
  const token = localStorage.getItem("access_token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to add a habit.");
      return;
    }

    const newHabitData = { name, frequency };

    try {
      const habit = await addHabit(newHabitData, token);
      setNewHabit(habit); // ✅ Store new habit to pass to GoalForm
      setName("");
      setFrequency("");
      if (onHabitAdded) onHabitAdded();
    } catch (error) {
      console.error("🔴 Error adding habit:", error);
    }
  };

  return (
    <div>
      <h2>Add a New Habit</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        <label>Frequency:</label>
        <select 
          value={frequency} 
          onChange={(e) => setFrequency(e.target.value)} 
          required
        >
          <option value="">Select frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>

        <button type="submit">Add Habit</button>
      </form>

      {/* ✅ Show GoalForm immediately after adding a habit */}
      {newHabit && <GoalForm habit={newHabit} onGoalAdded={() => setNewHabit(null)} />}
    </div>
  );
};

export default HabitForm;
