import React, { useContext, useState } from "react";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Auth = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { backend_url, setIsLoggedIn } = useContext(AppContent);

  axios.defaults.withCredentials = true;

  // 1. Main submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state === "Sign Up") {
      await handleSignUp();
    } else {
      await handleSignIn();
    }
  };

  // 2. Handle Sign Up
  const handleSignUp = async () => {
    try {
      const { data } = await axios.post(`${backend_url}/api/auth/register`, {
        name:name,
        email:email,
        password:password,
      });

      if (data.success) {
        toast.success("Registered successfully! Please login.");
        resetForm();
        setState("Sign In");
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error registering user.");
    }
  };

  // 3. Handle Sign In
  const handleSignIn = async () => {
    try {
      const { data } = await axios.post(`${backend_url}/api/auth/login`, {
        email:email,
        password:password,
      });

      if (data.success) {
        setIsLoggedIn(true);
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error logging in.");
    }
  };

  // 4. Reset input fields
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#2c3e50] to-[#4ca1af] items-center justify-center">
      {/* Background */}
      <div className="flex-1 p-12 text-white text-left flex flex-col justify-center">
        <h1 onClick={() => navigate("/")} className="text-4xl mb-2 cursor-pointer">
          Secure Vault
        </h1>
        <p className="text-lg opacity-80">The Safest Place for your Documents</p>
      </div>

      {/* Form Section */}
      <div className="flex-1 max-w-sm bg-white bg-opacity-30 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl mb-5 text-white">{state}</h2>

          {state === "Sign Up" && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border-2 border-[#063665] rounded-md bg-opacity-20 text-black placeholder-opacity-70"
              />
            </div>
          )}

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-[#063665] rounded-md bg-opacity-20 text-black placeholder-opacity-70"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-[#063665] rounded-md bg-opacity-20 text-black placeholder-opacity-70"
            />
          </div>

          <div className="flex justify-end mb-4">
            <span
              className="text-sm text-white cursor-pointer hover:underline"
              onClick={() => navigate("/resetpassword")}
            >
              Forgot Password?
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-5 text-white">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-sm">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#56ccf2] to-[#2f80ed] text-white rounded-md text-lg hover:scale-105 transition duration-300"
          >
            {state}
          </button>

          <div className="mt-4 text-white text-sm">
            {state === "Sign Up" ? (
              <p>
                Already have an account?{" "}
                <span
                  className="text-[#ffcc00] cursor-pointer hover:underline"
                  onClick={() => setState("Sign In")}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don’t have an account?{" "}
                <span
                  className="text-[#ffcc00] cursor-pointer hover:underline"
                  onClick={() => setState("Sign Up")}
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>

          <div className="mt-6">
            <p className="text-white">Login with social</p>
            <div className="flex justify-center gap-6 mt-4">
              <FaFacebookF className="text-2xl cursor-pointer hover:scale-110 transition duration-300" />
              <FaTwitter className="text-2xl cursor-pointer hover:scale-110 transition duration-300" />
              <FaGoogle className="text-2xl cursor-pointer hover:scale-110 transition duration-300" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
