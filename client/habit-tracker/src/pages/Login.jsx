import React from "react";
import { useState } from "react";
import { loginUser } from "../api/api"; // Import API call
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ Use navigation after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { email, password };
      const response = await loginUser(userData); // ✅ API call
      console.log("🟢 Login Successful:", response);

      // ✅ Redirect to Dashboard on successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("🔴 Login Error:", error.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="w-72">
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

          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
