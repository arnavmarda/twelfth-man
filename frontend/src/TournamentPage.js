import React from "react";
import styled from "styled-components";
import { Layout } from "./components/Layout";
import { Jumbotron } from "./components/JumbotronTournament";
import { Footer } from "./components/Footer";
import { MatchCarousel } from "./components/MatchCarousel";
import { ListGroup, Container, Row, Col, Image } from "react-bootstrap";
import Team from "./assets/team.jpg";
import Standing from "./assets/standing.jpg";
import Tournament from "./assets/tournament.jpg";


const Styles = styled.div`

    .col-border {
        border-style: solid;
        border-width: normal;
        border-color: black;
    }

    .bg {
        background-color: #8BB8E8;
        background-size: cover;
        opacity: 1;
    }

    .text {
        color: black;
        text-align: center;
    }

    .list-group-item {
        background-color: #FFC72C;
        opacity: 2;
        font-size: 18px;
    }

    .list-group-item:hover {
    }

    .team:hover {
        background-color: #FFB81C;
    }

    .tournament-icon {
        width: auto;
        height: 100px;
        position: relative;
        left: 47%;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 0;
        padding-right: 0;
        margin: 0;
    }

`;

const TournamentPage = ({tournament, searchList}) => {

    const [tournamentName, setTournamentName] = React.useState("");
    const [tournamentTeams, setTournamentTeams] = React.useState([]);
    const [tournamentFixtures, setTournamentFixtures] = React.useState([]);

    const getTournamentData = React.useCallback(() => {
        fetch("http://localhost:9000/getInfoForTournament", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: tournament,
            })
        })
        .then(res => res.json())
        .then(data => {
            setTournamentName(data.name);
            setTournamentTeams(data.teams);
            setTournamentFixtures(data.fixtures);
        })
        .catch(err => console.log(err))
    }, []);

    React.useEffect(() => {
        getTournamentData();
    }, [])

    console.log(typeof(tournamentTeams));

    return(
        <Styles>
            <Layout>
                <Jumbotron searchList={searchList}/> 
                <MatchCarousel />
                <Container fluid className="pb-5 bg text">
                    <Container className="pt-5">
                        <Row className="pb-4 w-100">
                            <Col className="ms-0 me-3">
                                <Container className="col-border">
                                    <Image src={Team} className="align-middle d-inline-block" width="100" height="100" /> 
                                    <h3 className="p-3 pb-2 pt-0">Teams</h3>
                                    <ListGroup className="p-3 text-center">
                                        {(tournamentTeams.length !== 0) ? (
                                                tournamentTeams.map((team) => (<ListGroup.Item action className="team">{team}</ListGroup.Item>))
                                            ) : (
                                                <ListGroup.Item action className="team">There are no teams in the tournament.</ListGroup.Item>
                                            )
                                        }
                                    </ListGroup>
                                </Container>
                                <Container />
                            </Col>

                            <Col className="col-border ms-3">
                                <Container>
                                    <Image src={Standing} className="align-middle d-inline-block pt-1" width="80" height="80" /> 
                                    <h3 className="p-3 pb-2">Upcoming Games</h3>
                                    <ListGroup as="ul" numbered className="p-3 text-center">
                                        {(tournamentFixtures) ? (
                                            tournamentFixtures.map((fixture) => (
                                                <ListGroup.Item as="li">{fixture.home} V {fixture.away}</ListGroup.Item>
                                            ))
                                        ) : (
                                            <ListGroup.Item as="li">No fixtures to display.</ListGroup.Item>
                                        )}
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

    )
}

export default TournamentPage;