// AdminDashboard.jsx (Improved)

import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ComplaintTable from '../components/Admin/ComplaintTable';
import EditComplaintModal from '../components/Admin/EditComplaintModal';
// Import Lucide Icons
import { LogOut, LayoutDashboard, User } from 'lucide-react';

const AdminDashboard = () => {
  const { logout, currentUser } = useContext(AuthContext); // Assuming AuthContext provides currentUser
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleEdit = (complaint) => setEditingComplaint(complaint);
  const handleClose = () => setEditingComplaint(null);
  const handleUpdate = () => {
    setRefresh(refresh + 1);
    handleClose();
  };

  const userName = currentUser?.name || 'Admin'; // Fallback for display

  return (
    <div className="flex h-screen bg-gray-50">
      {/* --- 🟦 Fixed Sidebar (Unique Professional Look) --- */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col shadow-2xl">
        <div className="p-6 border-b border-indigo-700">
          <div className="text-2xl font-extrabold tracking-widest uppercase">
            <LayoutDashboard className="inline-block mr-2 h-6 w-6" />
            Admin Panel
          </div>
        </div>
        
        <nav className="flex-grow p-4">
          <a
            href="#"
            className="flex items-center p-3 my-2 text-sm font-medium rounded-lg transition duration-150 ease-in-out bg-indigo-800 text-white shadow-md"
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Complaint Management
          </a>
          {/* You can add more navigation links here */}
        </nav>

        {/* --- 👤 User/Logout Section --- */}
        <div className="p-4 border-t border-indigo-700">
          <div className="flex items-center mb-4">
            <User className="h-8 w-8 text-indigo-300 mr-3" />
            <div>
              <p className="text-sm font-semibold">{userName}</p>
              <p className="text-xs text-indigo-300">Administrator</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-150 ease-in-out shadow-lg"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* --- 📊 Main Content Area --- */}
      <main className="flex-1 overflow-auto p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">
            Complaint Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Review and manage all user complaints.
          </p>
        </header>

        {/* --- 📋 Table Card for Improved Display --- */}
        <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Open Complaints
          </h2>
          <ComplaintTable onEdit={handleEdit} key={refresh} />
        </div>
      </main>

      {editingComplaint && (
        <EditComplaintModal 
          complaint={editingComplaint} 
          onClose={handleClose} 
          onUpdate={handleUpdate} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;