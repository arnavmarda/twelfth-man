import { Container, Navbar, Form, Button, Nav } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.jpg"; 
import { Link } from "react-router-dom";
import { DropdownSearch } from "./DropdownSearch";
import { useNavigate } from "react-router-dom";

const Styles = styled.div`

    .nav-link {
        color: #FFD100;
        font-family: Georgia;
        padding-left: 25px;
        text-decoration: none !important;
    }
    .a:link, .a:hover, .a: visited, .a:active {
        text-decoration: none;
    }

    .navbar {
        background-color: #005587;
        height: 75px;
    }
    
    .btn {
        background-color: #FFB81C;
        color: black;
        margin: 3px;
    }
`;


export const NavigationBar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("jwt") !== null ? true : false);
    const [searchList, setSearchList] = useState([]);
    const [searchValue, setSearchValue] = useState();

    const checkLoggedIn = useCallback(() => {
        setIsLoggedIn(localStorage.getItem("jwt") !== null ? true : false);
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
          const newteamId = data.map((team) => ({
            id: `/team-${team.id}`,
            value: team.name, 
            label: team.name,
        }));
            const teamId = searchList.concat(newteamId);
            setSearchList(teamId);
    
        })
        .catch((err) => console.log(err));
        console.log("Teams: ", searchList);
    }, []);

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
            const newtournamentId = data.map((tournament) => ({
            id: `/tournament-${tournament.id}`,
            value: tournament.name, 
            label: tournament.name,
        }));
            const tournamentId = searchList.concat(newtournamentId);
            setSearchList(tournamentId);
        })
        .catch((err) => console.log(err));
        console.log("Tournaments: ", searchList);
    }, [])

    useEffect(() => {
        checkLoggedIn();
        getTeams();
        getTournaments();
        console.log("Assimilated: ", searchList);
        
    }, []);

    var navigate = useNavigate();

    const handleSearch = (searchValue) => {
        setSearchValue(searchValue);
        var goTo = `${searchValue.id}`;
        navigate(goTo);
    }

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("jwt");
        localStorage.removeItem("hand");
        localStorage.removeItem("player-id");
        localStorage.removeItem("name");
        localStorage.removeItem("position");
        navigate("/");
    }

    return(
        <Styles className="sticky-top">
            <Navbar variant='dark' sticky="top" controls={false}>
                <Container>
                    <Nav.Link>
                        <Link to="/"> 
                            <img 
                            src={Logo}
                            width="90"
                            height="85"
                            className="d-inline-block align-middle"
                            alt=""
                            />
                        </Link>
                        Twelfth Man
                    </Nav.Link>
                    
                    <Form className="d-flex w-50">
                        <DropdownSearch options={searchList} handleChange={handleSearch} selectedOption={searchValue} placeholder={"Search for a team or tournament"} />
                    </Form>
                    {!isLoggedIn ? (
                        <Form className='d-flex'>
                            <Link to="/login"><Button type='button' variant='outline-success' href='login'>Login</Button></Link>
                            <Link to="/signup"><Button type='button' variant='outline-success' href='sign-up'>Sign Up</Button></Link>
                        </Form>
                    ) : (
                        <Form className='d-flex'>
                            <Button type='button' onClick={logOut} variant='outline-success' href='login'>Logout</Button>
                            <Link to={`/user-${localStorage.getItem("player-id")}`}><Button type='button' variant='outline-success' href='sign-up'>User Page</Button></Link>
                        </Form>
                    )}
                    
                </Container>
            </Navbar>
        </Styles>
    )
}