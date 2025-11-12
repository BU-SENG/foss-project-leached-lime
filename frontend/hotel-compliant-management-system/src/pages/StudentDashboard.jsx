// StudentDashboard.jsx (Improved)

import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ComplaintForm from '../components/Student/ComplaintForm';
import ComplaintHistory from '../components/Student/ComplaintHistory';
// Import Lucide Icons
import { LogOut, Home, FileText, User } from 'lucide-react';

const StudentDashboard = () => {
  // Assuming AuthContext provides currentUser for personalized greeting
  const { logout, currentUser } = useContext(AuthContext); 
  const [refresh, setRefresh] = React.useState(0);

  const handleSubmitSuccess = () => setRefresh(refresh + 1);
  
  // Example user data fallback
  const userName = currentUser?.name || 'Valued Student'; 
  const userBlock = currentUser?.block || 'A'; 
  const userRoom = currentUser?.roomNumber || '101';

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- 🧭 Top Navigation Bar (Unique Professional Look) --- */}
      <nav className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo/Title */}
            <div className="flex-shrink-0 flex items-center">
              <FileText className="h-7 w-7 text-teal-600 mr-2" />
              <span className="text-xl font-bold text-gray-800">
                ResiAssist Portal
              </span>
            </div>

            {/* User Info and Logout */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center text-sm text-gray-600 mr-4">
                <User className="h-5 w-5 mr-2 text-teal-500" />
                <span>{userName} | Block {userBlock} - Room {userRoom}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-150 shadow-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- 🏠 Main Dashboard Content --- */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Header/Greeting */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Home className="h-8 w-8 text-teal-600 mr-3" />
            Welcome, {userName}!
          </h1>
          <p className="text-gray-500 mt-1">
            Easily submit new maintenance requests and view your history below.
          </p>
        </header>

        {/* --- 📝 Two-Column Layout for Form and History --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Complaint Form (Larger Card) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-2xl border border-teal-100">
              <h2 className="text-xl font-semibold mb-4 text-teal-700 border-b pb-2">
                Submit New Complaint
              </h2>
              <ComplaintForm onSubmitSuccess={handleSubmitSuccess} />
            </div>
          </div>

          {/* Column 2: Complaint History (Scrolling Area) */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                Your Complaint History
              </h2>
              {/* Added height limit and overflow for clean history display */}
              <div className="max-h-[600px] overflow-y-auto pr-2"> 
                <ComplaintHistory key={refresh} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;