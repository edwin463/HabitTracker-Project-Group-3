import React from "react"; // ✅ Required for functional components
import { useEffect, useState } from "react";
import { fetchHabitLogs } from "../api/api";

const HabitLogs = () => {
  const [habitLogs, setHabitLogs] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user")); // ✅ Get logged-in user

  useEffect(() => {
    const loadHabitLogs = async () => {
      try {
        if (loggedInUser) {
          const allLogs = await fetchHabitLogs(loggedInUser.id);
          
          setHabitLogs(allLogs);
        }
      } catch (error) {
        console.error("Error fetching habit logs:", error);
      }
    };

    loadHabitLogs();
  }, []);

  return (
    <div>
      <h2>Your Habit Logs</h2>
      {habitLogs.length === 0 ? (
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
