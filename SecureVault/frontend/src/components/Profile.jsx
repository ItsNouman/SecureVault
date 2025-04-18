import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, ShieldCheck, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate=useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 font-sans"
    >
        {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-4 transition duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <img src={avatar} alt="Profile" className="w-24 h-24 rounded-full shadow-lg object-cover" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
            <p className="text-sm text-gray-500">john.doe@example.com</p>
            <p className="text-xs text-purple-500 mt-1">Vault ID: #123456</p>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl">
              <input type="text" value="John Doe" readOnly className="bg-transparent outline-none flex-1 text-gray-800" />
              <Pencil size={16} className="text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl">
              <input type="email" value="john.doe@example.com" readOnly className="bg-transparent outline-none flex-1 text-gray-800" />
              <Pencil size={16} className="text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl">
              <input type="text" value="+1 234 567 8901" readOnly className="bg-transparent outline-none flex-1 text-gray-800" />
              <Pencil size={16} className="text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Location</label>
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl">
              <input type="text" value="San Francisco, CA" readOnly className="bg-transparent outline-none flex-1 text-gray-800" />
              <Pencil size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-100 rounded-2xl p-6 shadow-inner">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-purple-600" /> Security Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow hover:shadow-md transition">
              <Lock className="text-blue-500" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Change Password</p>
                <p className="text-xs text-gray-500">Update your login password securely</p>
              </div>
              <Pencil size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow hover:shadow-md transition">
              <ShieldCheck className="text-green-500" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">2FA Authentication</p>
                <p className="text-xs text-gray-500">Enable Two-Factor Authentication</p>
              </div>
              <Pencil size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
