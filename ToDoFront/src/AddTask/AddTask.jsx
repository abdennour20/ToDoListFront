import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './addTask.css';

export const AddTask = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    status: '',
    dateDed: '',
    assigned_user_id: ''
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7278/api/User');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: name === 'status' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7278/api/Task', data);

      if (response.status === 200 || response.status === 201) {
        console.log('Task successfully added:', response.data);
        setData({
          title: '',
          description: '',
          status: 0,
          dateDed: '',
          assigned_user_id: ''
        });
        toast.success('Task successfully added!');
      } else {
        console.error('Failed to add task. Status:', response.status);
        toast.error('Failed to add task.');
      }
    } catch (error) {
      console.error('Error adding task:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
      toast.error(`Error adding task: ${error.message}`);
    }
  };

  return (
    <div className="add-task-form">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={data.title} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={data.description} onChange={handleChange} required />
        </label>
        <label>
          Status:
          <select name="status" value={data.status} onChange={handleChange} required>
            <option value={0}>Pending</option>
            <option value={1}>In Progress</option>
            <option value={2}>Completed</option>
          </select>
        </label>
        <label>
          Due Date:
          <input type="date" name="dateDed" value={data.dateDed} onChange={handleChange} required />
        </label>
        <label>
          Assign to User:
          <select name="assigned_user_id" value={data.assigned_user_id} onChange={handleChange} required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};
