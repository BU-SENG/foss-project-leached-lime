// components/Admin/ComplaintTable.jsx (Improved)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const ComplaintTable = ({ onEdit, refreshCounter }) => { // Added refreshCounter prop for controlled re-fetch
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to dynamically style the status pill
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4 mr-1.5" />;
      case 'In Progress':
        return <AlertTriangle className="h-4 w-4 mr-1.5" />;
      case 'Resolved':
        return <CheckCircle className="h-4 w-4 mr-1.5" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/complaints', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        // Sort by creation date (newest first) for better admin view
        const sortedComplaints = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComplaints(sortedComplaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        alert('Error fetching complaints');
      } finally {
        setLoading(false);
      }
    };
    // Fetch complaints on mount and whenever the parent component triggers a refresh
    fetchComplaints();
  }, [refreshCounter]); // Use refreshCounter to trigger data refetch

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint? This action cannot be undone.")) return;

    try {
      await axios.delete(`/api/complaints/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setComplaints(complaints.filter((c) => c.id !== id));
      alert('Complaint successfully deleted.');
    } catch (error) {
      console.error('Error deleting complaint:', error);
      alert('Error deleting complaint');
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-lg text-gray-500">Loading complaints...</div>;
  }
  
  if (complaints.length === 0) {
    return <div className="text-center py-10 text-lg text-gray-500">No complaints found.</div>;
  }

  return (
    // Responsive wrapper and subtle shadow for the table area
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-indigo-700 text-white">
          <tr>
            {/* Added subtle p-4 and font-semibold for professional look */}
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Name/Room</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Block/Type</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider max-w-sm">Description</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {complaints.map((c, index) => (
            // Alternating row background for excellent readability
            <tr key={c.id} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100 transition-colors duration-150'}>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                #{c.id}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-gray-500">Room: {c.roomNumber}</div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                <div className="font-medium">{c.block}</div>
                <div className="text-xs text-gray-500">Type: {c.type}</div>
              </td>
              <td className="px-6 py-3 text-sm text-gray-600 max-w-xs truncate">
                {c.description}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(c.status)}`}>
                  {getStatusIcon(c.status)}
                  {c.status}
                </span>
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                {new Date(c.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-center text-sm font-medium space-x-2">
                {/* ✏️ Edit Button - Primary Action */}
                <button
                  onClick={() => onEdit(c)}
                  className="inline-flex items-center p-2 rounded-full text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 transition duration-150 shadow-md"
                  aria-label="Edit"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                {/* 🗑️ Delete Button - Secondary, Danger Action */}
                <button
                  onClick={() => handleDelete(c.id)}
                  className="inline-flex items-center p-2 rounded-full text-red-600 hover:text-white bg-red-50 hover:bg-red-600 transition duration-150 shadow-md"
                  aria-label="Delete"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;