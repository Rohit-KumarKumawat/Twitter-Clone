import React from "react";
import { useNavigate } from "react-router-dom";
import xLogo from "./../assets/logowhite.png";
import gLogo from "./../assets/googlelogo.png";
import aLogo from "./../assets/applelogo.png";

const Start = () => {
  const navigate = useNavigate();
  const handleCreateAccount = () => {
    navigate("/register"); //
  };
  const handleSignIN = () => {
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-md p-6 flex flex-col items-center">
        <img src={xLogo} alt="X" className="w-8 h-8 mt-4 mb-6" />
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create an account
        </h1>
        <button className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-gray-200 mb-3">
          <img src={gLogo} alt="Google" className="w-5 h-5" />
          Sign up as Rohit
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-gray-200 mb-4">
          <img src={aLogo} alt="Apple" className="w-5 h-5" />
          Sign up with Apple
        </button>

        <div className="flex items-center w-full mb-4">
          <div className="flex-grow h-px bg-gray-600" />
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-600" />
        </div>

        <button
          onClick={handleCreateAccount}
          className="w-full bg-white text-black font-bold py-2 rounded-full hover:bg-gray-200 mb-6"
        >
          Create account
        </button>

        <p className="text-xs text-center text-gray-500 px-2 mb-8">
          By signing up, you agree to the{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Privacy Policy
          </span>
          , including{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Cookie Use
          </span>
          .
        </p>

        <div className="text-sm font-semibold mb-2">
          Already have an account?
        </div>
        <a
          href="#"
          className="text-blue-500 hover:underline font-semibold w-full "
        >
          <button
            onClick={handleSignIN}
            className="w-full bg-white font-bold py-2 rounded-full hover:bg-gray-200 mb-6"
          >
            SignIn
          </button>
        </a>

        <div className="mt-12 text-[11px] text-gray-500 flex flex-wrap justify-center gap-x-3 gap-y-1 text-center">
          {[
            "About",
            "Get the X app",
            "Get the Grok app",
            "Careers",
            "Terms of Service",
            "Privacy Policy",
            "Cookie Policy",
            "Developers",
            "Advertising",
            "Settings",
          ].map((item, idx) => (
            <a key={idx} href="#" className="hover:underline">
              {item}
            </a>
          ))}
          <span>© 2025 X Corp.</span>
        </div>
      </div>
    </div>
  );
};

export default Start;
