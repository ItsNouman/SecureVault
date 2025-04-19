import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserCircle, FaBell, FaLock, FaPalette, FaLanguage } from 'react-icons/fa';

function SettingsPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('john.doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [newUsername, setNewUsername] = useState('john.doe');
    const [newEmail, setNewEmail] = useState('john.doe@example.com');
    const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);
    const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('dark');
    const [selectedLanguage, setSelectedLanguage] = useState('english');
    const [isChangingLanguage, setIsChangingLanguage] = useState(false);
    const [availableLanguages] = useState(['english', 'tamil', 'hindi']); // Example languages

    const handleGoBack = () => {
        navigate('/dashboard');
    };

    // Profile Editing
    const handleEditProfile = () => {
        setIsEditingProfile(true);
        setNewUsername(username);
        setNewEmail(email);
    };

    const handleSaveProfile = () => {
        // In a real application, you would send this data to a server
        setUsername(newUsername);
        setEmail(newEmail);
        setIsEditingProfile(false);
        alert('Profile updated!');
    };

    const handleCancelEditProfile = () => {
        setIsEditingProfile(false);
    };

    // Notification Toggles
    const handlePushNotificationsChange = (event) => {
        setPushNotificationsEnabled(event.target.checked);
        // In a real application, you would save this preference
        console.log('Push Notifications:', event.target.checked);
    };

    const handleEmailNotificationsChange = (event) => {
        setEmailNotificationsEnabled(event.target.checked);
        // In a real application, you would save this preference
        console.log('Email Notifications:', event.target.checked);
    };

    // Password Change
    const handleChangePassword = () => {
        setIsChangingPassword(true);
    };

    const handleSavePassword = () => {
        if (newPassword === confirmNewPassword) {
            // In a real application, you would send the current and new password to a server for verification and update
            alert('Password updated successfully!');
            setIsChangingPassword(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } else {
            alert('New password and confirmation do not match.');
        }
    };

    const handleCancelChangePassword = () => {
        setIsChangingPassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };


    // Language Change
    const handleChangeLanguage = () => {
        setIsChangingLanguage(true);
    };

    const handleSelectLanguage = (event) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);
        setIsChangingLanguage(false);
        // In a real application, you would apply the language and save the preference
        console.log('Language selected:', newLanguage);
        // Example: i18n.changeLanguage(newLanguage);
        // Example: localStorage.setItem('language', newLanguage);
    };

    const handleCancelChangeLanguage = () => {
        setIsChangingLanguage(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="mb-6">
                <button onClick={handleGoBack} className="flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200">
                    <FaArrowLeft className="mr-2" /> Back to Dashboard
                </button>
            </div>

            <div className="bg-[#1e293b]/70 backdrop-blur-lg rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-purple-400">Settings</h2>

                {/* User Profile Section */}
                <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-300 flex items-center"><FaUserCircle className="mr-2 text-purple-300" /> Profile</h3>
                    {isEditingProfile ? (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="newUsername" className="block text-sm font-medium text-gray-300">New Username</label>
                                <input type="text" id="newUsername" className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-800 text-white" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="newEmail" className="block text-sm font-medium text-gray-300">New Email</label>
                                <input type="email" id="newEmail" className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-800 text-white" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={handleSaveProfile} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors duration-200">Save</button>
                                <button onClick={handleCancelEditProfile} className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors duration-200">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2 sm:space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Username</span>
                                <span className="text-gray-400">{username}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Email</span>
                                <span className="text-gray-400">{email}</span>
                            </div>
                            <button onClick={handleEditProfile} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors duration-200">Edit Profile</button>
                        </div>
                    )}
                </div>

                {/* Notifications Section */}
                <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-300 flex items-center"><FaBell className="mr-2 text-yellow-300" /> Notifications</h3>
                    <div className="space-y-2 sm:space-y-4">
                        <div className="flex justify-between items-center">
                            <span>Push Notifications</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" checked={pushNotificationsEnabled} onChange={handlePushNotificationsChange} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-purple-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-purple-600 transition-all duration-200"></div>
                                <span className="ml-3 text-sm font-medium text-gray-300 dark:text-gray-500"></span>
                            </label>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Email Notifications</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" checked={emailNotificationsEnabled} onChange={handleEmailNotificationsChange} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-purple-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-purple-600 transition-all duration-200"></div>
                                <span className="ml-3 text-sm font-medium text-gray-300 dark:text-gray-500"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-300 flex items-center"><FaLock className="mr-2 text-red-400" /> Security</h3>
                    {isChangingPassword ? (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300">Current Password</label>
                                <input type="password" id="currentPassword" className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-800 text-white" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">New Password</label>
                                <input type="password" id="newPassword" className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-800 text-white" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-300">Confirm New Password</label>
                                <input type="password" id="confirmNewPassword" className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-800 text-white" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={handleSavePassword} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors duration-200">Save Password</button>
                                <button onClick={handleCancelChangePassword} className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors duration-200">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2 sm:space-y-4">
                            <button onClick={handleChangePassword} className="w-full sm:w-auto text-left py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200">Change Password</button>
                            <button className="w-full sm:w-auto text-left py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200">Two-Factor Authentication <span className="text-green-400">(Enabled)</span></button>
                        </div>
                    )}
                </div>

                {/* Language Section */}
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-300 flex items-center"><FaLanguage className="mr-2 text-teal-300" /> Language</h3>
                    {isChangingLanguage ? (
                        <div className="mt-2">
                            <select
                                className="w-full sm:w-auto bg-gray-700 text-white rounded-md py-1 px-2 focus:outline-none"
                                value={selectedLanguage}
                                onChange={handleSelectLanguage}
                            >
                                {availableLanguages.map((lang) => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>
                            <button onClick={handleCancelChangeLanguage} className="mt-2 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors duration-200">Cancel</button>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <span>Current Language</span>
                            <span className="text-gray-400">{selectedLanguage}</span>
                            <button onClick={handleChangeLanguage} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md mt-4 sm:mt-0 transition-colors duration-200">Change Language</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;