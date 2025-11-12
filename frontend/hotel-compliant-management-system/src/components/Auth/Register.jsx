import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Change this to your desired page
  const backUrl = '/Login'; // Example: '/home', '/' etc.

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      alert('Registration successful. Please login.');
      setUsername('');
      setPassword('');
    } catch {
      alert('Registration failed: Username taken or invalid data');
    }
  };

  const handleBack = () => {
    navigate(backUrl);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
          Register (Students Only)
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            style={inputStyle}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>

        {/* ✅ Back button */}
        <button onClick={handleBack} style={backButtonStyle}>
          ← Back
        </button>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5'
};

const cardStyle = {
  backgroundColor: '#1e1e1e',
  padding: '30px',
  borderRadius: '10px',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
  color: '#fff'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '12px',
  borderRadius: '5px',
  border: '1px solid #555',
  backgroundColor: '#2b2b2b',
  color: 'white',
  fontSize: '14px'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const backButtonStyle = {
  marginTop: '10px',
  width: '100%',
  padding: '8px',
  backgroundColor: '#444',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default Register;
