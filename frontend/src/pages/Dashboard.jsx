import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  async function getData() {
    const response = await axios.get("http://localhost:4000/dashboard", {
      headers: {
        Authorization: token,
      },
    });
    setName(response.data.name);
    setEmail(response.data.email);
  }
  useEffect(() => {
    getData();
    if (!token) {
      return navigate("/loginregister");
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Welcome, {name}!
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{email}</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    User Profile
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    Edit your profile information.
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Coding Challenges
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    Explore and solve coding challenges.
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Leaderboard
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    See how you rank among other users.
                  </dd>
                </div>
                {/* Add more sections as needed */}
              </dl>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
