import React, { useContext, useState } from "react";
import "./Tabs.css";
import { TaskContext } from "../../context/TaskContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import TaskCard from "../../components/Cards/TaskCard";
import axios from "axios";
import { HOST } from "../../App";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/register");
    }
  });

  const { handleTabClick, activeTab } = useContext(TaskContext);
  // const [editedTask, setEditedTask] = React.useState(selectedTask);

  return (
    <div className="tabs-container">
      <div className="tabs">
        <div
          className={`tab ${activeTab === "taskList" ? "active" : ""}`}
          onClick={() => handleTabClick("taskList")}
        >
          Task List
        </div>
        <div
          className={`tab ${activeTab === "taskDetails" ? "active" : ""}`}
          onClick={() => handleTabClick("taskDetails")}
        >
          Task Details & Update
        </div>
        <div
          className={`tab ${activeTab === "taskEditor" ? "active" : ""}`}
          onClick={() => handleTabClick("taskEditor")}
        >
          Task Creator
        </div>
      </div>

      <div className="tab-content">
        {activeTab === "taskList" && <TaskList />}
        {activeTab === "taskDetails" && <TaskDetails />}
        {activeTab === "taskEditor" && <TaskEditor />}
      </div>
    </div>
  );
}

function TaskList() {
  const { tasks } =
    useContext(TaskContext);
  return (
    <div className="tab-pane">
      <h2>List of tasks created by You</h2>
      <div className="grid">
        {!tasks?"Create a Task to Display":
        tasks.map((task) => {
          return <TaskCard task={task} />;
        })}
      </div>
    </div>
  );
}

function TaskDetails() {
  const { selectedTask,handleTabClick } = useContext(TaskContext);
  const {
    _id,
    title,
    description,
    status,
    assignedTo,
    createdAt,
    updatedAt,
  } = selectedTask;

  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  };  

  
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FFA500"; 
      case "In Progress":
        return "#1E90FF"; 
      case "Completed":
        return "#32CD32"; 
      default:
        return "#808080"; 
    }
  };

 
 const [formData, setFormData] = useState({
  title: title,
  description: description,
  status: status,  
});

const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(formData)
    try {
      const response = await axios.put(`${HOST}/api/task/updateTask/${_id}`,{...formData},{
        headers:{
          "authorization" : `${localStorage.getItem("token")}`
        },
        withCredentials:true
      })
      console.log(response.data)
      if(response.status === 200){
        alert("Task Updated Successfully")
        setFormData(response.data)
      }
    } catch (error) {
      console.log(error)
    }
        
  };

  return (
    <div className="tab-pane">
      <h2>Update Your Task Here:</h2>
      {title ? (
        <div className="main-container">
        
        <div className="card-main3">
          {/* <button onClick={handeRedirect}>Click to Edit</button> */}
          <div className="form-container">
      <h3>Edit a Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}            
          />          
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}            
          />          
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            type="status"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}            
          />          
        </div>
        

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
        </div>
        </div>
      ) : (
        <h4>Select Any Task by clicking to View info</h4>
      )}

     
    </div>
  );
}

function TaskEditor() {
  const { selectedTask,handleTabClick } = useContext(TaskContext);

 

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskAssignedTo, setTaskAssignedTo] = useState('');  
  const [collaborators, setCollaborators] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
 
  useEffect(() => {
    axios.get(`${HOST}/api/user/getAllUsers`)  
      .then(response => {
        setUsers(response.data.response);
        console.log(response.data)
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('Unable to fetch users');
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskTitle || !taskDescription || !taskAssignedTo) {
      setError('Title, Description, and Assigned To are required');
      return;
    }

    // Construct the task object
    const taskData = {
      title: taskTitle,
      description: taskDescription,
      assignedTo: taskAssignedTo,
      collaborators: [...collaborators, taskAssignedTo], // Including the assigned user as a collaborator      
    };

    try {
      // Send the data to the backend to create the task
      const response = await axios.post(`${HOST}/api/task/createTask`, taskData, {
        headers: {
          authorization: `${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        },
      });
      console.log('Task created:', response);
      // Reset form after successful task creation
      setTaskTitle('');
      setTaskDescription('');
      setTaskAssignedTo('');
      setCollaborators([]);      
      alert("Task Created")
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task');
    }
  };
  return (
    
      <div className="card-main3">
      <h2>Create a New Task</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskTitle">Title</label>
          <input
            type="text"
            id="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>

        <div className="description">
          <label htmlFor="taskDescription">Description</label>
          <textarea
            id="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
        </div>

        <div>
          
        </div>

        <div className="flex">
        <label htmlFor="taskAssignedTo">Assigned To</label>
          <select
            id="taskAssignedTo"
            value={taskAssignedTo}
            onChange={(e) => setTaskAssignedTo(e.target.value)}
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
          <label htmlFor="collaborators">Collaborators</label>
          <select
            id="collaborators"
            multiple
            value={collaborators}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
              setCollaborators(selectedOptions);
            }}
          >
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        

        <button type="submit">Create Task</button>
      </form>
    
    </div>
  );
}

export default Home;
