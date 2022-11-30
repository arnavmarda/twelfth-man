import React, { Component } from 'react';
import styled from 'styled-components';
import { Jumbotron } from './components/Jumbotron';
import { Layout } from "./components/Layout";
import { MatchCarousel } from './components/MatchCarousel';
import backgroundImg from './assets/home-bg.jpg';
import { Col, Container, Row } from 'react-bootstrap';
import { TbTournament } from 'react-icons/tb';
import { BsGeoFill } from 'react-icons/bs';
import { Footer } from "./components/Footer";

const Styles = styled.div`

    .features {
        background: url(${backgroundImg}) fixed no-repeat bottom;
        background-size: cover;
        height: 600px;
        z-index: -2;
    }

    .features-overlay {
        background-color: #DAEBFE;
        background-size: cover;
        opacity: 0.5;
        height: 100%;
        z-index: -1;
    }

    .features-component {
        height: 400px;
        width: 33.33333333%
        position: relative;
        margin: 25px;
        margin-top: 50px;
        padding: 15px;
        border-style: solid;
        border-width: 2px;
        border-radius: 50% 20% / 10% 40%;
        border-color: #FFB81C;
        background-color: #FFB81C;
        background-size: cover;
        z-index: 0;
        opacity: 1;
        text-align: center;
    }

    .blinking-live-icon {
        background-color: #1c87c9;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        border: none;
        color: #eeeeee;
        display: inline-block;
        padding: 5px 12.5px;
        text-align: center;
        text-decoration: none;
        top: 15%;
        position: relative;
        height: 25px;
        margin: 0;
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

    .feature-titles {
        font-weight: bold;
        font-size: 30px;
        font-family: Georgia;
        padding: 0;
        top: 20%;
        position: relative;
        text-align: center;
    }
    
    .feature-info {
        font-size: 17px;
        font-family: Georgia;
        padding-left: 20px;
        padding-right: 20px;
        position: relative;
        top: 30%;
        text-align: center;
    }

    .feature-icon {
        text-align: center;
        text-decoration: none;
        top: 15%;
        position: relative;
        height: 30px;
        margin: 0;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        border: none;
        display: inline-block;
    }

    .react-icons {
        height: 30px;
    }
`;


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: localStorage.getItem("jwt") ? true : false,
        }
    }

    render() {
        return (  
            <Styles>
                <Layout>
                    <Jumbotron isLoggedIn={this.state.isLoggedIn}/>
                    <MatchCarousel />
                    <Container fluid className='features'>
                            <Row>
                                <Col className='features-component'>
                                    <p className='blinking-live-icon'></p>    
                                    <p className='feature-titles'>Live Scoring</p>
                                    <p className='feature-info'>Use Twelfth Man to update match scores live. The wesbite will display live scores and past scorecards for the scored match.</p>
                                </Col>
                                <Col className='features-component'>
                                    <p className='feature-icon'><TbTournament size={35} /></p>
                                    <p className='feature-titles'>Tournament Creation</p>
                                    <p className='feature-info'>Twelfth Man allows you to efficiently create and manage tournaments with live and past scores, player rankings and tournament trees and brackets.</p>
                                </Col>
                                <Col className='features-component'>
                                    <p className='feature-icon'><BsGeoFill size={35} /></p>
                                    <p className='feature-titles'>Organize Friendlies</p>
                                    <p className='feature-info'>Twelfth Man searches for teams near you based on past performances and suggests teams to play friendly matches with.</p>
                                </Col>
                            </Row>
                    </Container>
                    <Footer />
                </Layout>
            </Styles>          

        )
    }
}

export default Home;