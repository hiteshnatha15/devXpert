import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";
import "monaco-editor/esm/vs/basic-languages/java/java.contribution";
import "monaco-editor/esm/vs/basic-languages/python/python.contribution";

const ProblemPage = () => {
  const { id } = useParams(); // Access the problem ID from the URL
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  // Fetch problem details based on ID
  useEffect(() => {
    async function fetchProblem() {
      try {
        const response = await axios.get(
          `http://localhost:4000/problem/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response.data.problem);
        setProblem(response.data.problem);
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    }

    if (!token) {
      navigate("/loginregister");
    } else {
      fetchProblem();
    }
  }, [id, token, navigate]);

  // Initialize Monaco Editor
  useEffect(() => {
    if (editorRef.current) {
      if (monacoRef.current) {
        monacoRef.current.dispose();
      }
      monacoRef.current = monaco.editor.create(editorRef.current, {
        value: getInitialCodeTemplate(language), // Set initial code template based on language
        language: language,
        theme: "vs-dark",
        suggest: {
          // Enable suggestions
          showMethods: true,
          showFunctions: true,
          showVariables: true,
          showClasses: true,
        },
      });
    }
    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose();
      }
    };
  }, [language, problem]);

  // Handle code submission
  const handleSubmit = async () => {
    const code = monacoRef.current.getValue();
    try {
      const response = await axios.post(
        "http://localhost:4000/execute",
        { id, code, language },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setOutput(response.data.output);
      console.log(response.data.output);
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code
        setOutput(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        // The request was made but no response was received
        setOutput("Error: No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an error
        setOutput(`Error: ${error.message}`);
      }
    }
  };

  // Helper function to get initial code template based on language
  const getInitialCodeTemplate = (language) => {
    const snippet = problem.codeSnippets.find(
      (snippet) => snippet.langSlug === language
    );
    return snippet ? snippet.code : `// Write your code here\n\n`;
  };

  // Render loading state while fetching problem details
  if (!problem) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  // Render problem details and code editor
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column for Problem Details */}
          <div className="col-span-2">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-4">{problem.title}</h2>
              <p className="text-lg mb-2">Difficulty: {problem.level}</p>
              <p className="text-gray-700 mb-4">{problem.content}</p>
              <div className="border-t border-gray-300 my-4"></div>
              <h3 className="text-xl font-bold mb-2">Examples:</h3>
              <div className="grid gap-6">
                {problem.testcases.map((example, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4"
                  >
                    <h4 className="text-lg font-bold mb-2">
                      Example {index + 1}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-bold">Input:</p>
                        <pre className="bg-gray-200 p-2 rounded-md">
                          {JSON.stringify(example.input, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <p className="font-bold">Output:</p>
                        <pre className="bg-gray-200 p-2 rounded-md">
                          {JSON.stringify(example.expectedOutput, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column for Code Editor */}
          <div className="col-span-1">
            <div className="mb-4">
              <label
                htmlFor="language"
                className="block text-lg font-medium text-gray-700"
              >
                Select Language:
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                {/* Add more languages as needed */}
              </select>
            </div>
            <div ref={editorRef} style={{ height: "500px", width: "100%" }} />
            <button
              onClick={handleSubmit}
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Code
            </button>
            {output && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-2">Output:</h3>
                <pre className="bg-gray-200 p-2 rounded-md">{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProblemPage;
