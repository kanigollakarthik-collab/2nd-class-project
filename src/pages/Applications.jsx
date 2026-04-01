import React, { useState, useMemo } from 'react';
import { useApplications } from '../context/ApplicationContext';
import { useDebounce } from '../hooks/useDebounce';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Applications() {
  const { applications, deleteApplication, toggleBookmark } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const [activeTab, setActiveTab] = useState('All');
  const [sortBy, setSortBy] = useState('appliedDate');

  const tabs = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected', 'Bookmarked'];

  // Filter and Sort Logic
  const filteredApps = useMemo(() => {
    let filtered = applications;

    // 1. Tab Filtering
    if (activeTab === 'Bookmarked') {
      filtered = filtered.filter(app => app.bookmarked);
    } else if (activeTab !== 'All') {
      filtered = filtered.filter(app => app.status === activeTab);
    }

    // 2. Debounced Search Filtering
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      filtered = filtered.filter(app => 
        app.company.toLowerCase().includes(lowerSearch) || 
        app.role.toLowerCase().includes(lowerSearch)
      );
    }

    // 3. Sorting
    return filtered.sort((a, b) => {
      if (sortBy === 'appliedDate') return new Date(b.appliedDate) - new Date(a.appliedDate);
      if (sortBy === 'salary') return (Number(b.salary) || 0) - (Number(a.salary) || 0);
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      return 0;
    });
  }, [applications, activeTab, debouncedSearch, sortBy]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(id);
      toast.info('Application deleted');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Job Applications</h1>

      {/* Controls: Search, Sort, Tabs */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Search by company or role..." 
          className="border p-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select 
          className="border p-2 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="appliedDate">Sort by Date Applied</option>
          <option value="salary">Sort by Salary</option>
          <option value="company">Sort by Company</option>
        </select>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Company</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Applied Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">No applications found.</td></tr>
            ) : (
              filteredApps.map(app => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-3">
                    <img src={`https://logo.clearbit.com/${app.company.toLowerCase().replace(/\s+/g, '')}.com`} alt="logo" className="w-8 h-8 rounded-full bg-gray-200" onError={(e) => e.target.style.display='none'} />
                    <span className="font-medium">{app.company}</span>
                  </td>
                  <td className="p-4">{app.role}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-sm ${app.status === 'Offer' ? 'bg-green-100 text-green-800' : app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4">{app.appliedDate}</td>
                  <td className="p-4 flex gap-3 text-gray-600">
                    <button onClick={() => toggleBookmark(app.id)} className="hover:text-yellow-500">
                      {app.bookmarked ? <FaBookmark className="text-yellow-500" /> : <FaRegBookmark />}
                    </button>
                    <Link to={`/applications/${app.id}`} className="hover:text-blue-600"><FaEdit /></Link>
                    <button onClick={() => handleDelete(app.id)} className="hover:text-red-600"><FaTrash /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}