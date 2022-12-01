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
  const [teamIds, setTeamIds] = useState([]);
  const [tournamentIds, setTournamentIds] = useState([]);
  const [matchIds, setMatchIds] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:9000/everything", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => res.json())
    .then((data) => {
      let userId = data.users.map((user) => user.id);
      let teamId = data.teams.map((team) => team.id);
      let tournamentId = data.tournaments.map((tournament) => tournament.id);
      let matchId = data.matches.map((match) => match.id);
      setPlayerIds(userId);
      setTeamIds(teamId);
      setTournamentIds(tournamentId);
      setMatchIds(matchId);
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>

          {playerIds.map((playerId) => (
          <Route path={`/user-${playerId}`} element={<UserPage player={playerId}/>} />
          ))}

          {tournamentIds.map((tournamentId) => (
          <Route path={`/tournament-${tournamentId}`} element={<TournamentPage tournament={tournamentId}/>} />
          ))}

          {teamIds.map((team) => (
          <Route path={`/user-${team}`} element={<TeamPage teamId={team}/>} />
          ))}

          {matchIds.map((matchId) => (
            (<Route path={`/match-${matchId}`} element={<MatchPage match={matchId}/>} />)
            (<Route path={`/scoring-${matchId}`} element={<ScoringPage match={matchId}/>} />)
          ))}

          <Route path="/signup" element={<UserRegistration />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createteam" element={<TeamCreation />} />
          <Route path="/createtournament" element={<TournamentCreation />} />
          <Route path="/creatematch" element={<CreateMatch />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App;
