import React from 'react';
import { useApplications } from '../context/ApplicationContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function Analytics() {
  const { applications } = useApplications();

  // Prepare data for Salary comparison chart
  const salaryData = applications
    .filter(app => app.salary > 0)
    .map(app => ({
      company: app.company,
      salary: Number(app.salary)
    }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Detailed Analytics</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">Salary Expectations by Company</h3>
        {salaryData.length === 0 ? (
          <p className="text-gray-500">Add applications with salary data to see this chart.</p>
        ) : (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="company" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="salary" fill="#3b82f6" name="Expected Salary" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}