import React, { useState } from 'react';
import api from './api';
import Sidebar from './Sidebar';

  function Mark() {

    const [rno, setRno] = useState('');
    const [subject, setSubject] = useState('');
    const [marks_obtained, setMarks_obtained] = useState('');
    const [max_marks, setMax_marks] = useState('');
    const [exam_date, setexam_date] = useState('');
    const [message, setMessage] = useState('');
  
    const token = localStorage.getItem("accessToken");
  
    const handleMark = async (e) => {
      e.preventDefault();
      try {

        const studentCheck = await api.get(`/student/${rno}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
      
          if (!studentCheck.data.exists) {
            alert("Roll number does not exist. Please enter a valid Roll Number.");
            return;
          }
      
        const result = await api.post(
          "/mark",
          {rno, subject, marks_obtained, max_marks, exam_date },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
  
        alert("Mark added successfully!");
        setMessage(result.data.message);
  
        // Clear form fields
        setRno("");
        setSubject("");
        setMarks_obtained("");
        setMax_marks("");
        setexam_date("");
      } catch (err) {
        console.log("Error adding mark:", err);
      }
    };
  

  return (
    <div className="flex min-h-screen">
          {/* Sidebar */}
         <Sidebar />

          {/* Main Content */}
         <div className="flex-1 p-8 bg-gray-50">
           <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
               <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Student Marks Details</h2>
    
               <form className="space-y-4" onSubmit={handleMark}>
                 {/* Mark id */}
                 {/* <div>
                   <label className="text-sm font-medium text-gray-700">Mark id</label>
                   <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter Mark id"
                    required
                  />
                </div> */}

                {/* Roll no */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Roll no</label>
                  <input
                    type="number"
                    value={rno}
                    onChange={(e) => setRno(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter Roll no"
                    required
                  />
                </div>
    
                {/* Subject */}
                <div>
                   <label className="text-sm font-medium text-gray-700">Subject Name</label>
                   <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter subject name"
                    required
                  />
                </div>
    
                 {/* Marks Obtained */}
                 <div>
                   <label className="text-sm font-medium text-gray-700">Marks Obtained</label>
                   <input
                    type="number"
                    value={marks_obtained}
                    onChange={(e) => setMarks_obtained(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter Marks Obtained"
                    required
                  />
                </div>
    
                 {/* Max Marks */}
                 <div>
                   <label className="text-sm font-medium text-gray-700">Max Marks</label>
                   <input
                    type="number"
                    value={max_marks}
                    onChange={(e) => setMax_marks(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter Max Marks"
                    required
                  />
                </div>
    
                 {/* Exam Date*/}
                 <div>
                   <label className="text-sm font-medium text-gray-700">Exam Date</label>
                   <input
                    type="date"
                    value={exam_date}
                    onChange={(e) => setexam_date(e.target.value)}
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

export default Mark;

