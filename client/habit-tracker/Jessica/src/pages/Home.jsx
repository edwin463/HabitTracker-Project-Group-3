import React from "react"; // Required for functional components
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Habit Tracker</h1>
        <p className="text-lg text-gray-600 mb-6">
          Track and improve your daily habits with ease.
        </p>
        <Link to="/register">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
