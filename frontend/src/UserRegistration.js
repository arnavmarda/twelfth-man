//import needed libraries:
import React, {useState } from "react";

import NavbarSignup from "./components/NavbarSignup"
import Register from "./components/Registration";
import { Footer } from "./components/Footer";
import { Container, Stack } from 'react-bootstrap';
import { FaCopyright } from 'react-icons/fa';
import {BrowserRouter as Router, Link} from 'react-router-dom';


const UserRegistration = () =>{     
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        passwordVerification: "",
    });
    
    const inputs = [
        {
            id:1,
            name:"username",
            type:"text",
            placeholder:"Username",
            errorMessage:"Invalid username",
            pattern: "^[A-Za-z][A-Za-z0-9_]{5,29}$",
            required:true,
        },
        {
            id:2,
            name:"email",
            type:"email",
            placeholder:"Email",
            errorMessage:"Invalid email",
            pattern: "^[^W_]+w*(?:[.-]w*)*[^W_]+@[^W_]+(?:[.-]?w*[^W_]+)*(?:.[^W_]{2,})$",
            required:true,
        },
        {
            id:3,
            name:"password",
            type:"password",
            placeholder:"Password",
            errorMessage:"Need: 8-15 characters, one capitol, one special character",
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,15}$",
            required:true,
        },
        {
            id:4,
            name:"passwordVerification",
            type:"password",
            placeholder:"Re-enter Password",
            errorMessage:"Passwords must match",
            pattern: values.password,
            required:true,
        },
        {
            id:5,
            name:"hand",
            type:"text",
            placeholder:"Preferred hand",
            required:false,
        },
        {
            id:6,
            name:"position",
            type:"text",
            placeholder:"Preferred position",
            required:false,
        }
    ]


    const handleUp = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target)
    }

    const onChange = (e)=>{
        setValues({...values, [e.target.name]: e.target.value});
    }

    return (
        <div className="general" id="page">
            <NavbarSignup />
            <container className="Signup">
                <form className="SignupForm" onSubmit={handleUp}>
                <h3 className="RegistrationTitle"> Create Your Account </h3>
                    {inputs.map((input) =>
                        <Register 
                        key={input.id} 
                        {...input} 
                        value={values[input.name]}
                        onChange={onChange}
                        />
                    )}
                    <div className="RegistrationTitle">
                        <button className="RegistrationButton">Create Account</button>
                    </div>
                    <div>
                        <Link to="/" className="NavigationTitle">
                            <p className="LoginRedirect"> Already a user? Login here</p>
                        </Link>
                    </div>
                </form>
            </container>
            <Container fluid className="footer-copyright">
                <p className="copyright">
                    <FaCopyright size={20} color={"white"} /> Copyright 2022 Twelfth Man. All rights reserved.
                </p> 
             </Container>
        </div>
    )
}

export default UserRegistration;