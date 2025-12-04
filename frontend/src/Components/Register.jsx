import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import xLogo from "../assets/logowhite.png";
import { useSignUpUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [signUpUser] = useSignUpUserMutation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    dob: { month: "", day: "", year: "" },
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "What's your name?";
    if (!form.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Enter a valid email";
    if (!form.username.trim()) newErrors.username = "Enter a username";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!form.dob.month || !form.dob.day || !form.dob.year)
      newErrors.dob = "Complete your birth date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      const res = await signUpUser(form).unwrap();
      dispatch(setUser(res.user)); 
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-black/80 text-white w-full max-w-xl rounded-xl p-6 sm:p-10">
        {/* Header */}
        <button onClick={() => navigate("/")} className="text-xl">
          ✕
        </button>
        <div className="flex justify-center items-center mb-4">
          <img src={xLogo} alt="X" className="w-10 h-10" />
          <span className="w-6" />
        </div>

        <h1 className="text-3xl font-bold mb-6">Create your account</h1>
        <form action="" onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full bg-neutral-900 border rounded p-3 text-white focus:outline-none ${
              errors.name
                ? "border-red-500"
                : "border-neutral-700 focus:ring-1 focus:ring-blue-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className={`w-full mt-4 bg-neutral-900 border rounded p-3 text-white focus:outline-none ${
              errors.username
                ? "border-red-500"
                : "border-neutral-700 focus:ring-1 focus:ring-blue-500"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full mt-4 bg-neutral-900 border rounded p-3 text-white focus:outline-none ${
              errors.email
                ? "border-red-500"
                : "border-neutral-700 focus:ring-1 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={`w-full mt-4 bg-neutral-900 border rounded p-3 text-white focus:outline-none ${
              errors.password
                ? "border-red-500"
                : "border-neutral-700 focus:ring-1 focus:ring-blue-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          {/* DOB */}
          <div className="mt-4">
            <p className="font-bold">Date of birth</p>
            <p className="text-sm text-gray-400">
              This won’t be shown publicly. Confirm your own age.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <select
                value={form.dob.month}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dob: { ...form.dob, month: e.target.value },
                  })
                }
                className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-3 text-white"
              >
                <option value="">Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={form.dob.day}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dob: { ...form.dob, day: e.target.value },
                  })
                }
                className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-3 text-white"
              >
                <option value="">Day</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select
                value={form.dob.year}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dob: { ...form.dob, year: e.target.value },
                  })
                }
                className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-3 text-white"
              >
                <option value="">Year</option>
                {[...Array(126)].map((_, i) => {
                  const year = 2025 - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-white text-black font-bold py-3 rounded-full hover:bg-gray-100 transition"
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
