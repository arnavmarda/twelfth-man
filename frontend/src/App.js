import Home from "./Home";
import UserPage from "./UserPage";
import TournamentPage from "./TournamentPage";
import TeamPage from "./TeamPage";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/user" element={<UserPage />} />
          <Route path="/tournament" element={<TournamentPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App;
