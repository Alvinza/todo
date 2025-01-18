import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Tasks from './components/Tasks';
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
};

export default App;
