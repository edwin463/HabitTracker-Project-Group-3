import React from "react"; // ✅ Required for functional components
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-200">
            Habit Tracker
          </Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/dashboard" className="hover:text-gray-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users" className="hover:text-gray-200">
              Users
            </Link>
          </li>
          <li>
            <Link to="/habits" className="hover:text-gray-200">
              Habits
            </Link>
          </li>
          <li>
            <Link to="/habit-logs" className="hover:text-gray-200">
              Logs
            </Link>
          </li>
          <li>
            <Link to="/goals" className="hover:text-gray-200">
              Goals
            </Link>
          </li>
          <li>
            <Link to="/relationships" className="hover:text-gray-200">
              Relationships
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-200">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
