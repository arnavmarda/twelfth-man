import React from "react";
import styled from "styled-components";
import { Jumbotron } from "./components/JumbotronUser";
import { Layout } from "./components/Layout";
import { Footer } from "./components/Footer";
import { MatchCarousel } from "./components/MatchCarousel";
import { ListGroup, Container, Row, Col, Image } from "react-bootstrap";
import Team from "./assets/team.jpg";
import Tournament from "./assets/tournament.jpg";



const Styles = styled.div`

    .bg {
        background-color: #8BB8E8;
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
        background-color: #FFC72C;
        opacity: 2;
        font-size: 18px;
    }

    .list-group-item:hover {
        background-color: #FFB81C;
    }

`;

class UserPage extends React.Component {
    render() {
        return (
            <Styles>
                <Layout>
                    <Jumbotron />
                    <MatchCarousel />
                    <Container fluid className="bg text pb-5">
                        <Container className="pt-5">
                            <Row>
                                <Col className="ms-3">
                                    <Container className="col-border">
                                        <Image src={Team} className="align-middle d-inline-block" width="100" height="100" /> 
                                        <h3 className="p-3 pb-2 pt-0">Teams</h3>
                                        <ListGroup className="p-3 text-center">
                                            <ListGroup.Item action>Team 1</ListGroup.Item>
                                            <ListGroup.Item action>Team 2</ListGroup.Item>
                                            <ListGroup.Item action>Team 3</ListGroup.Item>
                                        </ListGroup>
                                    </Container>
                                    <Container />
                                </Col>

                                <Col className="ms-3">
                                    <Container className="col-border">
                                        <Image src={Tournament} className="align-middle d-inline-block pt-1" width="80" height="80" /> 
                                        <h3 className="p-3 pb-2">Tournaments</h3>
                                        <ListGroup className="p-3 text-center">
                                            <ListGroup.Item action>Tournament 1</ListGroup.Item>
                                            <ListGroup.Item action>Tournament 2</ListGroup.Item>
                                            <ListGroup.Item action>Tournament 3</ListGroup.Item>
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
}

export default UserPage;