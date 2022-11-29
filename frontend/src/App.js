import Home from "./Home";
import UserPage from "./UserPage";
import TournamentPage from "./TournamentPage";
import TeamPage from "./TeamPage";
import UserRegistration from "./UserRegistration";
import LoginPage from "./Login";
import MatchPage from "./MatchPage";
import ScoringPage from "./ScoringPage";
import NotFound from "./NotFound";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TeamCreation from "./TeamCreation";
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
          <Route path="/registration" element={<UserRegistration />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/TeamCreation" element={<TeamCreation />} />
          <Route path="/scoring" element={<ScoringPage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App;
