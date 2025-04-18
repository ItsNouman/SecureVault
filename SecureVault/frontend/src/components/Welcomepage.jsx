import React from 'react';
import { Link } from 'react-router-dom';
import robotImg from '../assets/header_img.png'; 


const Welcomepage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4">
      <h1 className="absolute top-6 left-8 text-3xl font-bold text-indigo-600">SecureVault</h1>

      <img
        src={robotImg}
        alt="SecureVault bot"
        className="w-28 md:w-36 mb-4"
      />

      <p className="text-lg md:text-xl font-medium mb-1">
        Hey <span className="text-indigo-600 font-bold">User</span> 👋
      </p>
      <h2 className="text-xl md:text-2xl font-semibold mb-2">Welcome to SecureVault</h2>
      <p className="max-w-md text-sm md:text-base text-gray-700 mb-6">
        Your digital safety starts here! Let's begin with a quick overview to keep your documents secure and accessible anywhere, anytime.
      </p>

      <Link to="/Dashboard">
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full text-sm md:text-base transition-all shadow-md">Get Started</button>
      </Link>


    </div>
  );
};

export default Welcomepage;
