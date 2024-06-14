
import './dashboard.css'
import React from 'react';
import { Link } from 'react-router-dom';
export const Dashboard = () => {
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="/addUser">Add User</Link>
          </li>
          <li>
            <Link to="/addTask">Add Task</Link>
          </li>
         <li>
         <Link to="/getTask">Get Tasks</Link> 
         </li>
        </ul>
      </nav>
    </div>
  );
};








