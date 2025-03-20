
import React, { useState } from "react";
import { addHabit } from "../api/api";

const HabitForm = ({ onHabitAdded }) => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("user")); // ✅ Get logged-in user

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      alert("You must be logged in to add a habit.");
      return;
    }

    const newHabit = {
      name,
      frequency,
      user_id: loggedInUser.id,
    };

    try {
      await addHabit(newHabit);
      setName("");
      setFrequency("");
      onHabitAdded(); // ✅ Trigger refresh in Dashboard.jsx
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
    </div>
  );
};

export default HabitForm;
