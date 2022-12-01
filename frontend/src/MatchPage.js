import React from "react";
import styled from "styled-components";
import { Jumbotron } from "./components/JumbotronMatch";
import { Footer } from "./components/Footer";
import { Layout } from "./components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";

const Styles = styled.div`
    .bg {
        background-color: #2774AE;
        background-size: cover;
        opacity: 1;
    }

    .text {
        color: black;
        text-align: center;
    }

    .col-border {
        border-style: solid;
        border-width: thick;
        border-color: #003B5C;
    }

    h3 {
        text-align: center;
        font-weight: bold;
    }

    .thead {
        background-color: #FFB81C;
        border-color: black;
        border-width: thick;
    }

    .tbody {
        background-color: #FFD100;
        border-color: black;
        border-width: normal;
    }

    .team-name {
        background-color: #FFB81C;
        border-style: solid;
        border-width: thick;
        border-color: #003B5C;
    }

    hr.solid {
        border-top: 5px solid black;
        width: 100%;
        margin: 0;
    }
`;

const MatchPage = ({searchList}) => {
        return (
            <Styles>
                <Layout>
                    <Jumbotron searchList={searchList}/>
                    <Container fluid className="bg text pb-5">
                        <Container className="pt-5 pb-1">
                            <Row>
                                <Col className="ms-3">
                                    <Container fluid className="team-name m-3">
                                        <h fluid>TEAM 1</h>
                                    </Container>
                                    <Container className="col-border m-3">
                                        <Table striped hover className="mt-3">
                                            <thead className="thead">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Player</th>
                                                    <th>Fall of Wicket</th>
                                                    <th>R</th>
                                                    <th>B</th>
                                                    <th>SR</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>1</th>
                                                    <th>Anirudh Rao</th>
                                                    <th>not out</th>
                                                    <th>83</th>
                                                    <th>50</th>
                                                    <th>166.0</th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>2</th>
                                                    <th>Tanmay Desai</th>
                                                    <th>b Angad K</th>
                                                    <th>10</th>
                                                    <th>4</th>
                                                    <th>250.0</th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>3</th>
                                                    <th>Paul Eggert</th>
                                                    <th>c&b Angad K</th>
                                                    <th>0</th>
                                                    <th>1</th>
                                                    <th>0</th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>4</th>
                                                    <th>Arnav Marda</th>
                                                    <th>not out</th>
                                                    <th>20</th>
                                                    <th>10</th>
                                                    <th>200</th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Extras</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th>0</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Total</th>
                                                    <th></th>
                                                    <th>(2 wickets, 12.3 overs)</th>
                                                    <th>123</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Container>

                                    <Container className="col-border m-3">
                                        <Table striped hover className="mt-3">
                                            <thead className="thead">
                                                <tr>
                                                    <th>Bowler</th>
                                                    <th>O</th>
                                                    <th>M</th>
                                                    <th>R</th>
                                                    <th>W</th>
                                                    <th>Econ</th>
                                                    <th>Extras</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Angad K</th>
                                                    <th>4</th>
                                                    <th>0</th>
                                                    <th>44</th>
                                                    <th>2</th>
                                                    <th>11.0</th>
                                                    <th></th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>David S</th>
                                                    <th>4</th>
                                                    <th>0</th>
                                                    <th>60</th>
                                                    <th>0</th>
                                                    <th>15.0</th>
                                                    <th></th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Richard K</th>
                                                    <th>4</th>
                                                    <th>0</th>
                                                    <th>60</th>
                                                    <th>0</th>
                                                    <th>15.0</th>
                                                    <th></th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Ezequiel H</th>
                                                    <th>0.3</th>
                                                    <th>0</th>
                                                    <th>3</th>
                                                    <th>0</th>
                                                    <th>6.0</th>
                                                    <th></th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Container>
                                    <Container />
                                </Col>

                                <Col className="ms-3">
                                    <Container fluid className="team-name m-3">
                                        <h fluid>TEAM 2</h>
                                    </Container>
                                    <Container className="col-border m-3">
                                        <Table striped hover className="mt-3">
                                            <thead className="thead">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Player</th>
                                                    <th>Fall of Wicket</th>
                                                    <th>R</th>
                                                    <th>B</th>
                                                    <th>SR</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>1</th>
                                                    <th>Anirudh Rao</th>
                                                    <th>not out</th>
                                                    <th>83</th>
                                                    <th>50</th>
                                                    <th>166.0</th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>2</th>
                                                    <th>Tanmay Desai</th>
                                                    <th>b Angad K</th>
                                                    <th>10</th>
                                                    <th>4</th>
                                                    <th>250.0</th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>3</th>
                                                    <th>Paul Eggert</th>
                                                    <th>c&b Angad K</th>
                                                    <th>0</th>
                                                    <th>1</th>
                                                    <th>0</th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>4</th>
                                                    <th>Arnav Marda</th>
                                                    <th>not out</th>
                                                    <th>20</th>
                                                    <th>10</th>
                                                    <th>200</th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Extras</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th>0</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Total</th>
                                                    <th></th>
                                                    <th>(2 wickets, 12.3 overs)</th>
                                                    <th>123</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Container>

                                    <Container className="col-border m-3">
                                        <Table striped hover className="mt-3">
                                            <thead className="thead">
                                                <tr>
                                                    <th>Bowler</th>
                                                    <th>O</th>
                                                    <th>M</th>
                                                    <th>R</th>
                                                    <th>W</th>
                                                    <th>Econ</th>
                                                    <th>Extras</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Angad K</th>
                                                    <th>4</th>
                                                    <th>0</th>
                                                    <th>44</th>
                                                    <th>2</th>
                                                    <th>11.0</th>
                                                    <th></th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>David S</th>
                                                    <th>4</th>
                                                    <th>0</th>
                                                    <th>60</th>
                                                    <th>0</th>
                                                    <th>15.0</th>
                                                    <th></th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Richard K</th>
                                                    <th>4</th>
                                                    <th>0</th>
                                                    <th>60</th>
                                                    <th>0</th>
                                                    <th>15.0</th>
                                                    <th></th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Ezequiel H</th>
                                                    <th>0.3</th>
                                                    <th>0</th>
                                                    <th>3</th>
                                                    <th>0</th>
                                                    <th>6.0</th>
                                                    <th></th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Container>
                                    <Container />
                                </Col>
                            </Row>
                        </Container>
                        <hr className="solid position-relative" />
                        <Container className="pt-1">
                            <Row>
                                <Col className="ms-3">
                                    <Container className="team-name m-3">
                                        <h fluid>MATCH SUMMARY</h>
                                    </Container>

                                    <Container className="col-border ms-3">
                                        <Table striped hover className="mt-3">
                                            <thead className="thead">
                                                <tr>
                                                    <th>Topic</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Tournament:</th>
                                                    <th>Tournament Name</th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Match Date:</th>
                                                    <th>XX / XX / XXXX</th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Toss:</th>
                                                    <th>Team A won the toss and decided to bat first.</th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                    <Footer />
                </Layout>
            </Styles>
        )
}

export default MatchPage;