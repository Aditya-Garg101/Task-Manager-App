import React, { useContext } from 'react';
import './TaskCard.css';
import { TaskContext } from '../../context/TaskContext';
import { HOST } from '../../App';
import axios from 'axios';

const TaskCard = ({ task }) => {
  const { _id, title, description, status,getTask, assignedTo, createdAt, collaborators } = task;
const {setSelectedTask,setActiveTab,} = useContext(TaskContext)
  // Format timestamps for createdAt and updatedAt
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Returns a localized date and time string
  };

  // Get the status color based on the status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#FFA500';
      case 'In Progress':
        return '#1E90FF';
      case 'Completed':
        return '#32CD32';
      default:
        return '#808080';
    }
  };

  const handleSelectedCard = () =>{    
    setActiveTab("taskDetails")
    localStorage.setItem("selectedTask",JSON.stringify({...task}))
      setSelectedTask({...task})            
  }

  const handleRedirect = () => {
    setActiveTab("taskDetails")
    localStorage.setItem("selectedTask",JSON.stringify({...task}))
      setSelectedTask({...task})     
  }

  const handleDeleteTask = async() =>{
    const isConfirmed = window.confirm('Are you sure you want to delete the task?');

    if(isConfirmed){
      try {
        const response = await axios.delete(`${HOST}/api/task/deleteTask/${_id}`,{
          headers:{
            'Content-Type': 'application/json',
            "authorization" : `${localStorage.getItem("token")}`
          },
          withCredentials:true
        })
        console.log(response) 
        if(response.status === 200){
          alert("Task Deleted")
          getTask()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className="task-card" >
      <div className="task-card-header ">
        <h2 className="task-title">{title}</h2>
        <span className="task-status" style={{ backgroundColor: getStatusColor(status) }}>
          {status}
        </span>
      </div>

      <div className="task-details" onClick={handleSelectedCard}>
        <div className="task-id">
          <strong>Task ID:</strong> {_id}
        </div>
        <div className="task-description">
          <strong>Description:</strong> {description}
        </div>
        <div className="task-assigned">
          <strong>Assigned To:</strong> <a href={`mailto:${assignedTo}`}>{assignedTo}</a>
        </div>
        <div className="task-timestamps">
          <div>
            <strong>Created At:</strong> {formatDate(createdAt)}
          </div>
          <div>
            <strong>Collaborators:</strong> {collaborators.map((col)=>{
              return <p>{col}</p>
            })}
          </div>
        </div>

        
      </div>
      <div className="buttons">
        <button onClick={handleRedirect} className='edit-btn'>Edit</button>
        <button onClick={handleDeleteTask} className='delete-btn'>Delete</button>
        </div>
    </div>
  );
};

export default TaskCard;
