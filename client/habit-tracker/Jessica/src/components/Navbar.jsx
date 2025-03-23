import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token); // ✅ Set auth state based on token presence
  }, []);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user"); // ✅ Remove user details
    setIsAuthenticated(false);
    navigate("/login"); // ✅ Redirect to login page
  };

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
            <Link to="/habits" className="hover:text-gray-200">
              Habits
            </Link>
          </li>
          <li>
            <Link to="/goals" className="hover:text-gray-200">
              Goals
            </Link>
          </li>

          {/* ✅ Show Login/Register if NOT authenticated */}
          {!isAuthenticated ? (
            <>
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
            </>
          ) : (
            // ✅ Show Logout if authenticated
            <li>
              <button onClick={handleLogout} className="hover:text-gray-200">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
