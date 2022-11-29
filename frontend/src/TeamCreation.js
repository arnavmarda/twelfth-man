import React, { useState, Component } from 'react';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavbarTournament';
import { Footer } from './components/Footer';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Register from "./components/Registration";

const TeamCreation = () =>{
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        passwordVerification: "",
    });
    
    const inputs = [
        {
            id:1,
            name:"name",
            type:"string",
            placeholder:"Enter team name",
            required:true,
        },
        {
            id:2,
            name:"password",
            type:"string",
            placeholder:"Enter team captain",
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
    }

    return(
        <div className="TeamCreation" id="TeamCreation">
            <styles>
                <Layout>
                    <div>
                        <NavigationBar /> 
                    </div>
                    <container className="Signup">
                        <form className="SignupForm" onSubmit={handleUp}>
                            <h3 id="RegistrationTitle"> Create a team </h3>
                                {inputs.map((input) =>
                                    <Register 
                                    key={input.id} 
                                    {...input} 
                                    value={values[input.name]}
                                    onChange={onChange}
                                    />
                                )}
                            <div className="RegistrationTitle">
                                <button type="submit" id="RegistrationButton">Create Team</button>
                            </div>
                        </form>
                </container>
                <Footer />
                </Layout>
            </styles>
        </div>
    )
}

export default TeamCreation;