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

class TournamentPage extends React.Component {
    render() {
        return(
            <Styles>
                <Layout>
                    <Jumbotron /> 
                    <MatchCarousel />
                    <Container fluid className="pb-5 bg text">
                        <Container className="pt-5">
                            <Row className="pb-4 w-100">
                                <Col className="ms-0 me-3">
                                    <Container className="col-border">
                                        <Image src={Team} className="align-middle d-inline-block" width="100" height="100" /> 
                                        <h3 className="p-3 pb-2 pt-0">Teams</h3>
                                        <ListGroup className="p-3 text-center">
                                            <ListGroup.Item action className="team">Team 1</ListGroup.Item>
                                            <ListGroup.Item action className="team">Team 2</ListGroup.Item>
                                            <ListGroup.Item action className="team">Team 3</ListGroup.Item>
                                        </ListGroup>
                                    </Container>
                                    <Container />
                                </Col>

                                <Col className="col-border ms-3">
                                    <Container>
                                        <Image src={Standing} className="align-middle d-inline-block pt-1" width="80" height="80" /> 
                                        <h3 className="p-3 pb-2">Standings</h3>
                                        <ListGroup as="ol" numbered className="p-3 text-center">
                                            <ListGroup.Item as="li">Team 1</ListGroup.Item>
                                            <ListGroup.Item as="li">Team 2</ListGroup.Item>
                                            <ListGroup.Item as="li">Team 3</ListGroup.Item>
                                        </ListGroup>
                                    </Container>
                                    <Container />
                                </Col>
                            </Row>
                            <Row className="col-border w-100">
                                <Image src={Tournament} fluid className="tournament-icon align-middle d-inline-block" width="10" height="10" />
                                <h3 className="p-3 pb-2 pt-0 text-center">Bracket</h3>
                            </Row>
                        </Container>
                    </Container>
                    <Footer />
                </Layout>
            </Styles>

        )
    }
}

export default TournamentPage;