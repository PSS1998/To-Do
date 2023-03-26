import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTasks, deleteTask } from '../api';
import TaskForm from './TaskForm';
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks();
        setTasks(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, [token, navigate]);

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h1>Task List</h1>
      <TaskForm token={token} setTasks={setTasks} />
      <ul>
        {tasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
          tasks.map((task) => (
            <li key={task.id} className="task-list-item">
              {task.title}
              {/* Add more task details, edit and delete buttons here */}
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
