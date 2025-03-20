import React from "react"; // ✅ Import React
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // ✅ Always show Navbar
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UsersList from "./components/UsersList";
import HabitList from "./components/HabitList";
import HabitLogs from "./components/HabitLogs";
import Goals from "./components/Goals";
import Relationships from "./components/Relationships";

function App() {
  return (
    <Router>
      <Navbar />

      {/* ✅ Make sure pages only show their own content */}
      <div className="container mx-auto mt-6 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/habits" element={<HabitList />} />
          <Route path="/habit-logs" element={<HabitLogs habitId={1} />} />
          <Route path="/goals" element={<Goals habitId={1} />} />
          <Route path="/relationships" element={<Relationships userId={1} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
