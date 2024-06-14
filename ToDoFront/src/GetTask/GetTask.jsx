import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './getTask.css';

export const GetTask = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://localhost:7278/api/Task');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7278/api/User');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchTasks();
    fetchUsers();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(`https://localhost:7278/api/Task/${taskId}`);
      if (response.status === 200 || response.status === 204) {
        setTasks(tasks.filter(task => task.id !== taskId));
        toast.success('Task successfully deleted!');
      } else {
        console.error('Failed to delete task. Status:', response.status);
        toast.error('Failed to delete task.');
      }
    } catch (error) {
      console.error('Error deleting task:', error.message);
      toast.error('Error deleting task.');
    }
  };

  const handleUpdate = (task) => {
    setEditingTask(task);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingTask(prevTask => ({
      ...prevTask,
      [name]: name === 'status' ? parseInt(value) : value
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://localhost:7278/api/Task/${editingTask.id}`, editingTask);
      if (response.status === 200 || response.status === 204) {
        setTasks(tasks.map(task => task.id === editingTask.id ? editingTask : task));
        setEditingTask(null);
        toast.success('Task successfully updated!');
      } else {
        console.error('Failed to update task. Status:', response.status);
        toast.error('Failed to update task.');
      }
    } catch (error) {
      console.error('Error updating task:', error.response ? error.response.data : error.message);
      toast.error('Error updating task: ' + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <div className="get-task-list">
      <h2>Tasks List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div className="task-details">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status === 0 ? 'Pending' : task.status === 1 ? 'In Progress' : 'Completed'}</p>
              <p>Due Date: {task.dateDed}</p>
              <p>Assigned User: {task.assignedUser ? task.assignedUser.name : 'Unassigned'}</p>
            </div>
            <div className="task-actions">
              <button className="update-button" onClick={() => handleUpdate(task)}>Update Task</button>
              <button className="delete-button" onClick={() => handleDelete(task.id)}>Delete Task</button>
            </div>
          </li>
        ))}
      </ul>
      {editingTask && (
        <div className="update-task-form">
          <h2>Update Task</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleUpdateSubmit}>
            <label>
              Title:
              <input type="text" name="title" value={editingTask.title} onChange={handleChange} required />
            </label>
            <label>
              Description:
              <input type="text" name="description" value={editingTask.description} onChange={handleChange} required />
            </label>
            <label>
              Status:
              <select name="status" value={editingTask.status} onChange={handleChange} required>
                <option value={0}>Pending</option>
                <option value={1}>In Progress</option>
                <option value={2}>Completed</option>
              </select>
            </label>
            <label>
              Due Date:
              <input type="date" name="dateDed" value={editingTask.dateDed} onChange={handleChange} required />
            </label>
            <label>
              Assigned User:
              <select name="assigned_user_id" value={editingTask.assigned_user_id} onChange={handleChange} required>
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
