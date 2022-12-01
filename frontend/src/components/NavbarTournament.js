import { Container, Navbar, Form, Nav } from "react-bootstrap";
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
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


export const NavigationBar = ({searchList}) => {

    const [searchValue, setSearchValue] = useState();

    let navigate = useNavigate();

    const handleSearch = (searchValue) => {
        setSearchValue(searchValue);
        var goTo = `${searchValue.id}`;
        navigate(goTo);
    }

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
                    <Form className="d-flex w-50">
                        <DropdownSearch options={searchList} handleChange={handleSearch} selectedOption={searchValue} placeholder={"Search for a team or tournament"} />
                    </Form>
                </Container>
            </Navbar>
        </Styles>
    )
}