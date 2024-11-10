// Register.jsx
import React, { useEffect, useState } from 'react';
import './Register.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router';
import axios from 'axios'
import {HOST} from '../../App'
const Register = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate("/")
      alert("You are already LoggedIn")
    }    
  },[]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSubmit = async(e) => {
    console.log(email,username)
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
   try {
    const response = await axios.post(`${HOST}/api/user/register`,{username,email,password})
    console.log(response);
    if(response.status === 201){
      localStorage.setItem("token",response.data.token)
      navigate("/")
      alert("New User Created")
    }
    else{
    
      alert("Some problem occured")
    }
   } catch (error) {
    console.log(error)
   }
  };

  return (
    <div className="register-container">
      

      {/* Optional animated image or illustration */}
      <div className="register-image">
        <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?semt=ais_hybrid" alt="Register Illustration" />
      </div>
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="btn-submit">
            Register
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
