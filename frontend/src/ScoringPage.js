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
import { useNavigate } from "react-router-dom";

const Styles = styled.div`
    .bg {
        background-color: #2774ae;
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
        border-color: #003b5c;
    }

    .thead {
        background-color: #ffb81c;
        border-color: black;
        border-width: thick;
    }

    .tbody {
        background-color: #ffd100;
        border-color: black;
        border-width: normal;
    }

    .over {
        border-color: black;
        border-width: thick;
        border-style: solid;
    }

    .headers {
        background-color: #ffb81c;
        border-style: solid;
        border-width: thick;
        border-color: #003b5c;
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

    .four,
    .five {
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
        border-color: #ffd100 !important;
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
        position: relative;
        height: 16px;
        width: auto;
        margin: 0;
        vertical-align: middle;
    }

    .blinking-live-icon-2 {
        background-color: #1c87c9;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        border: none;
        color: #eeeeee;
        display: inline-block;
        padding: 5px 5px;
        text-align: center;
        text-decoration: none;
        position: relative;
        height: 10px;
        width: auto;
        margin: 0;
        margin-right: 10px;
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

    .blinking-live-icon-2 {
        animation: glowing 1000ms infinite;
    }

    .header-main {
        height: 50px;
        font-size: 25px;
    }
`;

