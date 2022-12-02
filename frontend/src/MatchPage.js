import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Jumbotron } from "./components/JumbotronMatch";
import { Footer } from "./components/Footer";
import { Layout } from "./components/Layout";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

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

const MatchPage = ({searchList, match}) => {

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
        homeBowling: [],
        awayBowling: [],
        battingFirst: false,
    })
    const [isMatchOver, setIsMatchOver] = React.useState(false);

    const getMatchInfo = useCallback(() => {
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
            setHomeData({
                ...homeData,
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
                ...awayData,
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
            setIsMatchOver(data.isMatchOver);
        })
    }, []);

    useEffect(() => {
        getMatchInfo();
    }, []);

            return (
                <Styles>
                    <Layout>
                    <Jumbotron home={homeData} away={awayData} searchList={searchList} isMatchOver={isMatchOver}/>
                        {(isMatchOver) ? (
                            <React.Fragment>
                            <Container fluid className="bg text pb-5">
                                <Container className="pt-5 pb-1">
                                    <Row>
                                        <Col className="ms-3">
                                            <Container fluid className="team-name m-3">
                                                <h fluid>{homeData.home}</h>
                                            </Container>
                                            <Container className="col-border m-3">
                                                <Table striped hover className="mt-3">
                                                    <thead className="thead">
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Player</th>
                                                            <th>R</th>
                                                            <th>B</th>
                                                            <th>SR</th>
                                                        </tr>
                                                    </thead>
                                                    {homeData.homeBatsmenRuns.map((batsman, index) => (
                                                        <tbody className="tbody">
                                                            <tr>
                                                                <th>{index+1}</th>
                                                                <th>{batsman}</th>
                                                                <th>{homeData.homeBatsmenRuns[index]}</th>
                                                                <th>{homeData.homeBatsmenBallsFaced[index]}</th>
                                                                <th>{homeData.homeBatsmenRuns[index]/homeData.homeBatsmenBallsFaced[index]}</th>
                                                            </tr>
                                                        </tbody>
                                                    ))}
                                                    <tbody className="tbody">
                                                        <tr>
                                                            <th>Total</th>
                                                            <th></th>
                                                            <th>({homeData.homeWicketsLost} wickets)</th>
                                                            <th>{homeData.homeRuns}</th>
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
                                                            <th>R</th>
                                                            <th>W</th>
                                                            <th>Extras</th>
                                                        </tr>
                                                    </thead>
                                                    {awayData.awayPlayers.map((bowler, index) => (
                                                       <tbody className="tbody">
                                                            <tr>
                                                                <th>{bowler}</th>
                                                                <th>{awayData.awayBowlerBallsBowled[index]}</th>
                                                                <th>{awayData.awayBowlerRunsGiven[index]}</th>
                                                                <th>{awayData.awayBowlerWickets[index]}</th>
                                                                <th>{awayData.awayBowlerExtras[index]}</th>
                                                            </tr>
                                                        </tbody> 
                                                    ))}
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
                                                    {awayData.awayBatsmenRuns.map((batsman, index) => (
                                                        <tbody className="tbody">
                                                            <tr>
                                                                <th>{index+1}</th>
                                                                <th>{batsman}</th>
                                                                <th>{awayData.awayBatsmenRuns[index]}</th>
                                                                <th>{awayData.awayBatsmenBallsFaced[index]}</th>
                                                                <th>{awayData.awayBatsmenRuns[index]/homeData.awayBatsmenBallsFaced[index]}</th>
                                                            </tr>
                                                        </tbody>
                                                    ))}
                                                    <tbody className="tbody">
                                                        <tr>
                                                            <th>Total</th>
                                                            <th></th>
                                                            <th>({awayData.awayWicketsLost} wickets)</th>
                                                            <th>{awayData.awayRuns}</th>
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
                                                            <th>R</th>
                                                            <th>W</th>
                                                            <th>Extras</th>
                                                        </tr>
                                                    </thead>
                                                    {homeData.homePlayers.map((bowler, index) => (
                                                       <tbody className="tbody">
                                                            <tr>
                                                                <th>{bowler}</th>
                                                                <th>{homeData.homeBowlerBallsBowled[index]}</th>
                                                                <th>{homeData.homeBowlerRunsGiven[index]}</th>
                                                                <th>{homeData.homeBowlerWickets[index]}</th>
                                                                <th>{homeData.homeBowlerExtras[index]}</th>
                                                            </tr>
                                                        </tbody> 
                                                    ))}
                                                </Table>
                                            </Container>
                                            <Container />
                                        </Col>
                                    </Row>
                                </Container>
                            </Container>
                            <Footer />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Container fluid className="bg text pb-5">
                                    <Row>
                                        <Container fluid className="team-name m-3">
                                            <h fluid>Match has not been played.</h>
                                            <br />
                                            <Link to={`/scoring-${match}`}><Button>Start Scoring Game</Button></Link>
                                        </Container>
                                    </Row>
                                </Container>
                            </React.Fragment>
                        )}
                    </Layout>
                </Styles>
            )
}

export default MatchPage;