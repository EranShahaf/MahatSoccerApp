import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompetitionsCards from "./components/competitions/CompetitionsCards";
import SingleCompetitionPage from "./pages/SingleCompetitionPage";
import { Navbar } from "./components/Navbar";
import { TeamPage } from "./pages/TeamPage";
import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/Login/SignUp";
import HomePage from "./pages/HomePage";
import Newsletter from "./pages/Newsletter";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/competetions/:code" element={<SingleCompetitionPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/competetions" element={<CompetitionsCards />} />
          <Route path="/team/:teamId" element={<TeamPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
