import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Problem from "./pages/Problem";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginregister" element={<LoginRegister />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/problem/:id" element={<Problem />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
