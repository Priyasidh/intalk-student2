import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
function Register() {
  const [username,setusername]=useState('');
  const [password,setpassword]=useState('');
  const [email,setemail]=useState('');
  const[message,setmessage]=useState('');


  const navigate=useNavigate();

  const handleClick=async(e)=>{
    e.preventDefault(); 
      try{
        const result=await axios.post("http://localhost:8080/api/signup",{
          username,
          password,
          email
        // },{
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }}
      });
        console.log("Result:",result.data)
        setmessage(result.data.message)
        navigate('/')
      }catch(error){
        console.log(error.response);
        setmessage("Error in registration")
      }
  }

  return (
<div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2> 
        
        <form className="" onSubmit={handleClick} >

{/* username */}
          <div className="mb-4"> 
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Username</label>
              </div>
              <div>
                <input className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" name="username" value={username} id="" onChange={(e)=>setusername(e.target.value)}/>  
              </div>   
          </div>

{/* password */}
          <div className="mb-4"> 
              <div className="">
                <label className="text-gray-700 text-sm font-medium mb-1">Password</label>
              </div>
              <div className="">
                <input className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" name="password" value={password} id="" onChange={(e)=>setpassword(e.target.value)}/>  
              </div>   
          </div>

{/*Email  */}
          <div className="mb-4"> 
              <div className="">
                <label className="text-sm text-gray-700 font-medium mb-1">Email</label>
              </div>
              <div className="">
                <input className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" name="email" value={email} id="" onChange={(e)=>setemail(e.target.value)}/>  
              </div>   
          </div>
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>
          </div>
        </form>

{/* Login Link */}
         <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline" >
            Login
          </Link>
        </p>
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export default Register