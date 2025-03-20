import React, { useEffect, useState } from "react";
import { fetchGoals } from "../api/api";

const GoalList = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGoals = async () => {
            try {
                const goalsData = await fetchGoals();
                console.log("Fetched Goals:", goalsData);  // ✅ Debugging
                setGoals(goalsData);
            } catch (error) {
                console.error("Error fetching goals:", error);
            } finally {
                setLoading(false);
            }
        };
        loadGoals();
    }, []);

    return (
        <div>
            <h2>Your Goals</h2>
            {loading ? (
                <p>Loading goals...</p>
            ) : goals.length === 0 ? (
                <p>No goals set yet.</p>
            ) : (
                <ul>
                    {goals.map((goal) => (
                        <li key={goal.id}>
                            <strong>Habit ID:</strong> {goal.habit_id} <br />
                            <strong>Description:</strong> {goal.description} <br />
                            <strong>Target Days:</strong> {goal.target_days} <br />
                            <strong>Target Date:</strong> {goal.target_date}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GoalList;
