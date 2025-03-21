const API_BASE_URL = "http://127.0.0.1:5000"; // Ensure correct backend URL

// ✅ Helper function to get JWT token from localStorage
function getAuthHeaders() {
  const token = localStorage.getItem("access_token");
  return token ? { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } : {};
}

// ✅ Register User (No JWT needed)
export async function registerUser(userData) {
  try {
    console.log("🔵 API Call: Registering user...", userData);
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error("Registration failed");

    return await response.json();
  } catch (error) {
    console.error("🔴 Registration Error:", error.message);
    throw error;
  }
}

// ✅ Login User (Ensure token is stored properly)
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
    console.log("🟢 Login Successful:", data);

    // ✅ Store user details and token properly
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error("🔴 Login Error:", error.message);
    throw error;
  }
}


// ✅ Fetch Single User (Requires JWT)
export async function fetchUser(userId) {
  try {
    console.log("🔵 API Call: Fetching user...");
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("User not found");

    return await response.json();
  } catch (error) {
    console.error("🔴 Fetch User Error:", error.message);
    throw error;
  }
}

// ✅ Fetch Habits (Requires JWT)
export async function fetchHabits(token) {
  try {
    console.log("🔵 API Call: Fetching habits...");
    const response = await fetch(`${API_BASE_URL}/habits`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ Send JWT token
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) throw new Error("Failed to fetch habits");

    return await response.json();
  } catch (error) {
    console.error("🔴 Fetch Habits Error:", error.message);
    throw error;
  }
}


// ✅ Add a Habit (Requires JWT)
export async function addHabit(habitData, token) {
  try {
    console.log("🔵 API Call: Adding habit...", habitData);
    const response = await fetch(`${API_BASE_URL}/habits`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ Send JWT token
        "Content-Type": "application/json"
      },
      body: JSON.stringify(habitData),
    });

    if (!response.ok) throw new Error("Failed to add habit");

    return await response.json();
  } catch (error) {
    console.error("🔴 Add Habit Error:", error.message);
    throw error;
  }
}


// ✅ Delete a Habit (Requires JWT)
export async function deleteHabit(habitId, token) {
  try {
    console.log("🔵 API Call: Deleting habit...");
    const response = await fetch(`${API_BASE_URL}/habits/${habitId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ Send JWT token
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) throw new Error("Failed to delete habit");
    console.log("🟢 Habit deleted");
  } catch (error) {
    console.error("🔴 Delete Habit Error:", error.message);
    throw error;
  }
}


// ✅ Fetch Goals (Requires JWT)
export async function fetchGoals(token) {
  try {
    console.log("🔵 API Call: Fetching goals...");
    const response = await fetch(`${API_BASE_URL}/goals`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ Send JWT token
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) throw new Error("Failed to fetch goals");

    return await response.json();
  } catch (error) {
    console.error("🔴 Fetch Goals Error:", error.message);
    throw error;
  }
}


// ✅ Add a Goal (Requires JWT)
export async function addGoal(goalData, token) {
  try {
    console.log("🔵 API Call: Adding goal...", goalData);
    const response = await fetch(`${API_BASE_URL}/goals`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ Send JWT token
        "Content-Type": "application/json"
      },
      body: JSON.stringify(goalData),
    });

    if (!response.ok) throw new Error("Failed to add goal");

    return await response.json();
  } catch (error) {
    console.error("🔴 Add Goal Error:", error.message);
    throw error;
  }
}


// ✅ Delete a Goal (Requires JWT)
export async function deleteGoal(goalId) {
  try {
    console.log("🔵 API Call: Deleting goal...");
    const response = await fetch(`${API_BASE_URL}/goals/${goalId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Failed to delete goal");
    console.log("🟢 Goal deleted");
  } catch (error) {
    console.error("🔴 Delete Goal Error:", error.message);
    throw error;
  }
}

// ✅ Fetch Relationships (Requires JWT)
export async function fetchRelationships() {
  try {
    console.log("🔵 API Call: Fetching relationships...");
    const response = await fetch(`${API_BASE_URL}/relationships`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch relationships");

    return await response.json();
  } catch (error) {
    console.error("🔴 Fetch Relationships Error:", error.message);
    throw error;
  }
}

// ✅ Fetch Habit Logs (Requires JWT)
export async function fetchHabitLogs(token) {
  try {
    console.log("🔵 API Call: Fetching habit logs...");
    const response = await fetch(`${API_BASE_URL}/habit_logs`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ Send JWT token
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) throw new Error("Failed to fetch habit logs");

    return await response.json();
  } catch (error) {
    console.error("🔴 Fetch Habit Logs Error:", error.message);
    throw error;
  }
}
