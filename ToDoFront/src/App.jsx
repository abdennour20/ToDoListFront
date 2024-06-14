import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import {AddUser} from './AddUser/AddUser';
import './App.css';
import { AddTask } from './AddTask/AddTask';
import { Dashboard } from './Dashboard/Dashboard';
import {GetTask} from './GetTask/GetTask';

export const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
        <Route path="/" exact Component={Dashboard} />
          <Route path="/addUser" element={<AddUser/>} />
          <Route path="/addTask" element={<AddTask/>} />
          <Route path="/getTask" element={<GetTask/>} />
        </Routes>
      </div>
    </Router>
  );
};





