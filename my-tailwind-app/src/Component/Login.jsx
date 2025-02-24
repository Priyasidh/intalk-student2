// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/signin`, { email, password },{withCredentials:true});
      const { accessToken, refreshToken } = response.data;

      // Store tokens in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Set default Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      alert('Login successful');
      navigate('/Dashboard');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 font-medium mb-1">Email</label>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition duration-200"
            >
              LOGIN
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          New User? <Link to="/Register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