const ScoringPage = ({ searchList, match }) => {
    const navigate = useNavigate();

    const [currentBall, setCurrentBall] = React.useState("");
    const [numBalls, setNumBalls] = React.useState(0);
    const [callOverEnd, setCallOverEnd] = React.useState(false);
    const [callWicket, setCallWicket] = React.useState(false);
    const firstRender = React.useRef(true);
    const strikerIDX = React.useRef(0);
    const nonStrikerIDX = React.useRef(1);
    const bowlerIDX = React.useRef(0);
    const [winner, setWinner] = React.useState("");
    const currOver = React.useRef(0);
    const [runsToSend, setRunsToSend] = React.useState(0);
    const [wicketsToSend, setWicketsToSend] = React.useState(0);
    const [ballSymbol, setBallSymbol] = React.useState("");
    const [isItExtra, setIsItExtra] = React.useState(false);
    const [homeData, setHomeData] = React.useState({
        home: "",
        homeRuns: 0,
        homeWicketsLost: 0,
        winner: "",
        homePlayers: [],
        homeBatsmenRuns: [],
        homeBatsmenBallsFaced: [],
        homeBowlerRunsGiven: [],
        homeBowlerBallsBowled: [],
        homeBowlerWickets: [],
        homeBowlerExtras: [],
        homeBowling: [""],
        battingFirst: true,
    });
    const [awayData, setAwayData] = React.useState({
        away: "",
        awayRuns: 0,
        awayWicketsLost: 0,
        awayPlayers: [],
        awayBatsmenRuns: [],
        awayBatsmenBallsFaced: [],
        awayBowlerRunsGiven: [],
        awayBowlerBallsBowled: [],
        awayBowlerWickets: [],
        awayBowlerExtras: [],
        awayBowling: [""],
        battingFirst: false,
    });
    const [striker, setStriker] = React.useState({
        name: "",
        runs: 0,
        balls: 0,
    });
    const [nonStriker, setNonStriker] = React.useState({
        name: "",
        runs: 0,
        balls: 0,
    });
    const [bowler, setBowler] = React.useState({
        name: "",
        overs: "",
        runs: 0,
        wickets: 0,
        extras: 0,
    });
    const batsmen = React.useRef([]);
    const [bowlers, setBowlers] = React.useState([]);
    const currInnings = React.useRef(1);
    currInnings.current = 1;
    const getMatchInfo = React.useCallback(() => {
        fetch("http://localhost:9000/match/getInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: match,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setHomeData({
                    home: data.home,
                    homeRuns: data.homeRuns,
                    homeWicketsLost: data.homeWicketsLost,
                    winner: data.winner,
                    homePlayers: data.homePlayers,
                    homeBatsmenRuns: data.homeBatsmenRuns,
                    homeBatsmenBallsFaced: data.homeBatsmenBallsFaced,
                    homeBowlerRunsGiven: data.homeBowlerRunsGiven,
                    homeBowlerBallsBowled: data.homeBowlerBallsBowled,
                    homeBowlerWickets: data.homeBowlerWickets,
                    homeBowlerExtras: data.homeBowlerExtras,
                    homeBowling: data.homeBowling,
                });
                setAwayData({
                    away: data.away,
                    awayRuns: data.awayRuns,
                    awayWicketsLost: data.awayWicketsLost,
                    awayPlayers: data.awayPlayers,
                    awayBatsmenRuns: data.awayBatsmenRuns,
                    awayBatsmenBallsFaced: data.awayBatsmenBallsFaced,
                    awayBowlerRunsGiven: data.awayBowlerRunsGiven,
                    awayBowlerBallsBowled: data.awayBowlerBallsBowled,
                    awayBowlerWickets: data.awayBowlerWickets,
                    awayBowlerExtras: data.awayBowlerExtras,
                    awayBowling: data.awayBowling,
                });
                if(currInnings === 1){
                    setStriker({
                        ...striker,
                        name: data.homePlayers[strikerIDX.current],
                        runs: data.homeBatsmenRuns[strikerIDX.current],
                        balls: data.homeBatsmenBallsFaced[strikerIDX.current],
                    });
                    setNonStriker({
                        ...nonStriker,
                        name: data.homePlayers[nonStrikerIDX.current],
                        runs: data.homeBatsmenRuns[nonStrikerIDX.current],
                        balls: data.homeBatsmenBallsFaced[nonStrikerIDX.current],
                    });
                    setBowler({
                        ...bowler,
                        name: data.awayPlayers[bowlerIDX.current],
                        overs: data.awayBowlerBallsBowled[bowlerIDX.current],
                        runs: data.awayBowlerRunsGiven[bowlerIDX.current],
                        wickets: data.awayBowlerWickets[bowlerIDX.current],
                        extras: data.awayBowlerExtras[bowlerIDX.current],
                    });
                } else {
                    console.log("IN here");
                    setStriker({
                        ...striker,
                        name: data.awayPlayers[strikerIDX.current],
                        runs: data.awayBatsmenRuns[strikerIDX.current],
                        balls: data.awayBatsmenBallsFaced[strikerIDX.current],
                    });
                    setNonStriker({
                        ...nonStriker,
                        name: data.awayPlayers[nonStrikerIDX.current],
                        runs: data.awayBatsmenRuns[nonStrikerIDX.current],
                        balls: data.awayBatsmenBallsFaced[nonStrikerIDX.current],
                    });
                    setBowler({
                        ...bowler,
                        name: data.homePlayers[bowlerIDX.current],
                        overs: data.homeBowlerBallsBowled[bowlerIDX.current],
                        runs: data.homeBowlerRunsGiven[bowlerIDX.current],
                        wickets: data.homeBowlerWickets[bowlerIDX.current],
                        extras: data.homeBowlerExtras[bowlerIDX.current],
                    });
                }
                if(firstRender.current && currInnings.current === 1){
                    let allBatsmen = data.homePlayers.map((player, index) => {
                        if (index < 2) {
                        } else {
                            return player;
                        }
                    });
                    allBatsmen = allBatsmen.filter((batsman)=>(batsman !== undefined))
                    batsmen.current = allBatsmen;
                    firstRender.current = false;
                } else if (firstRender.current && currInnings.current === 2) {
                    let allBatsmen = data.awayPlayers.map((player, index) => {
                        if (index < 2) {
                        } else {
                            return player;
                        }
                    });
                    allBatsmen = allBatsmen.filter((batsman)=>(batsman !== undefined))
                    batsmen.current = allBatsmen;
                    firstRender.current = false;
                }
                
                if(currInnings === 1){
                    setBowlers(data.awayPlayers);
                } else {
                    setBowlers(data.homePlayers);
                }
            });
    });

    function swapStrikerNonStriker() {
        const tempIDX = nonStrikerIDX.current;
        nonStrikerIDX.current = strikerIDX.current;
        strikerIDX.current = tempIDX;
    }

    React.useEffect(() => {
        getMatchInfo();
    });

    const updateBowler = () => {
        const idx =
            bowlers.indexOf(bowler.name) === bowlers.length - 1
                ? 0
                : bowlers.indexOf(bowler.name) + 1;

        bowlerIDX.current = idx;
    };

    const updateBatsmen = () => {
        if (currInnings.current === 1) {
            const idx = homeData.homePlayers.indexOf(batsmen.current[0]);
            // const temp = {
            //     name: homeData.homePlayers[idx],
            //     balls: homeData.homeBatsmenBallsFaced[idx],
            //     runs: homeData.homeBatsmenRuns[idx],
            // };
            // setStriker(temp);
            strikerIDX.current = idx;
        } else {
            const idx = awayData.awayPlayers.indexOf(batsmen.current[0]);
            // const temp = {
            //     name: awayData.awayPlayers[idx],
            //     balls: awayData.awayBatsmenBallsFaced[idx],
            //     runs: awayData.awayBatsmenRuns[idx],
            // };
            // setStriker(temp);
            strikerIDX.current = idx;
        }
    };

    const handleEndOver = (event) => {
        swapStrikerNonStriker();
        updateBowler();
        const currentOver = currOver.current;
        currOver.current = currentOver+1;
        setCallOverEnd(true);
    };

    const updateBall = (value) => {
        setCurrentBall(value);
        if (value === "W") {
            const newBatsmen = batsmen.current.filter((batsman) => (batsman !== undefined && batsman !== striker.name));
            batsmen.current = newBatsmen;
            updateBatsmen();
            setRunsToSend(0);
            setWicketsToSend(1);
            setCallWicket(true);
        } else {
            setRunsToSend(parseInt(value, 10));
            setWicketsToSend(0);
            setCallWicket(false);
        }
        setBallSymbol(value);
    };

    const updateExtras = (value) => {
        setCurrentBall(currentBall + value);
        if (value === "") {
            setIsItExtra(false);
        } else {
            setIsItExtra(true);
            setBallSymbol(ballSymbol + value);
        }
    };

    const handleSave = (event) => {
        if (
            (!isItExtra && runsToSend % 2 !== 0) ||
            (isItExtra && runsToSend % 2 === 0)
        ) {
            swapStrikerNonStriker();
        }
        sendBallUpdate(runsToSend, wicketsToSend, ballSymbol, isItExtra);
    };

    const handleEndInnings = () => {
        currInnings.current = 2;
        currOver.current = 0;
        bowlerIDX.current = 0;
        strikerIDX.current = 0;
        nonStrikerIDX.current = 1;
        firstRender.current = true;
        
    };

    const handleEndMatch = (event) => {
        if (homeData.homeRuns > awayData.awayRuns) {
            setWinner(homeData.home);
        } else {
            setWinner(awayData.away);
        }

        fetch("http://localhost:9000/endMatch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: match,
                winner: winner,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));

        navigate(`/`);
    };

    const sendBallUpdate = (
        runsToSend,
        wicketsToSend,
        symbolToSend,
        isItExtra
    ) => {
        fetch("http://localhost:9000/ballUpdate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                matchID: match,
                batsman: striker,
                bowler: bowler,
                runsMade: runsToSend,
                wicketsTaken: wicketsToSend,
                inningsNo: currInnings,
                currentOver: currOver.current,
                ballSymbol: symbolToSend,
                isExtra: isItExtra,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    console.log(homeData.homeBowling[currOver.current].split(" "))

    return (
        <Styles>
            <Layout>
                {/* <ModalScoring home={homeData.home} away={awayData.away} setIsBattingFirst={setIsBattingFirst}/> */}
                <Jumbotron
                    searchList={searchList}
                    home={homeData.home}
                    away={awayData.away}
                />
                <Container fluid className="bg text pb-5 pt-5">
                    <Container fluid className="headers mt-3 mb-0 header-main">
                        <p className="blinking-live-icon"></p>
                        {currInnings.current === 1 ? (
                            <React.Fragment>
                                <h fluid className="vertical-align-middle">
                                    {" "}
                                    INNINGS {currInnings.current} - {homeData.home}
                                <br></br>
                                    {" "}
                                    {/* {homeData.awayRuns} / {homeData.homeWicketsLost} */}
                                 </h>
                            </React.Fragment>
                            
                        ) : (
                            <React.Fragment>
                                <h fluid className="vertical-align-middle">
                                    {" "}
                                    INNINGS {currInnings.current} - {awayData.away}
                                <br></br>
                                    {" "}
                                    {/* {awayData.homeRuns} / {awayData.awayWicketsLost} */}
                                 </h>
                            </React.Fragment>
                        )}
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
                                                <th width="100">On Strike</th>
                                                <th>Batsman</th>
                                                <th>R</th>
                                                <th>B</th>
                                                <th>SR</th>
                                            </tr>
                                        </thead>
                                        <tbody className="tbody">
                                            <tr>
                                                <th>
                                                    <p className="blinking-live-icon-2 me-3" />
                                                </th>
                                                <th>{striker.name}</th>
                                                <th>{striker.runs}</th>
                                                <th>{striker.balls}</th>
                                                <th>
                                                    {100*striker.runs /
                                                        striker.balls}
                                                </th>
                                            </tr>
                                        </tbody>
                                        <tbody className="tbody">
                                            <tr>
                                                <th></th>
                                                <th>{nonStriker.name}</th>
                                                <th>{nonStriker.runs}</th>
                                                <th>{nonStriker.balls}</th>
                                                <th>
                                                    {100*nonStriker.runs /
                                                        nonStriker.balls}
                                                </th>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Table>
                                        <thead className="thead">
                                            <tr>
                                                <th>Bowler</th>
                                                <th>O</th>
                                                <th>R</th>
                                                <th>W</th>
                                                <th>Extras</th>
                                            </tr>
                                        </thead>
                                        <tbody className="tbody">
                                            <tr>
                                                <th>{bowler.name}</th>
                                                <th>{bowler.overs}</th>
                                                <th>{bowler.runs}</th>
                                                <th>{bowler.wickets}</th>
                                                <th>{bowler.extras}</th>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <hr className="solid"></hr>
                                    {currInnings.current === 1 ? (
                                            <RenderOver
                                                balls={homeData.homeBowling[
                                                    currOver.current
                                                ].split(" ")}
                                                over={"Current Over"}
                                                overnumber={currOver.current}
                                            />
                                        ) : (
                                            <RenderOver
                                                balls={awayData.awayBowling[
                                                    currOver.current
                                                ].split(" ")}
                                                over={"Current Over"}
                                                overnumber={currOver.current}
                                            />
                                        )}
                                    <hr className="solid"></hr>
                                    <Table className="mb-0 mt-3">
                                        <tbody className="tbody">
                                            <tr>
                                                <ToggleButtonGroup
                                                    type="radio"
                                                    name="runs"
                                                    id="runs"
                                                    defaultValue={""}
                                                    onChange={updateBall}
                                                >
                                                    {" "}
                                                    {/* sendBallUpdate(runsToSend, wicketsToSend, symbolToSend, isItExtra) */}
                                                    <ToggleButton
                                                        value={"0"}
                                                        id="tbg-radio-1"
                                                        className="rounded-circle dot"
                                                        name="runs"
                                                    >
                                                        .
                                                    </ToggleButton>
                                                    <ToggleButton
                                                        value={"1"}
                                                        id="tbg-radio-2"
                                                        className="rounded-circle one"
                                                        name="runs"
                                                    >
                                                        1
                                                    </ToggleButton>
                                                    <ToggleButton
                                                        value={"2"}
                                                        id="tbg-radio-3"
                                                        className="rounded-circle one"
                                                        name="runs"
                                                    >
                                                        2
                                                    </ToggleButton>
                                                    <ToggleButton
                                                        value={"3"}
                                                        id="tbg-radio-4"
                                                        className="rounded-circle one"
                                                        name="runs"
                                                    >
                                                        3
                                                    </ToggleButton>
                                                    <ToggleButton
                                                        value={"4"}
                                                        id="tbg-radio-5"
                                                        className="rounded-circle four"
                                                        name="runs"
                                                    >
                                                        4
                                                    </ToggleButton>
                                                    <ToggleButton
                                                        value={"5"}
                                                        id="tbg-radio-6"
                                                        className="rounded-circle four"
                                                        name="runs"
                                                    >
                                                        5
                                                    </ToggleButton>
                                                    <ToggleButton
                                                        value={"6"}
                                                        id="tbg-radio-7"
                                                        className="rounded-circle six"
                                                        name="runs"
                                                    >
                                                        6
                                                    </ToggleButton>
                                                    <ToggleButton
                                                        value={"W"}
                                                        id="tbg-radio-8"
                                                        className="rounded-circle wicket"
                                                        name="runs"
                                                    >
                                                        W
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Table className="mt-0 mb-0">
                                        <tbody className="tbody">
                                            <tr>
                                                <ToggleButtonGroup
                                                    type="radio"
                                                    name="extras"
                                                    id="extras"
                                                    defaultValue={""}
                                                    onChange={updateExtras}
                                                >
                                                    <ToggleButton
                                                        value={""}
                                                        id="extras-radio-4"
                                                        className="rounded-circle extras"
                                                        name="extras"
                                                    >
                                                        N/A
                                                    </ToggleButton>
                                                    <ToggleButton
                                                        value={"Wide"}
                                                        id="extras-radio-3"
                                                        className="rounded-circle extras"
                                                        name="extras"
                                                    >
                                                        Wide
                                                    </ToggleButton>
                                                    <ToggleButton
                                                        value={"B"}
                                                        id="extras-radio-2"
                                                        className="rounded-circle extras"
                                                        name="extras"
                                                    >
                                                        B
                                                    </ToggleButton>
                                                    <ToggleButton
                                                        value={"NB"}
                                                        id="extras-radio-1"
                                                        className="rounded-circle extras"
                                                        name="extras"
                                                    >
                                                        NB
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Table className="mt-0 mb-3">
                                        <tbody className="tbody">
                                            <tr>
                                                <Button
                                                    type="submit"
                                                    className="submit-buttons"
                                                    variant="primary"
                                                    onClick={handleSave}
                                                >
                                                    Save
                                                </Button>
                                                {/* {callWicket ? <ModalWicket onChange={updateBatsmen} batsmen={batsmen}/> : <input type="hidden"></input>} */}
                                                <Button
                                                    type="submit"
                                                    className="submit-buttons"
                                                    onClick={handleEndOver}
                                                    variant="primary"
                                                >
                                                    End Over
                                                </Button>
                                                {/* {callOverEnd ? <ModalOver onChange={updateBowler} bowlers={bowlers}/> : <input type="hidden"></input>} */}
                                                {currInnings.current === 1 ? (
                                                    <Button
                                                        type="submit"
                                                        className="submit-buttons"
                                                        onClick={
                                                            handleEndInnings
                                                        }
                                                        variant="primary"
                                                    >
                                                        End Innings
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="submit"
                                                        className="submit-buttons"
                                                        onClick={handleEndMatch}
                                                        variant="primary"
                                                    >
                                                        End Match
                                                    </Button>
                                                )}
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
                                    {currInnings.current === 1
                                        ? homeData.homeBowling.map(
                                              (over, index) => (
                                                  <RenderOver
                                                      balls={over.split(" ")}
                                                      over={`Over ${index}`}
                                                      overnumber={index}
                                                  />
                                              )
                                          )
                                        : awayData.awayBowling.map(
                                              (over, index) => (
                                                  <RenderOver
                                                      balls={over.split(" ")}
                                                      over={`Over ${index}`}
                                                      overnumber={index}
                                                  />
                                              )
                                          )}
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Container>
                <Footer />
            </Layout>
        </Styles>
    );
};

export default ScoringPage;
