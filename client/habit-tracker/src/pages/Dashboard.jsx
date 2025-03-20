import React from "react";
import { useState } from "react";
import HabitList from "../components/HabitList";
import HabitForm from "../components/HabitForm"; // Corrected import

const Dashboard = () => {
  const [userId] = useState(1); // Replace with actual logged-in user ID
  const [update, setUpdate] = useState(false);

  const refreshHabits = () => {
    setUpdate(!update); // Triggers HabitList to refresh
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* ✅ HabitForm allows adding new habits */}
      <HabitForm userId={userId} onHabitAdded={refreshHabits} />

      {/* ✅ HabitList displays user habits */}
      <HabitList userId={userId} key={update} />
    </div>
  );
};

export default Dashboard;
