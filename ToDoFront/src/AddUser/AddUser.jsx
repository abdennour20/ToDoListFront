import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './addUser.css';

export const AddUser = () => {
  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7278/api/User', data);
      if (response.status === 200 || response.status === 201) {
        toast.success('User successfully added!');
        setData({ name: '', username: '', email: '' }); 
      } else {
        toast.error('Failed to add user.');
      }
    } catch (error) {
      toast.error('Error adding user: ' + error.message);
    }
  };

  return (
    <div className="user-form">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={data.name} onChange={handleChange} required />
        </label>
        <label>
          Username:
          <input type="text" name="username" value={data.username} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={data.email} onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};
