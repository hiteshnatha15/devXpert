import React, { useState } from "react";
import { auth } from "../firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      // User exists, proceed with sending reset link
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Password reset email sent!");
          navigate("/loginregister");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="w-64">
        {" "}
        <label htmlFor="email" className="block mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="border border-gray-300 rounded px-4 py-2 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Reset Password
        </button>
        <div className="mb-6 mt-3">
          <button
            className="text-blue-500 hover:text-blue-800"
            onClick={() => navigate("/loginregister")}
          >
            Go back to login
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
