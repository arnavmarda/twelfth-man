import Home from "./Home";
import UserPage from "./UserPage";
import TournamentPage from "./TournamentPage";
import TeamPage from "./TeamPage";
import UserRegistration from "./UserRegistration";
import LoginPage from "./Login";
import MatchPage from "./MatchPage";
import ScoringPage from "./ScoringPage";
import CreateMatch from "./MatchCreation";
import React, { useCallback, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TeamCreation from "./TeamCreation";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TournamentCreation from "./TournamentCreation.js";

function App() {

  const [playerIds, setPlayerIds] = useState([]);
  const [teamIds, setTeamIds] = useState([]);
  const [tournamentIds, setTournamentIds] = useState([]);
  const [matchIds, setMatchIds] = useState([]);
  const [tournamentNames, setTournamentNames] = useState([]);
  const [teamNames, setTeamNames] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const getUsers = useCallback(() => {
    fetch("http://localhost:9000/userList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        let userId = data.map((user) => user.id);
        setPlayerIds(userId);
      })
      .catch((err) => console.log(err));
  }, []);

  const getTeams = useCallback(() => {
    fetch("http://localhost:9000/teamList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      let teamId = data.map((team) => team.id);
      setTeamIds(teamId);
      let teamNames = searchList.concat(data.map((team) => ({
        id: `/team-${team.id}`,
        value: team.name, 
        label: team.name,
      })));
      setTeamNames(teamNames);
    })
    .catch((err) => console.log(err));
  }, []);

  const getMatches = useCallback(() => {
    fetch("http://localhost:9000/matchList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      let matchId = data.map((match) => match.id);
      setMatchIds(matchId);
    })
    .catch((err) => console.log(err));
  }, [])

  const getTournaments = useCallback(() => {
    fetch("http://localhost:9000/tournamentList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => res.json())
    .then((data) => {
      let tournamentId = data.map((tournament) => tournament.id);
      setTournamentIds(tournamentId);
      let tournaments = data.map((tournament) => ({
        id: `/tournament-${tournament.id}`,
        value: tournament.name, 
        label: tournament.name,
      }));
      // tournaments = tournaments.concat(searchList)
      setTournamentNames(tournaments);
    })
    .catch((err) => console.log(err));
  }, [])
  
  useEffect(() => {
    getUsers();
    getTeams();
    getTournaments();
    getMatches();
    setSearchList(tournamentNames.concat(teamNames));
  }, []);

  console.log('Search List', searchList);

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home searchList={searchList}/>}/>

          {playerIds.map((playerId) => (
          <Route path={`/user-${playerId}`} element={<UserPage player={playerId} searchList={searchList}/>} />
          ))}

          {tournamentIds.map((tournamentId) => (
          <Route path={`/tournament-${tournamentId}`} element={<TournamentPage tournament={tournamentId} searchList={searchList}/>} />
          ))}

          {teamIds.map((team) => (
          <Route path={`/team-${team}`} element={<TeamPage teamId={team} searchList={searchList}/>} />
          ))}

          {matchIds.map((matchId) => (
            (<Route path={`/match-${matchId}`} element={<MatchPage match={matchId} searchList={searchList}/>} />)
            (<Route path={`/scoring-${matchId}`} element={<ScoringPage match={matchId} searchList={searchList}/>} />)
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
