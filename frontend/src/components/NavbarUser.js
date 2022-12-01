import { Container, Navbar, Form, Button, Nav } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.jpg"; 
import { Link } from "react-router-dom";
import { DropdownSearch } from "./DropdownSearch";
import { useNavigate } from "react-router-dom";

const Styles = styled.div`

    .nav-link {
        color: #FFD100;
        font-family: Georgia;
        padding-left: 25px;
        text-decoration: none !important;
    }
    .a:link, .a:hover, .a: visited, .a:active {
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


export const NavigationBar = ({searchList}) => {

    var navigate = useNavigate();

    const [searchValue, setSearchValue] = useState();
    console.log("Search List: ", searchList);
    const handleSearch = (searchValue) => {
        setSearchValue(searchValue);
        var goTo = `${searchValue.id}`;
        navigate(goTo);
    }

    return(
        <Styles className="sticky-top">
            <Navbar variant='dark' sticky="top" controls={false}>
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
                        <Link to="/creatematch"><Button type='button' variant='outline-success' href='login'>Create Match</Button></Link>
                        <Link to="/createteam"><Button type='button' variant='outline-success' href='sign-up'>Create Team</Button></Link>
                        <Link to="/createtournament"><Button type='button' variant='outline-success' href='sign-up'>Create Tournament</Button></Link>
                    </Form>                
                </Container>
            </Navbar>
        </Styles>
    )
}