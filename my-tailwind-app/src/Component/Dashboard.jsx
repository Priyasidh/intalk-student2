import React from 'react'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
function Dashboard() {
      return (
        <div className="flex min-h-screen">
          <Sidebar/>
    
          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Welcome Card */}
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-gray-800">Welcome to your Dashboard</h3>
              <p className="text-gray-600 mt-4">you can add,update and delete student and mark data, and more here.</p>
            </div>
          </div>
        </div>
      );
    }

export default Dashboard