import Home from "./Home";
import UserPage from "./UserPage";
import TournamentPage from "./TournamentPage";
import TeamPage from "./TeamPage";
import UserRegistration from "./UserRegistration";
import LoginPage from "./Login";
import MatchPage from "./MatchPage";
import ScoringPage from "./ScoringPage";
import CreateMatch from "./MatchCreation";
// import NotFound from "./NotFound";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TeamCreation from "./TeamCreation";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TournamentCreation from "./TournamentCreation.js";

function App() {

  const [playerIds, setPlayerIds] = useState([]);
  const [teamNames, setTeamNames] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:9000/userList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => res.json())
    .then((data) => {
      let idsArray = data.map((user) => user.id);
      setPlayerIds(idsArray); 
    })
    .catch((err) => console.log(err));

    fetch("http://localhost:9000/teamList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => res.json())
    .then((data) => {
      let teamsArray = data.map((team) => team.name);
      setTeamNames(teamsArray); 
    })
    .catch((err) => console.log(err))


  }, []);

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          {playerIds.map((playerId) => (<Route path={`/user-${playerId}`} element={<UserPage player={playerId}/>} />))}
          <Route path="/tournament" element={<TournamentPage />} />
          {teamNames.map((team) => (<Route path={`/user-${team}`} element={<TeamPage teamName={team}/>} />))}
          <Route path="/signup" element={<UserRegistration />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createteam" element={<TeamCreation />} />
          <Route path="/createtournament" element={<TournamentCreation />} />
          <Route path="/scoring" element={<ScoringPage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/creatematch" element={<CreateMatch />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App;
