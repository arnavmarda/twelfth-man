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
      // console.log(data);
      let tournamentId = data.map((tournament) => tournament.id);
      setTournamentIds(tournamentId);
    })
    .catch((err) => console.log(err));
  }, [])
  
  useEffect(() => {
    
    // GET all users
    // fetch("http://localhost:9000/userList", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   }
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);
    //     let userId = data.map((user) => user.id);
    //     setPlayerIds(userId);
    //   })
    //   .catch((err) => console.log(err));

    // GET all teams
    // fetch("http://localhost:9000/teamList", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   }
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   // console.log(data);
    //   let teamId = data.map((team) => team.id);
    //   setTeamIds(teamId);

    // })
    // .catch((err) => console.log(err));

    // GET all matches
    // fetch("http://localhost:9000/matchList", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   }
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   // console.log(data);
    //   let matchId = data.map((match) => match.id);
    //   setMatchIds(matchId);
    // })
    // .catch((err) => console.log(err));

    // GET all tournaments 
    // fetch("http://localhost:9000/tournamentList", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   }
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   // console.log(data);
    //   let tournamentId = data.map((tournament) => tournament.id);
    //   setTournamentIds(tournamentId);
    // })
    // .catch((err) => console.log(err));

    getUsers();
    getTeams();
    getTournaments();
    getMatches();
}, [getUsers, getTeams, getTournaments, getMatches]);


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
