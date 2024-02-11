import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3360/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          phone: phoneNumber,
          email,
          password,
        }),
      });

      if (response.ok) {
        console.log("signed up");
        onSignUp(true);
        navigate('/');
      } else {
        console.error('Error signing up user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:
            <input type="text" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>Username:
            <input type="text" value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>Phone Number:
            <input type="tel" value={phoneNumber} placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} required />
          </label>
          <label>Email:
            <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>Password:
            <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
