import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { Jumbotron } from "./components/JumbotronTeam";
import { Layout } from "./components/Layout";
import { Footer } from "./components/Footer";
import { MatchCarousel } from "./components/MatchCarousel";
import { ListGroup, Container, Row, Col, Image } from "react-bootstrap";
import { GrSchedule } from "react-icons/gr";
import Team from "./assets/team.jpg";
import Tournament from "./assets/tournament.jpg";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

const Styles = styled.div`
    .bg {
        background-color: #8bb8e8;
        background-size: cover;
        opacity: 1;
    }

    .text {
        color: black;
        text-align: center;
    }

    .col-border {
        border-style: solid;
        border-width: normal;
        border-color: black;
    }

    h3 {
        text-align: center;
        font-weight: bold;
    }

    .list-group-item {
        background-color: #ffc72c;
        opacity: 2;
        font-size: 18px;
    }

    .list-group-item:hover {
        background-color: #ffb81c;
    }
`;

const TeamPage = ({ teamId, searchList }) => {
    const [roster, setRoster] = React.useState([]);
    const [tournamentList, setTournamentList] = React.useState([]);
    const [upcomingGames, setUpcomingGames] = React.useState([]);
    const [captain, setCaptain] = React.useState("");
    const [name, setName] = React.useState("");

    const getTeamInfo = useCallback(() => {
        fetch("http://localhost:9000/getInfoForTeam", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: teamId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setRoster(data.roster);
                setCaptain(data.captain);
                setName(data.name);
            })
            .catch((err) => console.log(err));
    }, []);

    const getRandomOpponent = useCallback(() => {
        fetch("http://localhost:9000/getRandomOpponent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: teamId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                const toastMsg = `Consider playing a friendly with ${data}. We think it would be a great game of cricket!`;
                toast(toastMsg, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            })
            .catch((err) => console.log(err));
    }, []);

    const getTeamTournaments = useCallback(() => {
        fetch("http://localhost:9000/getTeamTournaments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: teamId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setTournamentList(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const getTeamUpcomingMatches = useCallback(() => {
        fetch("http://localhost:9000/getTeamUpcomingMatches", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: teamId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setUpcomingGames(data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        getTeamInfo();
        getTeamTournaments();
        getRandomOpponent();
        getTeamUpcomingMatches();
    }, [getTeamInfo, getTeamTournaments, getTeamUpcomingMatches, getRandomOpponent]);


    return (
        <Styles>
            <Layout>
                <Jumbotron name={name} captain={captain} searchList={searchList}/>
                <MatchCarousel />
                <Container fluid className="bg text pb-5">
                    <Container className="pt-5">
                        <ToastContainer />
                        <Row>
                            <Col className="col-border ms-3">
                                <Image
                                    src={Team}
                                    className="align-middle d-inline-block"
                                    width="100"
                                    height="100"
                                />
                                <h3 className="p-3 pb-2 pt-0">Roster</h3>
                                <ListGroup as="ol" className="p-3 text-center">
                                    {roster.length !== 0 ? (
                                        roster.map((player) => (
                                            <ListGroup.Item as="li" action>
                                                {player}
                                            </ListGroup.Item>
                                        ))
                                    ) : (
                                        <ListGroup.Item as="li">
                                            The team has no players.
                                        </ListGroup.Item>
                                    )}
                                    {/* <ListGroup.Item as="li" action>Player 1</ListGroup.Item>
                                    <ListGroup.Item as="li" action>Player 2</ListGroup.Item>
                                    <ListGroup.Item as="li" action>Player 3</ListGroup.Item>
                                    <ListGroup.Item as="li" action>Player 4</ListGroup.Item>
                                    <ListGroup.Item as="li" action>Player 5</ListGroup.Item>
                                    <ListGroup.Item as="li" action>Player 6</ListGroup.Item>
                                    <ListGroup.Item as="li" action>Player 7</ListGroup.Item>
                                    <ListGroup.Item as="li" action>Player 8</ListGroup.Item>
                                    <ListGroup.Item as="li" action>Player 9</ListGroup.Item>
                                    <ListGroup.Item as="li" action>Player 10</ListGroup.Item>
                                    <ListGroup.Item as="li" action>Player 11</ListGroup.Item> */}
                                </ListGroup>
                            </Col>

                            <Col className="ms-3">
                                <Container className="col-border mb-3">
                                    <Image
                                        src={Tournament}
                                        className="align-middle d-inline-block pt-1"
                                        width="80"
                                        height="80"
                                    />
                                    <h3 className="p-3 pb-2">Tournaments</h3>
                                    <ListGroup className="p-3 text-center">
                                        {tournamentList.length !== 0 ? (
                                            tournamentList.map((tournament) => (
                                                <Link
                                                    to={`/tournament-${tournament.id}`}
                                                >
                                                    <ListGroup.Item action>
                                                        {tournament.name}
                                                    </ListGroup.Item>
                                                </Link>
                                            ))
                                        ) : (
                                            <ListGroup.Item action>
                                                This team is not in any
                                                tournament.
                                            </ListGroup.Item>
                                        )}
                                        {/* <ListGroup.Item action>Tournament 1</ListGroup.Item>
                                        <ListGroup.Item action>Tournament 2</ListGroup.Item>
                                        <ListGroup.Item action>Tournament 3</ListGroup.Item> */}
                                    </ListGroup>
                                </Container>
                                <Container className="col-border mb-3">
                                    <GrSchedule
                                        size={50}
                                        color={"black"}
                                        className="pt-1"
                                    />
                                    <h3 className="p-3 pb-2">Upcoming Games</h3>
                                    <ListGroup className="p-3 text-center">
                                        {upcomingGames.length !== 0 ? (
                                            upcomingGames.map((game) => (
                                                <Link to={`/match-${game.id}`}>
                                                    <ListGroup.Item action>
                                                        {game.home} V{" "}
                                                        {game.away}
                                                    </ListGroup.Item>
                                                </Link>
                                            ))
                                        ) : (
                                            <ListGroup.Item action>
                                                No upcoming games.
                                            </ListGroup.Item>
                                        )}
                                        {/* <ListGroup.Item action>Upcoming Game 1</ListGroup.Item>
                                        <ListGroup.Item action>Upcoming Game 2</ListGroup.Item>
                                        <ListGroup.Item action>Upcoming Game 3</ListGroup.Item> */}
                                    </ListGroup>
                                </Container>
                                <Container />
                            </Col>
                        </Row>
                    </Container>
                </Container>
                <Footer />
            </Layout>
        </Styles>
    );
};

export default TeamPage;
