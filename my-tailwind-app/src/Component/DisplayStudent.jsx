import React, { useEffect, useState } from 'react';
import api from './api';
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io("http://localhost:8080", {
  withCredentials: true,
  transports: ["websocket", "polling"]
});

function DisplayStudent() {
  
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    getData();
      //  for new student added event
      socket.on("newStudentAdded", (student) => {
          setNotification(`New student added: ${student.name}`);
          setData((prevStudents) => [...prevStudents, student]);
      });

      return () => {
          socket.off("newStudentAdded");
      };
  }, []);


  const getData = async () => {
    try {
      const result = await api.get("/students");
      if (Array.isArray(result.data.data)) {
        setData(result.data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  const deleteStudent = async (rno,e) => {
    e.preventDefault();
    try {
      await api.delete(`/student/${rno}`);
      getData(); 
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Student Information</h2>

        {notification && <div className="notification">{notification}</div>}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-6 py-3 text-left text-sm">Roll no</th>
                <th className="px-6 py-3 text-left text-sm">Name</th>
                <th className="px-6 py-3 text-left text-sm">Email</th>
                <th className="px-6 py-3 text-left text-sm">Phone No</th>
                <th className="px-6 py-3 text-left text-sm">City</th>
                <th className="px-6 py-3 text-left text-sm">DOB</th>
                <th className="px-6 py-3 text-left text-sm">Update</th>
                <th className="px-6 py-3 text-left text-sm">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map(e => (
                <tr key={e.rno} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-3 text-sm">{e.rno}</td>
                  <td className="px-6 py-3 text-sm">{e.name}</td>
                  <td className="px-6 py-3 text-sm">{e.email}</td>
                  <td className="px-6 py-3 text-sm">{e.phno}</td>
                  <td className="px-6 py-3 text-sm">{e.city}</td>
                  <td className="px-6 py-3 text-sm">{e.dob}</td>
                  <td className="px-6 py-3 text-sm">
                    <NavLink to={`/UpdateStudent/${e.rno}`} className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Edit
                    </NavLink>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <button onClick={() => deleteStudent(e.rno)} className="inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DisplayStudent;


