import React, { useState, Component } from 'react';
import { Container } from 'react-bootstrap';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavbarTournament';
import { FooterLogin } from './components/FooterLogin';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Register from "./components/Registration";
import { Footer } from './components/Footer';


const LoginPage = () => {

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        passwordVerification: "",
    });
    
    const inputs = [
        {
            id:1,
            name:"Tournament Name",
            type:"name",
            placeholder:"Tournament Name",
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
            <NavigationBar />
            <container className="Signup">
                <form className="SignupForm" onSubmit={handleUp}>
                <h3 className="RegistrationTitle"> Create a Tournament </h3>
                    {inputs.map((input) =>
                        <Register 
                        key={input.id} 
                        {...input} 
                        value={values[input.name]}
                        onChange={onChange}
                        />
                    )}
                    <div className="optionalInputs">
                        <p className="INPUT">Tounament Size:</p>
                            <select required="true">
                                <option>2</option>
                                <option>4</option>
                                <option>8</option>
                                <option>16</option>
                            </select>
                    </div>
                    <div className="RegistrationTitle">
                        <button type="submit" id="tournamentSubmit" className="RegistrationButton">Create tournament</button>
                    </div>
                </form>
                <FooterLogin />
            </container>
        </div>
    )
}


export default LoginPage;