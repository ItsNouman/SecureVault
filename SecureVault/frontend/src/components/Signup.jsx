import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (name && email && password) {
      localStorage.setItem("user", JSON.stringify({ name, email }));
      alert("Account Created! Please Sign In.");
      navigate("/");  // Redirect to Sign In page
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#2c3e50] to-[#4ca1af] items-center justify-center">
      {/* Background Section */}
      <div className="flex-1 p-12 text-white text-left flex flex-col justify-center">
        <h1 className="text-4xl mb-2">Secure Vault</h1>
        <p className="text-lg opacity-80">Join us to secure your documents</p>
      </div>

      {/* Sign Up Form Section */}
      <div className="flex-1 max-w-sm bg-white bg-opacity-30 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center">
        <form onSubmit={handleSignup}>
          <h2 className="text-2xl mb-5 text-white">Sign Up</h2>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-3 border-2 border-[#063665] rounded-md bg-opacity-20 text-white placeholder-opacity-70" 
            />
          </div>
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 border-2 border-[#063665] rounded-md bg-opacity-20 text-white placeholder-opacity-70" 
            />
          </div>
          <div className="mb-4">
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3 border-2 border-[#063665] rounded-md bg-opacity-20 text-white placeholder-opacity-70" 
            />
          </div>

          <button 
            className="w-full py-3 bg-gradient-to-r from-[#56ccf2] to-[#2f80ed] text-white rounded-md text-lg hover:scale-105 transition duration-300"
            type="submit"
            onClick={() => navigate("/Welcomepage")}
          >
            Sign Up
          </button>

          <div className="mt-3 text-white text-sm">
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
