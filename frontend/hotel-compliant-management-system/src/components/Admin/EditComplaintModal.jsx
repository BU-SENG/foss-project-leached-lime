import React, { useState } from 'react';
import axios from 'axios';

// Placeholder for an icon component if you don't use a library
const Icon = ({ children, className }) => <span className={`mr-2 ${className}`}>{children}</span>;
const FaUser = () => <Icon className="text-gray-500">👤</Icon>;
const FaDoorClosed = () => <Icon className="text-gray-500">🚪</Icon>;
const FaBuilding = () => <Icon className="text-gray-500">🏢</Icon>;
const FaTag = () => <Icon className="text-gray-500">🏷️</Icon>;
const FaFileAlt = () => <Icon className="text-gray-500">📝</Icon>;
const FaCheckCircle = () => <Icon className="text-gray-500">✅</Icon>;
const FaTimes = () => <Icon className="text-gray-400">✖️</Icon>;


const EditComplaintModal = ({ complaint, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(complaint);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/complaints/${formData.id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Complaint updated successfully!');
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      alert('Error updating complaint. Please try again.');
    }
  };

  return (
    // Backdrop
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4">
      {/* Modal Content - Added max-h-[90vh] and overflow-y-auto */}
      <div className="bg-white rounded-xl shadow-3xl p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100 border-t-4 border-blue-600">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-3 sticky top-0 bg-white z-10">
          <h3 className="text-2xl font-extrabold text-gray-800 flex items-center">
            <span className="text-blue-600 mr-2">✏️</span> Edit Complaint
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Form Field: Name */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaUser /> Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter customer name"
              required
              // TEXT COLOR FIXED: Added text-gray-800
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 text-sm text-gray-800"
            />
          </div>
          
          {/* Form Field: Room Number */}
          <div>
            <label htmlFor="roomNumber" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaDoorClosed /> Room Number
            </label>
            <input
              id="roomNumber"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              placeholder="e.g., 101"
              required
              // TEXT COLOR FIXED: Added text-gray-800
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 text-sm text-gray-800"
            />
          </div>
          
          {/* Form Field: Block */}
          <div>
            <label htmlFor="block" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaBuilding /> Block
            </label>
            <input
              id="block"
              name="block"
              value={formData.block}
              onChange={handleChange}
              placeholder="e.g., A, B"
              required
              // TEXT COLOR FIXED: Added text-gray-800
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 text-sm text-gray-800"
            />
          </div>
          
          {/* Form Field: Type */}
          <div>
            <label htmlFor="type" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaTag /> Complaint Type
            </label>
            <input
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g., Plumbing, Electrical"
              required
              // TEXT COLOR FIXED: Added text-gray-800
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 text-sm text-gray-800"
            />
          </div>
          
          {/* Form Field: Description */}
          <div>
            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaFileAlt /> Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the issue..."
              required
              rows="3"
              // TEXT COLOR FIXED: Added text-gray-800
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition duration-150 text-sm text-gray-800"
            />
          </div>
          
          {/* Form Field: Status (Select) */}
          <div>
            <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaCheckCircle /> Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              // TEXT COLOR FIXED: Already had text-gray-800, but ensuring its presence
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none pr-10 text-gray-800 transition duration-150 text-sm"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4 pt-5">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 text-base"
            >
              💾 Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 px-4 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300 text-base"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditComplaintModal;