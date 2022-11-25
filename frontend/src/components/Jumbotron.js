import React from 'react';
import styled from 'styled-components';
import stadium from '../assets/stadium.jpg';
import { NavigationBar } from './Navbar';

const Styles = styled.div`

    .jumbo {
        background: url(${stadium}) no-repeat fixed bottom;
        background-size: cover;
        z-index: -2;
        height: 400px;
        opacity: 0.9;
    }
`;


export const Jumbotron = () => (
    <Styles>
        <NavigationBar />
        <div className="p-5 mb-0 rounded-1 jumbo">
            <div className="container-fluid py-5">
                <h1 className='display-5 fw-bold'>Twelfth Man</h1>
                <p className='col-md-10 fs-4'>
                    Twelfth Man will be a Web Application for team-by-team game and tournament management for cricket, which includes implementations of match scoring, tournament setups and statistics, individual and team registration, and friendly game creations.
                </p>
            </div>
        </div>
    </Styles>
);
