//import needed libraries:
import React from "react";
import Logo from "../assets/logo.jpg"; 
// eslint-disable-next-line
import {BrowserRouter as Router, Link} from 'react-router-dom';
import '../components/css-files/Login.css'
import { Navbar, NavItem } from "react-bootstrap";

export const RegistrationNavbar = () => (
    <div className="Initial">
        <Navbar>
            <NavItem>
                <container id="nav--container1">
                    <img className="nav--image"
                        src={Logo}
                        alt="Logo"
                    />
                    <Link to="/" id="nav--homeLink">
                        Twelfth-Man
                    </Link>
                </container>
                
                <container id="nav--container2">
                    <Link to="/registration" id="nav--homeLink">
                        <button id="nav--button1">Sign Up</button>
                    </Link>
                    <Link to="/login" id="nav--homeLink">
                        <button id="nav--button2">Log in</button>
                    </Link>
                </container>
            </NavItem>
        </Navbar>
    </div>
)
