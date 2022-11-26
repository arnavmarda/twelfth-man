import { Container, Navbar, Form, Button } from "react-bootstrap";
import React from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.jpg"; 

const Styles = styled.div`

    .navbar-brand {
        color: #FFD100;
        font-family: Georgia;
        padding-left: 25px;
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


export const NavigationBar = () => (
    <Styles className="sticky-top">
        <Navbar variant='dark' sticky="top">
            <Container>
                        <Navbar.Brand>
                            <img 
                             src={Logo}
                             width="90"
                             height="85"
                             className="d-inline-block align-middle"
                             alt=""
                             />
                             Twelfth Man
                        </Navbar.Brand>
                        <Form className="d-flex w-50">
                            <Form.Control
                            type="search"
                            placeholder="Search for a team or tournament"
                            className='mr-sm-2'
                            />
                            <Button type='submit'>Search</Button>
                        </Form>
                        <Form className='d-flex'>
                            <Button type='button' variant='outline-success' href='#create-team'>Create Team</Button>
                            <Button type='button' variant='outline-success' href='#create-tournament'>Create Tournament</Button>
                        </Form>
            </Container>
        </Navbar>
    </Styles>
    
)