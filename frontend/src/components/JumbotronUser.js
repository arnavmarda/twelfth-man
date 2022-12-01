import React from 'react';
import styled from 'styled-components';
import bgpicture from '../assets/user-jumbo.jpg';
import { NavigationBar } from './NavbarUser';
import { FaUserAlt } from 'react-icons/fa';

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

    .user-icon {
        position: relative;
        top: 50%;
        left: 5%;
        padding: 20px;
        border-style: solid;
        border-width: thick;
        border-color: white;
    }

    .player-name {
        position: absolute;
        top: 23%;
        left: 28%;
        font-family: Georgia, serif;
        font-size: 25px;
        font-weight: bold;
        padding: 0;
    }

    .player-info {
        position: absolute;
        top: 39%;
        left: 28%;
        text-align: left;
        font-family: Georgia, serif;
        font-size: 20px;
        padding: 5px;
    }
`;


export const Jumbotron = ({name, hand, position, playerId, searchList}) => (
    <Styles>
        <NavigationBar searchList={searchList}/>
        <div className="p-5 mb-0 rounded-1 jumbo">
            <div className='overlay'></div>
            <div className="container-fluid py-5">
                <FaUserAlt size={200} color={"white"} className="user-icon"/>
                <p className="player-name">{name}</p>
                <p className='player-info'>
                    Player ID: {playerId} <br />
                    Position: {position}<br />
                    Bowling Handedness: {hand}<br />
                    Batting Handedness: {hand}<br />
                </p>
            </div>
        </div>
    </Styles>
);
