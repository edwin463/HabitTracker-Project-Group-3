import React from "react";
import { useState } from "react";
import { registerUser } from "../api/api"; // Import API call
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ Redirect after successful registration

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { username, email, password };
      const response = await registerUser(userData); // ✅ API call
      console.log("🟢 Registration Successful:", response);

      // ✅ Redirect to Login after successful registration
      navigate("/login");
    } catch (error) {
      console.error("🔴 Registration Error:", error.message);
      setError("Failed to register. Try a different email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="w-72">
          <label className="block text-left font-semibold">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full mb-2"
            required
          />

          <label className="block text-left font-semibold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full mb-2"
            required
          />

          <label className="block text-left font-semibold">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-2"
            required
          />

          <button type="submit" className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
