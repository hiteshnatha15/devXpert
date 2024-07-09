import React from "react";
import { useNavigate } from "react-router-dom";

const Statement = ({ problem }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{problem.title}</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(`/problem/${problem._id}`)}
        >
          Solve Problem
        </button>
      </div>
      <span className="text-gray-500">Difficulty: {problem.level}</span>
      <div className="w-screen border border-grey"></div>
    </div>
  );
};

export default Statement;
