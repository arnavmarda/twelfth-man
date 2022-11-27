//import needed libraries:
import React from "react";
import Logo from "../assets/logo.jpg"; 
import '../components/css-files/UserRegistration.css'
// eslint-disable-next-line
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default function NavbarSignup()
{
    
    return (
        <div>
                <nav>
                    <img className="NavigationImage" src={Logo} alt="Logo"/> 
                    <Link to="/" className="NavigationText">
                        <p> Twelfth Man</p>
                    </Link>
                    <button className="Button2">Login</button>
                </nav>
        </div>
    )
} 