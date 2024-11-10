import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import socket from "./socket";
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Register from "./pages/auth/Register";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Auth";
import { TaskContext } from "./context/TaskContext";
import AboutPage from "./pages/about/AboutPage";


export const HOST = "https://task-manager-enlighten.onrender.com"
const App = () => {
  
  const {tasks,setTasks,getTask} = useContext(TaskContext)

  console.log(socket);
  // Effect hook to handle socket events
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server!");
    });

    socket.on("msg", (message) => {
      console.log("new message", message);
      setTasks((prevTasks) => {
        const taskIndex = prevTasks.findIndex(
          (task) => task._id === message._id
        );
        if (taskIndex !== -1) {
          const newTasks = [...prevTasks];
          newTasks[taskIndex] = message;
          return newTasks;
        }
        return prevTasks;
      });
    });
    socket.on('del', (message) => {
      console.log('Task deleted:', message);
      setTasks(message)
    });
    socket.on('created', (message) => {
      console.log('Task created:', message);
      setTasks(message)
    });

    socket.on("connect_error", (error) => {
      console.error("Connection failed:", error);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    getTask();
  }, []);



  return (
    <div>
      <HashRouter>
      <Navbar/>
      <Routes>          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/chat" element={<Chat />} /> */}
        </Routes>
      
      </HashRouter>
      
    </div>
  );
};

export default App;
