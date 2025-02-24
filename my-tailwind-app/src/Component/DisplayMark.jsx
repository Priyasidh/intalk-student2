import React, { useEffect, useState } from 'react';
import api from './api';
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';
// import io from 'socket.io-client';

// const socket = io("http://localhost:8080", {
//   withCredentials: true,
//   transports: ["websocket", "polling"]
// });

function DisplayMark() {
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    getData();
      //  for new student added event
    //   socket.on("newMarkAdded", (mark) => {
    //       setNotification(`New Mark added: ${mark.name}`);
    //       setData((prevStudents) => [...prevStudents, student]);
    //   });

    //   return () => {
    //       socket.off("newStudentAdded");
    //   };
  }, []);


  const getData = async () => {
    try {
      const result = await api.get("/mark");

      console.log("Display result data:",result.data.result)
      if (Array.isArray(result.data.result)) {
        setData(result.data.result);

        console.log("Display mark data:",result.data.result)
      } else {
        setData([]);
      }
    } catch (error) {
      console.log("Error fetching mark details:", error);
    }
  };

  const deleteMark = async (id) => {
    try {
      await api.delete(`/mark/${id}`);
      getData(); 
    } catch (error) {
      console.log("Error deleting mark :", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Student Mark Details</h2>

        {/* {notification && <div className="notification">{notification}</div>} */}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                  
                <th className="px-6 py-3 text-left text-sm">Id</th>
                <th className="px-6 py-3 text-left text-sm">Roll no</th>
                <th className="px-6 py-3 text-left text-sm">Subject</th>
                <th className="px-6 py-3 text-left text-sm">Marks Obtained</th>
                <th className="px-6 py-3 text-left text-sm">Maximum Marks</th>
                <th className="px-6 py-3 text-left text-sm">Exam Date</th>
                <th className="px-6 py-3 text-left text-sm">Update Mark</th>
                <th className="px-6 py-3 text-left text-sm">Delete Mark</th>
              </tr>
            </thead>
            <tbody>
              {data.map(e => (
                <tr key={e.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-3 text-sm">{e.id}</td>
                  <td className="px-6 py-3 text-sm">{e.rno}</td>
                  <td className="px-6 py-3 text-sm">{e.subject}</td>
                  <td className="px-6 py-3 text-sm">{e.marks_obtained}</td>
                  <td className="px-6 py-3 text-sm">{e.max_marks}</td>
                  <td className="px-6 py-3 text-sm">{e.exam_date}</td>
                  <td className="px-6 py-3 text-sm">
                    <NavLink to={`/UpdateMark/${e.id}`} className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Edit Mark
                    </NavLink>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <button onClick={() => deleteMark(e.id)} className="inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                      Delete Mark
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

export default DisplayMark;


