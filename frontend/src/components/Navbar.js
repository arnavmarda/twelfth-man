import { Container, Navbar, Form, Button } from "react-bootstrap";
import React from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.jpg"; 
import { Link } from "react-router-dom";

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
        <Navbar variant='dark' sticky="top" controls={false}>
            <Container>
                <Link to="/"> 
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
                </Link>
                <Form className="d-flex w-50">
                    <Form.Control
                    type="search"
                    placeholder="Search for a team or tournament"
                    className='mr-sm-2'
                    />
                    <Button type='submit'>Search</Button>
                </Form>
                <Form className='d-flex'>
                    <Button type='button' variant='outline-success' href='login'>Login</Button>
                    <Button type='button' variant='outline-success' href='sign-up'>Sign Up</Button>
                </Form>
            </Container>
        </Navbar>
    </Styles>
    
)