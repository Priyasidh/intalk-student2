import React, { useEffect, useState } from "react";
import api from "./api";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";

function UpdateMark() {
  const params = useParams();
  const navigate = useNavigate();

  const [rno, setRno] = useState("");
  const [subject, setSubject] = useState("");
  const [marks_obtained, setMarks_obtained] = useState("");
  const [max_marks, setMax_marks] = useState("");
  const [exam_date, setexam_date] = useState("");
  const [message, setMessage] = useState("");

  const dispData = async () => {
    let result = await api.get(`/mark/${params.id}`);

    const dobString = result.data.result.exam_date;

    const formattedDob = new Date(dobString).toISOString().split("T")[0];

    setRno(result.data.result.rno);
    setSubject(result.data.result.subject);
    setMarks_obtained(result.data.result.marks_obtained);
    setMax_marks(result.data.result.max_marks);
    setexam_date(formattedDob);

    console.log("get one data", result.data.result);
  };

  useEffect(() => {
    dispData();
  }, []);

  const collectUpdate = async (e) => {
    e.preventDefault();

    let result = await api.put(`/mark/${params.id}`, {
      rno,
      subject,
      marks_obtained,
      max_marks,
      exam_date,
    });
    console.log("Updated mark data:", result);
    if (result) {
      navigate("/DisplayMark");
    }

    // try {

    //   const result = await api.post('/student', {
    //     rno,
    //     name,
    //     email,
    //     phno,
    //     city,
    //     dob,
    //   });
    //   console.log("Student API Response:", result); // Log API response
    //   alert('Data added successfully');
    //   setMessage(result.data.message);
    // }
    // catch (error) {
    //   console.error(' Error:', error.response ? error.response.data : error.message);
    //   setMessage('Error in adding student data.');
    // }
  };

  return (
    <div className="flex min-h-screen">
          {/* Sidebar */}
         <Sidebar />

          {/* Main Content */}
         <div className="flex-1 p-8 bg-gray-50">
           <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
               <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Student Marks Details</h2>
    
               <form className="space-y-4" onSubmit={collectUpdate}>
                
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
                    Update Details
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
export default UpdateMark;
