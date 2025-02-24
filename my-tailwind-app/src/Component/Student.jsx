import React, { useState } from 'react';
import api from './api';
import Sidebar from './Sidebar';

  function Student() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phno, setPhno] = useState("");
    const [city, setCity] = useState("");
    const [dob, setDob] = useState("");
    const [message, setMessage] = useState("");
  
    const token = localStorage.getItem("accessToken");
  
    const handleStudent = async (e) => {
      e.preventDefault();
      try {
        const result = await api.post(
          "/student",
          { name, email, phno, city, dob },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
  
        alert("Student added successfully!");
        setMessage(result.data.message);
  
        // Clear form fields
        // setRno("");
        setName("");
        setEmail("");
        setPhno("");
        setCity("");
        setDob("");
      } catch (err) {
        console.log("Error adding student:", err);
      }
    };
  

  return (
    <div className="flex min-h-screen">
          {/* Sidebar */}
         <Sidebar />
    
          {/* Main Content */}
         <div className="flex-1 p-8 bg-gray-50">
           <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
               <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Student Registration</h2>
    
               <form className="space-y-4" onSubmit={handleStudent}>
                 {/* Roll Number */}
                 {/* <div>
                   <label className="text-sm font-medium text-gray-700">Roll Number</label>
                   <input
                    type="text"
                    value={rno}
                    onChange={(e) => setRno(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your roll number"
                    required
                  />
                </div> */}
    
                 {/* Name */}
                <div>
                   <label className="text-sm font-medium text-gray-700">Name</label>
                   <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your name"
                    required
                  />
                </div>
    
                 {/* Email */}
                 <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
    
                 {/* Phone Number */}
                 <div>
                   <label className="text-sm font-medium text-gray-700">Phone Number</label>
                   <input
                    type="number"
                    value={phno}
                    onChange={(e) => setPhno(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
    
                 {/* City */}
                 <div>
                   <label className="text-sm font-medium text-gray-700">City</label>
                   <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your city"
                    required
                  />
                </div>
    
                 {/* Date of Birth */}
                 <div>
                   <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                   <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
    
                 {/* Submit Button */}
                 <div>
                   <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Submit
                  </button>
                </div>
              </form>
    
              {/* Error Message */}
              {message && (
                <p className="mt-4 text-center text-red-500">{message}</p>
              )}
            </div>
          </div>
        </div>
  );
}

export default Student;

