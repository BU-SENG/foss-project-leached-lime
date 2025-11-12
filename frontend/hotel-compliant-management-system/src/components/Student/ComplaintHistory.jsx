// components/Student/ComplaintHistory.jsx (Improved)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, CheckCircle, AlertTriangle, MessageSquare, ClipboardList, Calendar } from 'lucide-react';

const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to dynamically style the status pill
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-800 ring-orange-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 ring-blue-300';
      case 'Resolved':
        return 'bg-green-100 text-green-800 ring-green-300';
      default:
        return 'bg-gray-100 text-gray-800 ring-gray-300';
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
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/complaints', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Sort by creation date (newest first)
        const sortedComplaints = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComplaints(sortedComplaints);
      } catch (error) {
        console.error('Error fetching student complaints:', error);
        alert('Error fetching your complaint history');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-500 flex items-center justify-center"><Clock className="h-5 w-5 animate-spin mr-2" /> Loading complaint history...</div>;
  }
  
  if (complaints.length === 0) {
    return <div className="text-center py-8 text-lg text-gray-500 border border-dashed border-gray-300 p-6 rounded-lg">You have not submitted any complaints yet.</div>;
  }

  return (
    <div className="space-y-4">
      {complaints.map((c) => (
        <div 
          key={c.id} 
          className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-200"
        >
          <div className="flex justify-between items-start border-b pb-2 mb-2">
            
            {/* 🏷️ Complaint ID and Type */}
            <div>
              <span className="text-xs font-bold uppercase text-gray-500">
                Complaint #{c.id}
              </span>
              <h4 className="text-lg font-semibold text-teal-800 flex items-center">
                <ClipboardList className="h-5 w-5 mr-2 text-teal-600" />
                {c.type}
              </h4>
            </div>

            {/* 🚦 Status Pill */}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ring-1 ${getStatusStyles(c.status)}`}>
              {getStatusIcon(c.status)}
              {c.status}
            </span>
          </div>

          <p className="text-gray-700 mb-3 text-sm flex items-start">
            <MessageSquare className="h-4 w-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
            <span className="font-medium mr-1">Description:</span>
            {c.description}
          </p>

          <div className="flex flex-wrap text-xs text-gray-500 justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center mr-4">
                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                Reported: {new Date(c.createdAt).toLocaleDateString()}
            </div>
            {/* Show user details if the backend returns them (useful for verification) */}
            <div className="flex items-center">
                <span className="font-semibold text-gray-600">
                  {c.name} ({c.block}-{c.roomNumber})
                </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplaintHistory;