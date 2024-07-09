// Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import toast from "react-hot-toast";
function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token"); // Remove token from localStorage
      localStorage.setItem("loggedIn", false); // Set loggedIn flag to false
      localStorage.removeItem("loggedIn"); // Remove loggedIn flag
      auth.signOut(); // Sign out from Firebase
      navigate("/"); // Redirect to home page
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out", error);
    }
  };

  const loggedIn = localStorage.getItem("loggedIn");

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">DevXpert</div>
        <nav>
          <ul className="flex space-x-4">
            {loggedIn ? (
              <>
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/practice" className="hover:underline">
                    Practice
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:underline cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/loginregister" className="hover:underline">
                    Login/Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
