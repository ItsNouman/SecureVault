import React, { useState, useEffect } from "react";
import {
    FaFilePdf, FaFileImage, FaFileAlt, FaFileVideo, FaFileAudio,
    FaTrash, FaCog, FaSignOutAlt, FaPlus, FaKey, FaIdCard, FaBell, FaShieldAlt
} from "react-icons/fa";
import { BsGrid, BsList } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
    const navigate = useNavigate();
    const [isGridView, setIsGridView] = useState(true);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [recentFiles, setRecentFiles] = useState([]); // New state for recent files
    const MAX_RECENT_FILES = 5; // Limit the number of recent files displayed

    const toggleView = (view) => {
        setIsGridView(view === 'grid');
    };

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files).map(file => ({
            name: file.name,
            type: getFileType(file.name),
            size: formatFileSize(file.size),
            time: 'Just now' // You might want to handle time more precisely
        }));
        setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);

        // Update recent files, ensuring newest are at the beginning and limiting the array size
        setRecentFiles(prevRecentFiles => [
            ...newFiles,
            ...prevRecentFiles.slice(0, MAX_RECENT_FILES - newFiles.length),
        ]);
    };

    const handleAddButtonClick = () => {
        document.getElementById('fileInput').click();
    };

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

    // Helper to format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white font-sans">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-[#111827] p-5 flex flex-col">
                <div>
                    <h1 className="text-2xl font-extrabold text-purple-400 mb-8">SecureVault</h1>
                    <nav className="space-y-4">
                        <div>
                            <button className="w-full text-left font-semibold hover:text-purple-400">All Files</button>
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

                <div className="space-y-4 mt-12">
                    <button onClick={() => { navigate('/settings'); } } className="flex items-center space-x-2 hover:text-purple-400"><FaCog /> <span>Settings</span></button>
                    <button className="flex items-center space-x-2 hover:text-purple-400"><FaTrash /> <span>Trash</span></button>
                    <button onClick={() => { navigate('/auth'); } } className="flex items-center space-x-2 hover:text-purple-400"><FaSignOutAlt /> <span>Logout</span></button>
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
                            className="rounded-lg px-4 py-2 bg-[#1f2937] text-white placeholder-gray-400 w-full sm:w-[650px] max-w-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Search files..." />
                        <button onClick={() => { navigate('/auth'); } } className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Login</button>
                    </div>
                </div>


                {/* Smart Reminders */}
                <div className="overflow-hidden w-full mb-10">
                    <motion.div
                        className="flex space-x-6 w-max"
                        animate={{ x: ["10%", "-60%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 10
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
                            {recentFiles.map((file, index) => (
                                <li key={index}>
                                    {file.type === "pdf" && <FaFilePdf className="inline text-red-400 mr-2" />}
                                    {file.type === "img" && <FaFileImage className="inline text-green-400 mr-2" />}
                                    {file.type === "doc" && <FaFileAlt className="inline text-blue-400 mr-2" />}
                                    {file.type === "xls" && <FaFileAlt className="inline text-green-400 mr-2" />}
                                    {file.type === "video" && <FaFileVideo className="inline text-orange-400 mr-2" />}
                                    {file.type === "code" && <FaFileAlt className="inline text-purple-400 mr-2" />}
                                    {file.type === "audio" && <FaFileAudio className="inline text-pink-400 mr-2" />}
                                    {!['pdf', 'img', 'doc', 'xls', 'video', 'code', 'audio'].includes(file.type) && <FaFileAlt className="inline text-gray-400 mr-2" />}
                                    {file.name} • {file.time}
                                </li>
                            ))}
                            {recentFiles.length === 0 && (
                                <li>No recent files uploaded.</li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Your Files */}
                <div className="bg-[#1e293b]/70 backdrop-blur-lg p-6 rounded-xl shadow-lg mb-24 border-2 border-dashed transition-all duration-300 border-gray-600">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Your Files</h3>
                        <div className="flex space-x-2">
                            <BsGrid onClick={() => toggleView('grid')} className={`text-xl cursor-pointer ${isGridView ? 'text-purple-400' : 'text-gray-400'}`} />
                            <BsList onClick={() => toggleView('list')} className={`text-xl cursor-pointer ${!isGridView ? 'text-purple-400' : 'text-gray-400'}`} />
                        </div>
                    </div>

                    {/* Conditionally Render Files Based on View */}
                    <div className={isGridView ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-sm" : "space-y-4"}>
                        {uploadedFiles.length === 0 && (
                            <p className="text-gray-400 col-span-full text-center">No files uploaded yet.</p>
                        )}
                        {uploadedFiles.map((file, idx) => (
                            <div key={idx} className={`bg-[#334155]/60 backdrop-blur-md p-4 rounded-xl ${isGridView ? "text-center" : "flex items-center space-x-4"}`}>
                                <div className="text-2xl mb-2">
                                    {file.type === "pdf" && <FaFilePdf className="text-red-400 mx-auto" />}
                                    {file.type === "img" && <FaFileImage className="text-green-400 mx-auto" />}
                                    {file.type === "doc" && <FaFileAlt className="text-blue-400 mx-auto" />}
                                    {file.type === "xls" && <FaFileAlt className="text-green-400 mx-auto" />}
                                    {file.type === "video" && <FaFileVideo className="text-orange-400 mx-auto" />}
                                    {file.type === "code" && <FaFileAlt className="text-purple-400 mx-auto" />}
                                    {file.type === "audio" && <FaFileAudio className="text-pink-400 mx-auto" />}
                                    {!['pdf', 'img', 'doc', 'xls', 'video', 'code', 'audio'].includes(file.type) && <FaFileAlt className="text-gray-400 mx-auto" />}
                                </div>
                                <div className={isGridView ? "text-center" : "flex flex-col"}>
                                    <p className="truncate">{file.name}</p>
                                    <p className="text-xs text-gray-400">{file.size} • {file.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hidden File Input */}
                <input
                    type="file"
                    id="fileInput"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                />

                {/* Floating Add Button */}
                <button onClick={handleAddButtonClick} className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 p-4 rounded-full shadow-xl text-white text-2xl transition-all duration-300">
                    <FaPlus />
                </button>
            </div>
        </div>
    );
}

export default Dashboard;