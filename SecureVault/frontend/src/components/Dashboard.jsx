import React, { useState ,useCallback} from "react";
import {
  FaFilePdf, FaFileImage, FaFileAlt, FaFileVideo, FaFileAudio,
  FaTrash, FaCog, FaSignOutAlt, FaPlus, FaKey, FaIdCard, FaBell, FaShieldAlt
} from "react-icons/fa";
import { BsGrid, BsList } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";


const Dashboard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const [uploadedFiles, setUploadedFiles] = useState([]);

const onDrop = useCallback((acceptedFiles) => {
  const newFiles = acceptedFiles.map(file => ({
    name: file.name,
    size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
    time: 'Just now',
    type: getFileType(file.name)
  }));
  setUploadedFiles(prev => [...prev, ...newFiles]);
}, []);

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

// Helper to identify file type
const getFileType = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'pdf';
  if (['jpg', 'jpeg', 'png'].includes(ext)) return 'img';
  if (['doc', 'docx'].includes(ext)) return 'doc';
  if (['xls', 'xlsx'].includes(ext)) return 'xls';
  if (['mp4', 'mkv'].includes(ext)) return 'video';
  if (['js', 'py', 'java', 'cpp'].includes(ext)) return 'code';
  if (['mp3', 'wav'].includes(ext)) return 'audio';
  return 'doc';
};

  

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-[#4c7f9e] via-[#3a6f83] to-[#2c4b58] text-white font-sans">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-[#111827] p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-purple-400 mb-8">SecureVault</h1>
          <nav className="space-y-4">
            <div>
              <button className="w-full text-left font-semibold hover:text-purple-400">Dashboard</button>
              <button className="w-full text-left mt-2 hover:text-purple-400">All Files</button>
              <button className="w-full text-left mt-2 hover:text-purple-400">Favorites</button>
            </div>

            <div className="mt-6">
              <h2 className="text-sm text-gray-400 uppercase mb-2">Categories</h2>
              <ul className="space-y-2">
                <li><FaFileAlt className="inline mr-2" /> Documents</li>
                <li><FaFileImage className="inline mr-2" /> Images</li>
                <li><FaFileVideo className="inline mr-2" /> Videos</li>
                <li><FaFileAudio className="inline mr-2" /> Audio</li>
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-sm text-gray-400 uppercase mb-2">Storage</h2>
              <ul>
                <li className="mt-2">Storage Overview</li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="space-y-4">
          <button className="flex items-center space-x-2 hover:text-purple-400"><FaCog /> <span>Settings</span></button>
          <button className="flex items-center space-x-2 hover:text-purple-400"><FaTrash /> <span>Trash</span></button>
          <button className="flex items-center space-x-2 hover:text-purple-400"><FaSignOutAlt /> <span>Logout</span></button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-transparent">
        {/* Top Bar */}
        <div className="relative flex flex-col sm:flex-row justify-between items-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-4 sm:mb-0">
            Welcome to SecureVault
          </h2>
          <div className="flex w-full sm:w-auto gap-2 items-center">
            <input
              className="rounded-lg px-4 py-2 bg-[#1f2937] text-white placeholder-gray-400 w-full sm:w-[250px] focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search files..."
            />
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Login</button>
          </div>
        </div>


        {/* Smart Reminders - Horizontal Scroll Glass Cards with Infinite Motion */}
        <div className="overflow-hidden w-full mb-10">
          <motion.div
            className="flex space-x-6 w-max"
            animate={{ x: ["0%", "-60%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30
            }}
          >
            {[
              { icon: <FaKey />, title: "Password Renewal", text: "Your password expires in 3 days." },
              { icon: <FaIdCard />, title: "License Expiry", text: "Driving license expires next week." },
              { icon: <FaBell />, title: "Subscription Alert", text: "Antivirus plan ends in 2 days." },
              { icon: <FaShieldAlt />, title: "Security Check", text: "Schedule your monthly security scan." },
              { icon: <FaBell />, title: "2FA Reminder", text: "Re-enable two-factor authentication." },
            ].map((reminder, i) => (
              <div
                key={i}
                className="min-w-[250px] backdrop-blur-xl bg-gradient-to-br from-slate-700/60 to-indigo-900/50 border border-white/10 p-5 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-3xl mb-2 text-purple-300">{reminder.icon}</div>
                <h4 className="text-lg font-semibold mb-1">{reminder.title}</h4>
                <p className="text-sm text-gray-300">{reminder.text}</p>
              </div>
            ))}
          </motion.div>
        </div>


        {/* Storage Overview + Recent Files */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Storage Overview */}
          <div className="bg-[#1e293b]/70 backdrop-blur-lg p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Storage Overview</h3>
            <div className="mb-4 text-sm text-gray-400">Total Usage</div>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 w-[65%]"></div>
            </div>
            <p className="text-right text-sm text-gray-400 mb-4">65% of 10 GB</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><FaFileAlt className="inline mr-2 text-blue-400" />Documents: 3.0 GB</div>
              <div><FaFileImage className="inline mr-2 text-green-400" />Images: 2.0 GB</div>
              <div><FaFileVideo className="inline mr-2 text-purple-400" />Videos: 1.0 GB</div>
              <div><FaFileAlt className="inline mr-2 text-orange-400" />Others: 0.5 GB</div>
            </div>
          </div>

          {/* Recent Files */}
          <div className="bg-[#1e293b]/70 backdrop-blur-lg p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Recent Files</h3>
              <button className="text-purple-400 text-sm hover:underline">View All</button>
            </div>
            <ul className="space-y-3 text-sm">
              <li><FaFilePdf className="inline text-red-400 mr-2" />Financial_Report_2025.pdf • 2h ago</li>
              <li><FaFilePdf className="inline text-red-400 mr-2" />Project_Presentation.pdf • 8h ago</li>
              <li><FaFileImage className="inline text-green-400 mr-2" />Profile_Picture.jpg • Yesterday</li>
              <li><FaFileAlt className="inline text-green-400 mr-2" />Data_Analysis.xlsx • 2d ago</li>
              <li><FaFileAlt className="inline text-purple-400 mr-2" />main.js • 3d ago</li>
            </ul>
          </div>
        </div>

        {/* Your Files */}
        <div
            {...getRootProps()}
            className={`bg-[#1e293b]/70 backdrop-blur-lg p-6 rounded-xl shadow-lg mb-24 border-2 border-dashed transition-all duration-300 ${
              isDragActive ? 'border-purple-500 bg-[#334155]/80' : 'border-gray-600'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Your Files</h3>
              <div className="flex space-x-2">
                <BsGrid className="text-xl cursor-pointer" />
                <BsList className="text-xl cursor-pointer" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
              {[ 
                // Original files
                { name: "Report Q1.pdf", type: "pdf", size: "2.4 MB", time: "2d ago" },
                { name: "Financial Statement.xlsx", type: "xls", size: "3.1 MB", time: "1w ago" },
                { name: "Profile Photo.jpg", type: "img", size: "1.8 MB", time: "3d ago" },
                { name: "Project Presentation.pdf", type: "pdf", size: "8.2 MB", time: "1d ago" },
                { name: "Meeting Notes.doc", type: "doc", size: "542 KB", time: "5h ago" },
                { name: "Holiday Video.mp4", type: "video", size: "24.5 MB", time: "2w ago" },
                { name: "App.js", type: "code", size: "32 KB", time: "4d ago" },
                { name: "Lecture Recording.mp3", type: "audio", size: "18.2 MB", time: "3w ago" },
                // Uploaded files
                ...uploadedFiles
              ].map((file, idx) => (
                <div key={idx} className="bg-[#334155]/60 backdrop-blur-md p-4 rounded-xl text-center hover:bg-[#475569]/70 transition">
                  <div className="text-2xl mb-2">
                    {file.type === "pdf" && <FaFilePdf className="text-red-400 mx-auto" />}
                    {file.type === "img" && <FaFileImage className="text-green-400 mx-auto" />}
                    {file.type === "doc" && <FaFileAlt className="text-blue-400 mx-auto" />}
                    {file.type === "xls" && <FaFileAlt className="text-green-400 mx-auto" />}
                    {file.type === "video" && <FaFileVideo className="text-orange-400 mx-auto" />}
                    {file.type === "code" && <FaFileAlt className="text-purple-400 mx-auto" />}
                    {file.type === "audio" && <FaFileAudio className="text-pink-400 mx-auto" />}
                  </div>
                  <p className="truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{file.size} • {file.time}</p>
                </div>
              ))}
            </div>
          </div>


        {/* Floating Add Button */}
        <button className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 p-4 rounded-full shadow-xl text-white text-2xl transition-all duration-300">
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
