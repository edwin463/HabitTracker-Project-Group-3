const API_BASE_URL = "http://127.0.0.1:5000"; // Ensure correct backend URL

// Register User
export async function registerUser(userData) {
  try {
    console.log("🔵 API Call: Registering user...", userData);
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error("Registration failed");

    const data = await response.json();
    console.log("🟢 API Response:", data);
    return data;
  } catch (error) {
    console.error("🔴 Registration Error:", error.message);
    throw error;
  }
}

// Login User
export async function loginUser(userData) {
  try {
    console.log("🔵 API Call: Logging in user...", userData);
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    console.log("🟢 API Response:", data);
    return data;
  } catch (error) {
    console.error("🔴 Login Error:", error.message);
    throw error;
  }
}

// Fetch All Users
export async function fetchUsers() {
  try {
    console.log("🔵 API Call: Fetching users...");
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");

    return await response.json();
  } catch (error) {
    console.error("🔴 Fetch Users Error:", error.message);
    throw error;
  }
}

// Fetch Single User
export async function fetchUser(userId) {
  try {
    console.log("🔵 API Call: Fetching user...");
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) throw new Error("User not found");

    return await response.json();
  } catch (error) {
    console.error("🔴 Fetch User Error:", error.message);
    throw error;
  }
}

// Delete User
export async function deleteUser(userId) {
  try {
    console.log("🔵 API Call: Deleting user...");
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete user");
    console.log("🟢 User deleted");
  } catch (error) {
    console.error("🔴 Delete User Error:", error.message);
    throw error;
  }
}

// Fetch All Habits
export async function fetchHabits() {
  try {
    console.log("🔵 API Call: Fetching habits...");
    const response = await fetch(`${API_BASE_URL}/habits`);
    if (!response.ok) throw new Error("Failed to fetch habits");

    return await response.json();
  } catch (error) {
    console.error("🔴 Fetch Habits Error:", error.message);
    throw error;
  }
}

// Fetch Single Habit
export async function fetchHabit(habitId) {
  try {
    console.log("🔵 API Call: Fetching habit...");
    const response = await fetch(`${API_BASE_URL}/habits/${habitId}`);
    if (!response.ok) throw new Error("Habit not found");

    return await response.json();
  } catch (error) {
    console.error("🔴 Fetch Habit Error:", error.message);
    throw error;
  }
}

// Add a Habit
export async function addHabit(habitData) {
  try {
    console.log("🔵 API Call: Adding habit...", habitData);
    const response = await fetch(`${API_BASE_URL}/habits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habitData),
    });

    if (!response.ok) throw new Error("Failed to add habit");
    return await response.json();
  } catch (error) {
    console.error("🔴 Add Habit Error:", error.message);
    throw error;
  }
}

// Update a Habit
export async function updateHabit(habitId, updatedData) {
  try {
    console.log("🔵 API Call: Updating habit...");
    const response = await fetch(`${API_BASE_URL}/habits/${habitId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error("Failed to update habit");
    return await response.json();
  } catch (error) {
    console.error("🔴 Update Habit Error:", error.message);
    throw error;
  }
}

// Delete a Habit
export async function deleteHabit(habitId) {
  try {
    console.log("🔵 API Call: Deleting habit...");
    const response = await fetch(`${API_BASE_URL}/habits/${habitId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete habit");
    console.log("🟢 Habit deleted");
  } catch (error) {
    console.error("🔴 Delete Habit Error:", error.message);
    throw error;
  }
}

// Fetch Habit Logs
export async function fetchHabitLogs(habitId) {
  try {
    console.log("🔵 API Call: Fetching habit logs...");
    const response = await fetch(`${API_BASE_URL}/habit_logs?habit_id=${habitId}`);
    if (!response.ok) throw new Error("Failed to fetch habit logs");

    return await response.json();
  } catch (error) {
    console.error("🔴 Fetch Habit Logs Error:", error.message);
    throw error;
  }
}

// Add Habit Log
export async function addHabitLog(logData) {
  try {
    console.log("🔵 API Call: Adding habit log...", logData);
    const response = await fetch(`${API_BASE_URL}/habit_logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logData),
    });

    if (!response.ok) throw new Error("Failed to add habit log");
    return await response.json();
  } catch (error) {
    console.error("🔴 Add Habit Log Error:", error.message);
    throw error;
  }
}

// Fetch Goals
export async function fetchGoals(habitId) {
  try {
    console.log("🔵 API Call: Fetching goals...");
    const response = await fetch(`${API_BASE_URL}/goals?habit_id=${habitId}`);
    if (!response.ok) throw new Error("Failed to fetch goals");

    return await response.json();
  } catch (error) {
    console.error("🔴 Fetch Goals Error:", error.message);
    throw error;
  }
}

// Fetch Single Goal
export async function fetchGoal(goalId) {
  try {
    console.log("🔵 API Call: Fetching goal...");
    const response = await fetch(`${API_BASE_URL}/goals/${goalId}`);
    if (!response.ok) throw new Error("Goal not found");

    return await response.json();
  } catch (error) {
    console.error("🔴 Fetch Goal Error:", error.message);
    throw error;
  }
}

// Delete Goal
export async function deleteGoal(goalId) {
  try {
    console.log("🔵 API Call: Deleting goal...");
    const response = await fetch(`${API_BASE_URL}/goals/${goalId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete goal");
    console.log("🟢 Goal deleted");
  } catch (error) {
    console.error("🔴 Delete Goal Error:", error.message);
    throw error;
  }
}

// Fetch Relationships
export async function fetchRelationships(userId) {
  try {
    console.log("🔵 API Call: Fetching relationships...");
    const response = await fetch(`${API_BASE_URL}/relationships?user_id=${userId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch relationships");
    }

    const data = await response.json();
    console.log("🟢 API Response:", data);
    return data;
  } catch (error) {
    console.error("🔴 Fetch Relationships Error:", error.message);
    throw error;
  }
}
