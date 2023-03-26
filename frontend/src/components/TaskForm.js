import React, { useState } from 'react';
import { postTask } from '../api';

const TaskForm = ({ token, setTasks }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postTask({ title });
      const newTask = {
         id: response.id,
         title: response.title,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTitle('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
