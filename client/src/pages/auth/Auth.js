// Login.jsx
import React, { useState,useEffect, useContext } from "react";
import "./auth.css"; // Import the CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import {HOST} from '../../App'
import { TaskContext } from "../../context/TaskContext";

const Login = () => {


  const {showToast,toasts} = useContext(TaskContext)

  
  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate("/")
      alert("You are already LoggedIn")
    }    
  },[]);
  
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${HOST}/api/user/login`,{email,password})      
      if(res.status === 200 && res.data.success === true){
        navigate("/")
        localStorage.setItem("token",res.data.token)
      }
      else{
        alert("some error occured")
        alert(res.data.message)
      }
    } catch (error) {
      console.log(error)
      alert("Invalid Credentials")
    }   
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">User Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your Name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              // type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
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
          <button type="submit" className="btn-submit">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>

      {/* Animated image/illustration */}
      <div className="login-image">
        <dotlottie-player
          src="https://lottie.host/e60434fc-93d3-4435-82a6-4df9e477d8e1/BY1GqVIQdO.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
    </div>
  );
};

export default Login;
