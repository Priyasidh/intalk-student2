import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
function Sidebar() {
  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    try {
      const result = await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (result.ok) {
        console.log("Logout successful");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
    window.location.href = "/";
  }


  return (
    <div className="w-64 bg-blue-600 text-white p-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <nav className="mt-8">
        <ul>
          <li><Link to="/Dashboard" className="block py-2 px-4 rounded hover:bg-blue-700">Dashboard</Link></li>
          <li><Link to="/Student" className="block py-2 px-4 rounded hover:bg-blue-700">Add New Student</Link></li>
          <li><Link to="/DisplayStudent" className="block py-2 px-4 rounded hover:bg-blue-700">Display All Student</Link></li>
          <li><Link to="/Mark" className="block py-2 px-4 rounded hover:bg-blue-700">Add Student Marks</Link></li>
          <li><Link to="/DisplayMark" className="block py-2 px-4 rounded hover:bg-blue-700">Display Mark</Link></li>
          <li><Link to="/Dashboard" onClick={handleLogout} className="block py-2 px-4 rounded hover:bg-blue-700">Logout</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar