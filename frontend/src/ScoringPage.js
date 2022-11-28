import React from "react";
import styled from "styled-components";
import { Jumbotron } from "./components/JumbotronScoring";
import { Footer } from "./components/Footer";
import { Layout } from "./components/Layout";
import { RenderOver } from "./components/OverGraphics";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { ModalScoring } from "./components/ModalScoring";
import { ModalOver } from "./components/ModalOver";
import { ModalWicket } from "./components/ModalWicket";

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

    .over {
        border-color: black;
        border-width: thick;
        border-style: solid;
    }

    .headers {
        background-color: #FFB81C;
        border-style: solid;
        border-width: thick;
        border-color: #003B5C;
        color: black;
        font-weight: bold;
    }

    hr.solid {
        border-top: 5px solid black;
        width: 100%;
        margin: 0;
    }

    .text-trial {
        color: white;
    }

    .ball-button {
        border-style: solid;
        border-color: black;
        border-width: thin;
        margin-left: 10px;
        margin-right: 10px;
    }

    .dot {
        background-color: grey;
    }

    .one {
        background-color: purple;
    }

    .four, .five {
        background-color: green;
    }

    .six {
        background-color: blue;
    }

    .wicket {
        background-color: red;
    }

    .extras {
        background-color: turquoise;
    }

    .text {
        color: white;
    }

    .ball-button {
        border-style: solid;
        border-color: black;
        border-width: thin;
        -webkit-border-radius: 50%;
        border-radius: 50% !important;
        padding: 5px 15px;
        height: 30px;
        width: auto;
        text-align: center;
        vertical-align: center;
    }

    .tr-no-border {
        border-color: #FFD100 !important;
    }

    .btn {
        text-align: center;
        margin-left: 10px;
        margin-right: 10px;
    }

    .submit-buttons {
        background-color: blue;
        border-width: normal;
        border-color: black;
    }

    .blinking-live-icon {
        background-color: #1c87c9;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        border: none;
        color: #eeeeee;
        display: inline-block;
        padding: 5px 8px;
        text-align: center;
        text-decoration: none;
        // top: 50%;
        position: relative;
        height: 16px;
        width: auto;
        margin: 0;
        vertical-align: middle;
    }

    @keyframes glowing {
        0% {
          background-color: #2ba805;
        }
        50% {
          background-color: black;
        }
        100% {
          background-color: #2ba805;
        }
    }

    .blinking-live-icon {
        animation: glowing 1000ms infinite;
    }

    .header-main {
        height: 50px;
        font-size: 25px;
    }
