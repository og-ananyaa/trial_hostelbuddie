import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './assets/Auth.css'; // Import your CSS file
import logo from './assets/hb_logo.png';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith('@pec.edu.in')) {
      alert('Invalid email domain. Only emails ending with @pec.edu.in are allowed.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/register', { name, email, password });
      console.log(response.data);
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="HostelBuddy Logo" className="logo" />
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">Register</button>
        </form>
        <p>Already have an account?</p>
        <Link to="/login" className="btn-secondary">Login</Link>
      </div>
    </div>
  );
}

export default Register;
