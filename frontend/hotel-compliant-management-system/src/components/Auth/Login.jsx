import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = await login(username, password);
      // Removed alert() as per best practices.
      console.log(`Login successful. Navigating to /${role}`);
      navigate(role === 'admin' ? '/admin' : '/student');
    } catch {
      // Use a visible message box instead of alert()
      document.getElementById('login-message').innerText = 'Login failed: Invalid credentials';
      document.getElementById('login-message').classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('login-message').classList.add('hidden');
      }, 3000);
    }
  };

  // Background Image URL (Using a high-quality placeholder image for a modern residential facility)
  const backgroundUrl = 'https://images.unsplash.com/photo-1594051016629-bc982b6831d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjcwM3wwfDF8c2VhcmNofDEzfHByb2Zlc3Npb25hbCUyMHJlc2lkZW5jZXxlbnwwfHx8fDE3MDA2MDA0NTJ8MA&ixlib=rb-4.0.3&q=80&w=1080';

  return (
    // 1. Main container uses inline style for background image
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-gray-900"
      style={{
        backgroundImage: `url('${backgroundUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      
      {/* Login Error Message Box */}
      <div id="login-message" className="hidden fixed top-5 right-5 z-50 bg-red-600 text-white px-4 py-2 rounded-lg shadow-xl font-medium transition duration-300">
        Login failed: Invalid credentials
      </div>

      {/* 2. Login Container: bg-gray-800/90 adds opacity; backdrop-blur-sm creates a subtle glass effect */}
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-700 transform transition-all hover:scale-[1.01]">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-white flex items-center justify-center">
            <LogIn className="h-7 w-7 mr-3 text-blue-400" />
            ResiAssist Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Username Field */}
          <div>
            <label className="block font-medium mb-2 text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white shadow-inner transition duration-150"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block font-medium mb-2 text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white shadow-inner transition duration-150"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200 font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition duration-150">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;