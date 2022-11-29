import React from "react";
import styled from "styled-components";
import { Container, Stack } from 'react-bootstrap';
import Logo from "../assets/logo.jpg";
import { FaCopyright } from 'react-icons/fa';

const Styles = styled.div`

    .footer-main {
        background-color: #181818;
        background-size: cover;
        height: 200px;
    }

    .logo {
        position: relative;
        left: 10%;
        margin-right: 70px;
        margin-left: 30px;
    }

    .text {
        color: #FFB81C !important;
        vertical-align: middle;
        text-align: left;
        left: 40%
        font-family: Georgia;
        font-size: 75px;
        position: relative;
    }

    .footer-copyright {
        background-color: #000000;
        background-size: cover;
        height: 50px;
        text-align: center;
        position: relative;
    }

    .copyright {
        color: white;
        position: relative;
        font-family: Georgia;
        font-size: 15px;
        vertical-align: middle;
    }
`;

export const Footer = () => (
    <Styles>
        <Container fluid className="footer-main">
            <Stack direction="horizontal">
                <p>
                    <img src={Logo} alt="" height="200" width="200" className="logo"></img>
                </p>
                <p className="text">
                    Twelfth Man
                </p>
            </Stack>
        </Container>
        <Container fluid className="footer-copyright">
            <p className="copyright">
                <FaCopyright size={20} color={"white"} /> Copyright 2022 Twelfth Man. All rights reserved.
            </p>
        </Container>
    </Styles>
)