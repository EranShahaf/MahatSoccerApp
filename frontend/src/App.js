import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompetitionsCards from "./components/competitions/CompetitionsCards";
import SingleCompetitionPage from "./pages/SingleCompetitionPage";
import { Navbar } from "./components/Navbar";
import { TeamPage } from "./pages/TeamPage";
import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/Login/SignUp";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            exact
            path="/competetion/:code"
            element={
              <React.Fragment>
                <SingleCompetitionPage />
              </React.Fragment>
            }
          />
          <Route
            path="/signup"
            element={
              <React.Fragment>
                <SignupForm />
              </React.Fragment>
            }
          />
          <Route
            path="/login"
            element={
              <React.Fragment>
                <LoginForm />
              </React.Fragment>
            }
          />
          <Route
            path="/"
            element={
              <React.Fragment>
                <CompetitionsCards />
              </React.Fragment>
            }
          />
          <Route
            path="/team/:teamId"
            element={
              <React.Fragment>
                <TeamPage />
              </React.Fragment>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
