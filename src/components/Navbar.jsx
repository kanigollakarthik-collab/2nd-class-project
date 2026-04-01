import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBriefcase, FaChartPie, FaPlus, FaList } from 'react-icons/fa';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : 'hover:text-blue-300 transition-colors';
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg mb-6">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 tracking-wide">
          <FaBriefcase className="text-blue-400" /> JobTracker
        </Link>
        <div className="flex gap-6 font-medium">
          <Link to="/dashboard" className={`flex items-center gap-2 ${isActive('/dashboard')}`}>
            <FaChartPie /> Dashboard
          </Link>
          <Link to="/applications" className={`flex items-center gap-2 ${isActive('/applications')}`}>
            <FaList /> Applications
          </Link>
          <Link to="/applications/new" className={`flex items-center gap-2 ${isActive('/applications/new')}`}>
            <FaPlus /> Add Job
          </Link>
          <Link to="/analytics" className={`flex items-center gap-2 ${isActive('/analytics')}`}>
            <FaChartPie /> Analytics
          </Link>
        </div>
      </div>
    </nav>
  );
}