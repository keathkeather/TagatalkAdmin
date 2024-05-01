"use client";

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; 
import Dashboard from './components/Dashboard';
import Users from './components/Users'; 
import Feedback from './components/Feedback'; 
import Reports from './components/Reports';

const Home = () => {
    return (
        <Router>
            <div className="bg-slate-50 overflow-hidden">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/reports" element={<Reports />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Home;
