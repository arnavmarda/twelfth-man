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

const ScoringPage = ({searchList, match}) => {
    const navigate = useNavigate();

    const [currentBall, setCurrentBall] = React.useState("");
    const [callOverEnd, setCallOverEnd] = React.useState(false);
    const [callWicket, setCallWicket] = React.useState(false);
    const [firstRender, setFirstRender] = React.useState(true);
    const [winner, setWinner] = React.useState("");
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
    })
    const [currInnings, setCurrInnings] = React.useState(1);
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
    })
    const [batsmen, setBatsmen] = React.useState([]);
    const [bowlers, setBowlers] = React.useState([]);
    const [currOver, setCurrOver] = React.useState(0);

    const getMatchInfo = React.useCallback(() => {
        fetch("http://localhost:9000/match/getInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: match,
            }) 
        })
        .then(response => response.json())
        .then(data => {
            console.log("DATA:");
            console.log(data);
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
            if(firstRender){
                setStriker({
                    ...striker,
                    name: data.homePlayers[0],
                    runs: data.homeBatsmenRuns[0],
                    balls: data.homeBatsmenBallsFaced[0],
                });
                setNonStriker({
                    ...nonStriker,
                    name: data.homePlayers[1],
                    runs: data.homeBatsmenRuns[1],
                    balls: data.homeBatsmenBallsFaced[1],
                });
                setBowler({
                    ...bowler, 
                    name: data.awayPlayers[0],
                    overs: data.awayBowlerBallsBowled[0],
                    runs: data.awayBowlerRunsGiven[0],
                    wickets: data.awayBowlerWickets[0],
                    extras: data.awayBowlerExtras[0]
                })
                let allBatsmen = data.homePlayers.map((player, index) => {
                    if(index < 2){
                    } else{
                        return player;
                    }
                })
                setBatsmen(allBatsmen);
                setBowlers(data.awayPlayers);
                setFirstRender(false);
            }
        })
    }, []);

    function swapStrikerNonStriker(){
        let temp = {
            name: nonStriker.name,
            runs: nonStriker.runs,
            balls: nonStriker.balls,
        }
        setNonStriker(striker);
        setStriker(temp);
    };

    React.useEffect(() => {
        getMatchInfo();
        console.log("called useEffect");
        console.log(awayData.awayBowling[currOver].split(" "));
    });

    const handleEndOver = (event) => {
        swapStrikerNonStriker();
        setCurrOver(currOver + 1);
        setCallOverEnd(true);
    }

    const updateBall = (value) => {
        setCurrentBall(value);
        if (value === "W") {
            const newBatsmen = batsmen.map((batsman) => {
                if(batsman !== striker.name){
                    return batsman;
                }
            })
            setBatsmen(newBatsmen);
            setRunsToSend(0);
            setWicketsToSend(1);
            setCallWicket(true);
        } else {
            setRunsToSend(parseInt(value, 10));
            setWicketsToSend(0);
            setCallWicket(false);
        }
        setBallSymbol(value);
    }

    const updateExtras = (value) => {
        setCurrentBall(currentBall+value);
        if (value === "") {
            setIsItExtra(false);
        } else {
            setIsItExtra(true);
            setBallSymbol(ballSymbol + value);
        }
    }

    const handleSave = (event) => {

        sendBallUpdate(runsToSend, wicketsToSend, ballSymbol, isItExtra);
        if((!isItExtra && runsToSend % 2 !== 0) || (isItExtra && runsToSend % 2 === 0)){
            swapStrikerNonStriker();
        }

    }

    const updateBowler = (newBowler) => {
        const idx = bowlers.indexOf(newBowler);
        if(currInnings === 1){
            const temp = {
                name: awayData.awayPlayers[idx],
                overs: awayData.awayBowlerBallsBowled[idx],
                runs: awayData.awayBowlerRunsGiven[idx],
                wickets: awayData.awayBowlerWickets[idx],
                extras: awayData.awayBowlerExtras[idx],
            }
            setBowler(temp);
        } else {
            const temp = {
                name: homeData.homePlayers[idx],
                overs: homeData.homeBowlerBallsBowled[idx],
                runs: homeData.homeBowlerRunsGiven[idx],
                wickets: homeData.homeBowlerWickets[idx],
                extras: homeData.homeBowlerExtras[idx],
            }
            setBowler(temp);
        }
    }
    
    const updateBatsmen = (newBatsman) => {
        
        if(currInnings === 1){
            const idx = homeData.homePlayers.indexOf(newBatsman);
            const temp = {
                name: homeData.homePlayers[idx],
                balls: homeData.homeBatsmenBallsFaced[idx],
                runs: homeData.homeBatsmenRuns[idx],
            }
            setStriker(temp);
        } else {
            const idx = awayData.awayPlayers.indexOf(newBatsman);
            const temp = {
                name: awayData.awayPlayers[idx],
                balls: awayData.awayBatsmenBallsFaced[idx],
                runs: awayData.awayBatsmenRuns[idx],
            }
            setStriker(temp);
        }
    }

    const handleEndInnings = (event) => {
        setCurrInnings(currInnings+1);

        setStriker({
            ...striker,
            name: awayData.awayPlayers[0],
            runs: awayData.awayBatsmenRuns[0],
            balls: awayData.awayBatsmenBallsFaced[0],
        });
        setNonStriker({
            ...nonStriker,
            name: awayData.awayPlayers[1],
            runs: awayData.awayBatsmenRuns[1],
            balls: awayData.awayBatsmenBallsFaced[1],
        });
        setBowler({
            ...bowler, 
            name: homeData.homePlayers[0],
            overs: homeData.homeBowlerBallsBowled[0],
            runs: homeData.homeBowlerRunsGiven[0],
            wickets: homeData.homeBowlerWickets[0],
            extras: homeData.homeBowlerExtras[0]
        })
        const allBatsmen = awayData.awayPlayers.map((player, index) => {
            if(index < 2){
            } else{
                return player;
            }
        })
        setBatsmen(allBatsmen);
        setBowlers(homeData.homePlayers);
    }

    const handleEndMatch = (event) => {
        if(homeData.homeRuns > awayData.awayRuns){
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
                winner: winner
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

        navigate(`/match-${match}`);
    }

    const sendBallUpdate = (runsToSend, wicketsToSend, symbolToSend, isItExtra) => {
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
                currentOver: currOver,
                ballSymbol: symbolToSend,
                isExtra: isItExtra,
            }) 
        }).then((response) => response.json())
        .then((data) => {
            console.log("Data from ball update (if any): ");
            console.log(data);
        })
        .catch((err) => console.log(err));
    }

    return (
        <Styles>
            <Layout>
                {/* <ModalScoring home={homeData.home} away={awayData.away} setIsBattingFirst={setIsBattingFirst}/> */}
                <Jumbotron searchList={searchList} home={homeData.home} away={awayData.away}/>
                <Container fluid className="bg text pb-5 pt-5">
                    <Container fluid className="headers mt-3 mb-0 header-main">
                        <p className="blinking-live-icon"></p>
                        {currInnings === 1 ? (
                            <h fluid className="vertical-align-middle"> INNINGS {currInnings} - {homeData.home}</h>
                        ) : (
                            <h fluid className="vertical-align-middle"> INNINGS {currInnings} - {awayData.away}</h>
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
                                                    <th><p className="blinking-live-icon-2 me-3" /></th>
                                                    <th>{striker.name}</th>
                                                    <th>{striker.runs}</th>
                                                    <th>{striker.balls}</th>
                                                    <th>{striker.runs / striker.balls}</th>
                                            </tr>
                                        </tbody>
                                        <tbody className="tbody">
                                            <tr>
                                                    <th></th>
                                                    <th>{nonStriker.name}</th>
                                                    <th>{nonStriker.runs}</th>
                                                    <th>{nonStriker.balls}</th>
                                                    <th>{nonStriker.runs / nonStriker.balls}</th>
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
                                    {(currInnings !== 1) ? (
                                        <RenderOver balls={homeData.homeBowling[currOver].split(" ")} over={'Current Over'} overnumber={currOver} />
                                    ) : (
                                        <RenderOver balls={awayData.awayBowling[currOver].split(" ")} over={'Current Over'} overnumber={currOver} />
                                    )}
                                    <hr className="solid"></hr>
                                    <Table className="mb-0 mt-3">
                                        <tbody className="tbody">
                                            <tr>
                                                <ToggleButtonGroup type="radio" name="runs" id="runs" defaultValue={""} onChange={updateBall}> {/* sendBallUpdate(runsToSend, wicketsToSend, symbolToSend, isItExtra) */}
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
                                                <ToggleButtonGroup type="radio" name="extras" id="extras" defaultValue={""} onChange={updateExtras}>
                                                    <ToggleButton value={""} id="extras-radio-4" className="rounded-circle extras" name="extras">N/A</ToggleButton>
                                                    <ToggleButton value={"Wide"} id="extras-radio-3" className="rounded-circle extras" name="extras">Wide</ToggleButton>
                                                    <ToggleButton value={"B"} id="extras-radio-2" className="rounded-circle extras" name="extras">B</ToggleButton>
                                                    <ToggleButton value={"NB"} id="extras-radio-1" className="rounded-circle extras" name="extras">NB</ToggleButton>
                                                </ToggleButtonGroup>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Table className="mt-0 mb-3">
                                        <tbody className="tbody">
                                            <tr>
                                                <Button type="submit" className="submit-buttons" variant="primary" onClick={handleSave}>Save</Button>
                                                {callWicket ? <ModalWicket onChange={updateBatsmen} batsmen={batsmen}/> : <input type="hidden"></input>}
                                                <Button type="submit" className="submit-buttons" onClick={handleEndOver} variant="primary">End Over</Button>
                                                {callOverEnd ? <ModalOver onChange={updateBowler} bowlers={bowlers}/> : <input type="hidden"></input>}
                                                {currInnings === 1 ? (
                                                    <Button type="submit" className="submit-buttons" onClick={handleEndInnings} variant="primary">End Innings</Button>
                                                ) : (
                                                    <Button type="submit" className="submit-buttons" onClick={handleEndMatch} variant="primary">End Match</Button>
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
                                { currInnings !== 1 ? (
                                    homeData.homeBowling.map((over, index) => (
                                        <RenderOver balls={over.split(" ")} over={`Over ${index}`} overnumber={index} />
                                    ))
                                ) : (
                                    awayData.awayBowling.map((over, index) => (
                                        <RenderOver balls={over.split(" ")} over={`Over ${index}`} overnumber={index} />
                                    ))
                                )}
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

export default ScoringPage;