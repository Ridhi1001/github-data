import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import RepositoryList from "./components/RepositoryList";
import RepositoryDetails from "./components/RepositoryDetails";
import FollowersList from "./components/FollowersList";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repositories/:username" element={<RepositoryList />} />
          <Route path="/repository/:username/:repoName" element={<RepositoryDetails />} />
          <Route path="/followers/:username" element={<FollowersList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
