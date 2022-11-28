import React from "react";
import styled from "styled-components";
import { Jumbotron } from "./components/JumbotronScoring";
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

    .headers {
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

class ScoringPage extends React.Component {
    render() {
        return (
            <Styles>
                <Layout>
                    <Jumbotron />
                    <Container fluid className="bg text pb-5">
                        <Container className="pt-5 pb-1">
                            <Row>
                                <Col className="ms-3">
                                    <Container fluid className="headers m-3">
                                        <h fluid>SCORING</h>
                                    </Container>

                                    <Container className="col-border m-3">
                                        <Table striped hover className="mt-3"> 
                                            <thead className="thead w-100">
                                                <tr>
                                                    <th>At the Crease</th>
                                                </tr>
                                            </thead>
                                        </Table>
                                        <Table striped hover className="mt-3">
                                            <thead className="thead">
                                                <tr>
                                                    <th>Batsman</th>
                                                    <th>R</th>
                                                    <th>B</th>
                                                    <th>SR</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody">
                                                <tr>
                                                        <th>Player 1</th>
                                                        <th>23</th>
                                                        <th>20</th>
                                                        <th>115</th>
                                                </tr>
                                            </tbody>
                                            <tbody className="tbody">
                                                <tr>
                                                        <th>Player 1</th>
                                                        <th>23</th>
                                                        <th>20</th>
                                                        <th>115</th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <Table>
                                            <thead className="thead">
                                                <tr>
                                                    <th>Bowler</th>
                                                    <th>O</th>
                                                    <th>M</th>
                                                    <th>R</th>
                                                    <th>W</th>
                                                    <th>Extras</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody">
                                                <tr>
                                                    <th>Bowler</th>
                                                    <th>0.0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <hr className="solid"></hr>
                                    </Container>
                                </Col>
                                <Col className="ms-3">
                                    <Container fluid className="headers m-3">
                                        <h fluid>OVER BY OVER</h>
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
}

export default ScoringPage;