`;

class ScoringPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBall: "",
            callOverEnd: false,
            callWicket: false,
        };

        this.handleEndOver = this.handleEndOver.bind(this);
        this.updateExtras = this.updateExtras.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.updateBall = this.updateBall.bind(this);
    }

    handleEndOver(event) {
        this.setState({callOverEnd: true});
    }

    updateBall(value) {
        this.setState({currentBall: value});
    }

    updateExtras(value) {
        this.setState({currentBall: this.state.currentBall + value});
    }

    handleSave(event) {
        const currentBall = this.state.currentBall;
        console.log(currentBall);
        if(currentBall.includes("W")){
            this.setState({callWicket: true});
        }
    }

    render() {
        return (
            <Styles>
                <Layout>
                    <ModalScoring />
                    <Jumbotron />
                    <Container fluid className="bg text pb-5 pt-5">
                        <Container fluid className="headers mt-3 mb-0 header-main">
                            <p className="blinking-live-icon"></p>
                            <h fluid className="vertical-align-middle"> INNINGS 1 - TEAM A</h>
                        </Container>
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
                                        <RenderOver balls={["1", "2", "1", "1", "1", "1"]} over={'Current Over'} overnumber={0} />
                                        <hr className="solid"></hr>
                                        <Table className="mb-0 mt-3">
                                            <tbody className="tbody">
                                                <tr>
                                                    <ToggleButtonGroup type="radio" name="runs" id="runs" defaultValue={""} onChange={this.updateBall}>
                                                        <ToggleButton value={"0"} id="tbg-radio-1" className="rounded-circle dot" name="runs">.</ToggleButton>
                                                        <ToggleButton value={"1"} id="tbg-radio-2" className="rounded-circle one" name="runs">1</ToggleButton>
                                                        <ToggleButton value={"2"} id="tbg-radio-3" className="rounded-circle one" name="runs">2</ToggleButton>
                                                        <ToggleButton value={"3"} id="tbg-radio-4" className="rounded-circle one" name="runs">3</ToggleButton>
                                                        <ToggleButton value={"4"} id="tbg-radio-5" className="rounded-circle four" name="runs">4</ToggleButton>
                                                        <ToggleButton value={"5"} id="tbg-radio-6" className="rounded-circle four" name="runs">5</ToggleButton>
                                                        <ToggleButton value={"6"} id="tbg-radio-7" className="rounded-circle six" name="runs">6</ToggleButton>
                                                        <ToggleButton value={"W"} id="tbg-radio-8" className="rounded-circle wicket" name="runs">W</ToggleButton>
                                                    </ToggleButtonGroup>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <Table className="mt-0 mb-0">
                                            <tbody className="tbody">
                                                <tr>
                                                    <ToggleButtonGroup type="radio" name="extras" id="extras" defaultValue={""} onChange={this.updateExtras}>
                                                        <ToggleButton value={""} id="extras-radio-4" className="rounded-circle extras" name="extras">N/A</ToggleButton>
                                                        <ToggleButton value={"Wd"} id="extras-radio-3" className="rounded-circle extras" name="extras">Wd</ToggleButton>
                                                        <ToggleButton value={"B"} id="extras-radio-2" className="rounded-circle extras" name="extras">B</ToggleButton>
                                                        <ToggleButton value={"NB"} id="extras-radio-1" className="rounded-circle extras" name="extras">NB</ToggleButton>
                                                    </ToggleButtonGroup>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <Table className="mt-0 mb-3">
                                            <tbody className="tbody">
                                                <tr>
                                                    <Button type="submit" className="submit-buttons" variant="primary" onClick={this.handleSave}>Save</Button>
                                                    {this.state.callWicket ? <ModalWicket /> : <input type="hidden"></input>}
                                                    <Button type="submit" className="submit-buttons" onClick={this.handleEndOver} variant="primary">End Over</Button>
                                                    {this.state.callOverEnd ? <ModalOver /> : <input type="hidden"></input>}
                                                    <Button type="submit" className="submit-buttons" variant="primary">End Innings</Button>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Container>
                                </Col>
                                <Col className="ms-3">
                                    <Container fluid className="headers m-3">
                                        <h fluid>OVER BY OVER</h>
                                    </Container>
                                    
                                    <Container className="col-border m-3">
                                    <RenderOver balls={["1", "2", "1", "1", "1", "1"]} over={'Over 0'} overnumber={0} />
                                    <RenderOver balls={["1", "2", "1", "1", "1", "1"]} over={'Over 1'} overnumber={1} />
                                    <RenderOver balls={["1", "2", "1", "1", "1", "1"]} over={'Over 2'} overnumber={2} />
                                    <RenderOver balls={["1", "2", "1", "1", "1", "1"]} over={'Over 3'} overnumber={3} />
                                    <RenderOver balls={["1", "2", "1", "1", "1", "1"]} over={'Over 4'} overnumber={4} />
                                    <RenderOver balls={["1", "2", "1", "1", "1", "1"]} over={'Over 5'} overnumber={5} />
                                    <RenderOver balls={["1", "2", "1", "1", "1", "1"]} over={'Over 6'} overnumber={6} />
                                    <RenderOver balls={["1", "2", "1", "1", "1", "1"]} over={'Over 7'} overnumber={7} />
                                    <RenderOver balls={["1", "2", "1", "1", "1", "1"]} over={'Over 8'} overnumber={8} />
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