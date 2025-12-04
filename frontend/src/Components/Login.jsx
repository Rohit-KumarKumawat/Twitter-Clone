import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import xLogo from "../assets/logowhite.png";
import gLogo from "./../assets/googlelogo.png";
import aLogo from "./../assets/applelogo.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    if (!email || !password) return setError("All fields are required");
    if (!validateEmail(email)) return setError("Invalid email format");

    try {
      const res = await loginUser(formData).unwrap();
      dispatch(setUser(res.user));

      navigate("/home"); // route after login success
      alert("User Login Successfully!!");
    } catch (err) {
      console.log("Login error:", err);
      setError(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-black text-white w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex justify-center mb-6 relative">
          <button
            onClick={() => navigate("/")}
            className="absolute left-0 text-2xl font-bold"
          >
            ×
          </button>
          <img src={xLogo} alt="X logo" className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Sign in to X
        </h1>

        {/* Google / Apple Buttons */}
        <button className="w-full bg-white text-black font-semibold py-2.5 px-4 rounded-full mb-4 flex items-center justify-center gap-2 text-sm hover:bg-gray-100 transition">
          <span className="bg-purple-500 w-6 h-6 text-white rounded-full text-xs font-bold flex items-center justify-center">
            R
          </span>
          <span>Sign in as Rohit</span>
          <img src={gLogo} alt="Google" className="w-4 h-4 ml-auto" />
        </button>

        <button className="w-full bg-white text-black font-semibold py-2.5 px-4 rounded-full mb-4 flex items-center justify-center gap-2 text-sm hover:bg-gray-100 transition">
          <img src={aLogo} alt="Apple" className="w-4 h-4" />
          <span>Sign in with Apple</span>
        </button>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <hr className="flex-1 border-gray-700" />
          <span>or</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Phone, email, or username"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded px-4 py-2.5 text-white mb-3 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded px-4 py-2.5 text-white mb-5 focus:outline-none focus:ring-2 focus:ring-white"
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black font-bold py-2.5 rounded-full mb-4 hover:bg-gray-200 transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button className="w-full border border-gray-600 text-white font-bold py-2.5 rounded-full hover:bg-white hover:text-black transition">
          Forgot password?
        </button>

        <div className="text-sm text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-400 hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
