import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authSlice, { setToken } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";

const LoginRegister = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function signinHandler(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          const token = await user.getIdToken();
          await axios.post(
            "http://localhost:4000/api/auth/google",
            {
              uid: user.uid,
              email: user.email,
              name: user.displayName,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          localStorage.setItem("token", token);
          localStorage.setItem("loggedIn", true);
          dispatch(setToken(token));
          toast.success("Signed in successfully");
          navigate("/dashboard");
        } else {
          toast.error("Please verify your email before signing in");
          auth.signOut();
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }

  async function signupHandler(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await updateProfile(user, { displayName: name });
          sendEmailVerification(user)
            .then(() => {
              toast.success("Verification email sent");
            })
            .catch((error) => {
              toast.error("Failed to send verification email");
              console.log(error.message);
            });
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setIsSignIn(true);
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          auth.signOut();
        });
    } else {
      toast.error("Passwords do not match");
      auth.signOut();
    }
  }

  async function signInWithGoogle(event) {
    try {
      event.preventDefault();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      dispatch(setToken(token));
      await axios.post(
        "http://localhost:4000/api/auth/google",
        {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      localStorage.setItem("loggedIn", true);
      toast.success("Signed in successfully");
      navigate("/dashboard");
    } catch (error) {
      auth.signOut();
      console.error("Error signing in:", error);
    }
  }

  return (
    <div>
      <div
        key={isSignIn ? "signIn" : "signUp"}
        className="flex justify-center items-center h-screen bg-gray-100"
      >
        <div className="bg-white p-8 rounded shadow w-7/12">
          <h2 className="text-3xl font-bold mb-6">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>
          <form required>
            <div className="mb-6">
              {!isSignIn && (
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-lg font-bold mb-2"
                    htmlFor="confirmPassword"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    required
                    type="name"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isSignIn && (
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            {isSignIn && (
              <div className="mb-6">
                <button
                  className="text-blue-500 hover:text-blue-800"
                  onClick={() => navigate("/forgotpassword")}
                >
                  Forgot Password?
                </button>
              </div>
            )}
            <div className="flex items-center justify-between">
              {isSignIn ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={signinHandler}
                >
                  Sign in
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={signupHandler}
                >
                  Sign up
                </button>
              )}
              <button
                className="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn ? "Create an account" : "Already have an account?"}
              </button>
            </div>
            <div className="mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                onClick={signInWithGoogle}
              >
                Sign in with Google
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-sm mt-6">
            &copy; 2024 My Website. All rights reserved.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LoginRegister;
