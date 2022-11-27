//import needed libraries:
import React from "react";
import Logo from "../src/assets/logo.jpg"; 
import '../src/components/css-files/UserRegistration.css'
import {BrowserRouter as Router, Link} from 'react-router-dom';

class UserRegistration extends React.Component {
    render() {
        return (
            <nav>
                <img className="NavigationImage" src={Logo} alt="Logo"/> 
                <Link to="/" className="NavigationText">
                    <p> Twelfth Man</p>
                </Link>
                <button className="Button2">Login</button>
            </nav>
        )
    }
}

export default UserRegistration;