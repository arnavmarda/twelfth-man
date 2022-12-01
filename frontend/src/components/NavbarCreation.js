import { Container, Navbar, Nav } from "react-bootstrap";
import React from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.jpg"; 
import { Link } from "react-router-dom";


const Styles = styled.div`

    .nav-link {
        color: #FFD100;
        font-family: Georgia;
        padding-left: 25px;
        text-decoration: none;
    }

    .navbar {
        background-color: #005587;
        height: 75px;
    }
    
    .btn {
        background-color: #FFB81C;
        color: black;
        margin: 3px;
    }
`;


export const NavigationBar = () => {

    return (
        <Styles className="sticky-top">
            <Navbar variant='dark' sticky="top">
                <Container>
                    <Nav.Link>
                        <Link to="/"> 
                            <img 
                            src={Logo}
                            width="90"
                            height="85"
                            className="d-inline-block align-middle"
                            alt=""
                            />
                        </Link>
                        Twelfth Man
                    </Nav.Link>
                </Container>
            </Navbar>
        </Styles>
    )
}