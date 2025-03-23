import React, { useEffect, useState } from "react";
import { fetchHabitLogs } from "../api/api";

const HabitLogs = () => {
  const [habitLogs, setHabitLogs] = useState([]);
  const [error, setError] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("user")); // ✅ Get logged-in user
  const token = localStorage.getItem("access_token"); // ✅ Get JWT token

  useEffect(() => {
    const loadHabitLogs = async () => {
      if (!loggedInUser || !token) {
        setError("You must be logged in to view habit logs.");
        return;
      }

      try {
        const allLogs = await fetchHabitLogs(token); // ✅ Send token for authentication
        setHabitLogs(allLogs);
      } catch (error) {
        console.error("🔴 Error fetching habit logs:", error);
        setError("Failed to load habit logs. Please try again.");
      }
    };

    loadHabitLogs();
  }, []);

  return (
    <div>
      <h2>Your Habit Logs</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : habitLogs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <ul>
          {habitLogs.map((log) => (
            <li key={log.id}>
              {log.date} - {log.status ? "Completed" : "Missed"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitLogs;
