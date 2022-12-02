import React from 'react';
import styled from 'styled-components';
import bgpicture from '../assets/match-jumbo.jpg';
import teamIcon from '../assets/team-logo.jpg';
import { Image } from 'react-bootstrap';
import { NavigationBar } from './NavbarTournament';

const Styles = styled.div`

    .jumbo {
        background: url(${bgpicture}) no-repeat fixed bottom;
        background-size: cover;
        z-index: -2;
        height: 400px;
        color: white;
        position: relative;
    }

    .overlay {
        background-color: #000;
        opacity: 0.3;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }

    .team-logo-1 {
        position: absolute;
        top: 100px;
        left: 20%;
    }

    .team-name-1 {
        color: white;
        font-size: 30px;
        text-align: left;
        font-weight: bold;
        top: 45%;
        left: 35%;
        position: absolute;
    }

    .team-name-2 {
        color: white;
        font-size: 30px;
        text-align: left;
        font-weight: bold;
        top: 45%;
        right: 35%;
        position: absolute;
    }

    .team-logo-2 {
        position: absolute;
        top: 100px;
        right: 20%;
    }

    .versus {
        color: white;
        position: absolute;
        top: 35%;
        font-size: 100px;
        font-weight: bold;
        text-align: center;
        right: 47.5%
    }

    .date {
        position: absolute;
        top: 70%;
        right: 45%;
        color: white;
        font-size: 15px;
        text-align: center;
    }

    .logo-border {
        color: white;
        border-style: solid;
        border-color: white;
        border-width: normal;
        padding: 1px !important;
    }
`;


export const Jumbotron = ({searchList, home, away}) => (
    <Styles>
        <NavigationBar searchList={searchList} />
        <div className="p-5 mb-0 rounded-1 jumbo">
            <div className='overlay'></div>
            <div className="container-fluid py-5">
                <Image src={teamIcon} className="align-middle d-inline-block p-0 m-0 team-logo-1" width="250" height="250" />
                <p className='team-name-1'>{home}</p>
                <h className='versus'> V </h>
                <p className='team-name-2'>{away}</p>
                <Image src={teamIcon} className="align-middle d-inline-block p-0 m-0 team-logo-2" width="250" height="250" />
            </div>
        </div>
    </Styles>
);
