import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { HOST } from '../App';


export const TaskContext = createContext();


export const TaskProvider = ({ children }) => {
  
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(localStorage.getItem("selectedTask")|| []);
  const [activeTab, setActiveTab] = useState("taskList");

   const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const getTask = async () => {
    try {
      const res = await axios.get(`${HOST}/api/task/getAllTasks`,{
        headers:{
          "authorization" :  `${localStorage.getItem("token")}`,
          "Content-Type" : "application/json"
        }
      });
      console.log(res);
      setTasks(res.data);      
    } catch (error) {
      console.log(error);
    }
  };
  
  
  // const fetchTasks = async () => {
  //   const response = axios.get("")
  //   const fetchedTasks = [
  //     { id: 1, title: 'Task 1', description: 'Description for task 1' },
  //     { id: 2, title: 'Task 2', description: 'Description for task 2' },
  //     { id: 3, title: 'Task 3', description: 'Description for task 3' },
  //   ];
  //   setTasks(fetchedTasks);
  // };

  // useEffect(() => {
    

  //   fetchTasks();
  // }, []); // Empty array means it runs once when the component mounts

  // Function to set the task that the user wants to edit
  // const selectTaskForEditing = (task) => {
  //   setSelectedTask(task);
  // };

  // // Function to update the selected task
  // const updateSelectedTask = (updatedTask) => {
  //   setSelectedTask(updatedTask);
  //   // Optionally, you can update the task in the `tasks` array
  //   setTasks(tasks.map(task => 
  //     task.id === updatedTask.id ? updatedTask : task
  //   ));
  // };

  return (
    <TaskContext.Provider value={{
      tasks,
      selectedTask,
      setSelectedTask,
      setTasks,   
      handleTabClick, 
      activeTab, setActiveTab,
      getTask          
    }}>
      {children}
    </TaskContext.Provider>
  );
};
