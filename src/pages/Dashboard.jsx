import React, { useMemo } from 'react';
import { useApplications } from '../context/ApplicationContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { applications } = useApplications();

  // Calculate Metrics
  const stats = useMemo(() => {
    const total = applications.length;
    const interviewing = applications.filter(a => a.status === 'Interviewing').length;
    const offers = applications.filter(a => a.status === 'Offer').length;
    const rejections = applications.filter(a => a.status === 'Rejected').length;
    
    return { total, interviewing, offers, rejections };
  }, [applications]);

  // Data for Pie Chart
  const pieData = [
    { name: 'Applied', value: applications.filter(a => a.status === 'Applied').length },
    { name: 'Interviewing', value: stats.interviewing },
    { name: 'Offer', value: stats.offers },
    { name: 'Rejected', value: stats.rejections },
  ].filter(item => item.value > 0); // Hide empty slices

  const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-gray-500">Total Applications</p>
          <h2 className="text-3xl font-bold">{stats.total}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <p className="text-gray-500">Interviews</p>
          <h2 className="text-3xl font-bold">{stats.interviewing}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-500">Offers</p>
          <h2 className="text-3xl font-bold">{stats.offers}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
          <p className="text-gray-500">Rejections</p>
          <h2 className="text-3xl font-bold">{stats.rejections}</h2>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Application Pipeline</h3>
          {applications.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-gray-500">
              <p>No data to display yet.</p>
              <Link to="/applications/new" className="text-blue-500 hover:underline mt-2">Add your first job</Link>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">More Analytics Coming Soon</h3>
            <p className="text-gray-500">We'll add monthly application tracking here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}