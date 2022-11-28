import React, { useState, Component } from 'react';
import { Layout } from './components/Layout';
import { RegistrationNavbar } from './components/RegistrationNavbar';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Register from "./components/Registration";
import { FaCopyright } from 'react-icons/fa';
import { Container} from 'react-bootstrap';

const LoginPage = () =>{

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        passwordVerification: "",
    });
    
    const inputs = [
        {
            id:1,
            name:"email",
            type:"email",
            placeholder:"Email",
            errorMessage:"Invalid email!",
            required:true,
        },
        {
            id:2,
            name:"password",
            type:"password",
            placeholder:"Password",
            errorMessage:"Invalid password",
            required:true,
        },
    ]

    const handleUp = (e) =>{
        e.preventDefault();
        // eslint-disable-next-line 
        const data = new FormData(e.target)
    }
    const onChange = (e)=>{
        setValues({...values, [e.target.name]: e.target.value});
        console.log("Hi");
    }
    return(
        <div className="general" id="page">
            <styles>
                <Layout>
                <div>
                    <RegistrationNavbar />
                </div>
                    <container className="Signup">
                        <form className="SignupForm" onSubmit={handleUp}>
                            <h3 id="RegistrationTitle"> Login </h3>
                                {inputs.map((input) =>
                                    <Register 
                                    key={input.id} 
                                    {...input} 
                                    value={values[input.name]}
                                    onChange={onChange}
                                    />
                                )}
                            <div className="RegistrationTitle">
                                <button type="submit" id="RegistrationButton">Login</button>
                            </div>
                            <div>
                                <Link to="/registration" className="NavigationTitle">
                                    <p id="LoginRedirect"> Already a user? Sign up here</p>
                                </Link>
                            </div>
                        </form>
                        <Container fluid className="footer-copyright">
                            <p className="copyright">
                                <FaCopyright size={20} color={"white"} /> Copyright 2022 Twelfth Man. All rights reserved.
                            </p> 
                        </Container>
                </container>
                </Layout>
            </styles>
        </div>
    )
}

export default LoginPage;