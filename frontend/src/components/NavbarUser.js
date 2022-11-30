import { Container, Navbar, Form, Button, Nav } from "react-bootstrap";
import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.jpg"; 
import { Link } from "react-router-dom";
import { DropdownSearch } from "./DropdownSearch";


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

    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (searchValue) => {
        setSearchValue(searchValue);
    }

    const searchList = [
        {values: "team", label: "Team 1"},
        {values: "team", label: "Team 2"},
        {values: "team", label: "Team 3"},
        {values: "tournament", label: "Tournament 1"},
        {values: "tournament", label: "Tournament 2"},
        {values: "tournament", label: "Tournament 3"},
        {values: "tournament", label: "Tournament 3"},
        {values: "tournament", label: "Tournament 3"},
        {values: "tournament", label: "Tournament 3"},
        {values: "tournament", label: "Tournament 3"},
        {values: "tournament", label: "Tournament 3"},
        {values: "tournament", label: "Tournament 3"},
        {values: "tournament", label: "Tournament 3"},
        {values: "tournament", label: "Tournament 3"},
        {values: "tournament", label: "Tournament 3"},
    ];

    return (
        <Styles className="sticky-top">
            <Navbar className="starter" variant='dark' sticky="top">
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
                    <Form className="d-flex w-50">
                        <DropdownSearch options={searchList} handleChange={handleSearch} selectedOption={searchValue} placeholder={"Search for a team or tournament"} />
                    </Form>
                    <Form className='d-flex'>
                        <Link to="/TeamCreation"><Button type='button' variant='outline-success' href='#create-team'>Create Team</Button></Link>
                        <Button type='button' variant='outline-success' href='#create-tournament'>Create Tournament</Button>
                    </Form>
                </Container>
            </Navbar>
        </Styles>
    )
}