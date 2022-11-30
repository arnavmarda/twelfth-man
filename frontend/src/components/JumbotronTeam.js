import React from 'react';
import styled from 'styled-components';
import bgpicture from '../assets/team-jumbo.jpg';
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

    .tournament-header {
        position: relative;
        top: 80%;
        padding: 0;
        margin: 0;
        text-align: center;
        color: #00FFFF;
        font-size: 60px;
        font-weight: bold;
    }
`;


export const Jumbotron = () => (
    <Styles>
        <NavigationBar />
        <div className="p-5 mb-0 rounded-1 jumbo">
            <div className='overlay'></div>
            <div className="container-fluid py-5">
               <p className="tournament-header">Team Name</p>
            </div>
        </div>
    </Styles>
);
