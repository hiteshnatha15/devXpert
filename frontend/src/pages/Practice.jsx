import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Statement from "../components/Statement";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Practice = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const token = useSelector((state) => state.auth.token);
  async function getData() {
    const response = await axios.get("http://localhost:4000/practice", {
      headers: {
        Authorization: token,
      },
    });
    setProblems(response.data.problems);
  }
  useEffect(() => {
    if (!token) {
      return navigate("/loginregister");
    }
    getData();
  }, []);
  return (
    <div>
      <Header />
      {problems.map((problem) => (
        <Statement key={problem._id} problem={problem} />
      ))}
      <Footer />
    </div>
  );
};

export default Practice;
