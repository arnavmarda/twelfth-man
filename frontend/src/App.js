import Home from "./Home";
import UserPage from "./UserPage";
import TournamentPage from "./TournamentPage";
import TeamPage from "./TeamPage";
import UserRegistration from "./UserRegistration";
import LoginPage from "./Login";
import MatchPage from "./MatchPage";
import ScoringPage from "./ScoringPage";
import NotFound from "./NotFound";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TeamCreation from "./TeamCreation";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TournamentCreation from "./TournamentCreation.js";

function App() {

  const [playerIds, setPlayerIds] = useState([]);
  
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
    .catch((err) => console.log(err))
  });

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          {playerIds.map((playerId) => (<Route path={`/user-${playerId}`} element={<UserPage player={playerId}/>} />))}
          <Route path="/tournament" element={<TournamentPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/signup" element={<UserRegistration />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createteam" element={<TeamCreation />} />
          <Route path="/createtournament" element={<TournamentCreation />} />
          <Route path="/scoring" element={<ScoringPage />} />
          <Route path="/match" element={<MatchPage />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App;
