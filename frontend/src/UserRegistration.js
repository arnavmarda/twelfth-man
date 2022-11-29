//import needed libraries:
import React, {useState } from "react";
import Register from "./components/Registration";
// eslint-disable-next-line 
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { NavigationBar } from "./components/NavbarTournament";
import { FooterLogin } from "./components/FooterLogin";
import './components/css-files/UserRegistration.css';
import { useNavigate } from "react-router-dom";



const UserRegistration = () =>{     
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        passwordVerification: "",
    });

    var navigate = useNavigate();
    
    const inputs = [
        {
            id:1,
            name:"username",
            type:"text",
            placeholder:"Username",
            errorMessage:"Username must only contain alphumeric characters and must be between 5-29 characters long.",
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
            errorMessage:"Needs: 8-15 characters, one capital, and one special character",
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
    ]

    const handleUp = (e) =>{
        e.preventDefault();
        // eslint-disable-next-line 
        const data = new FormData(e.target);
        navigate('/user');
    }

    const onChange = (e)=>{
        setValues({...values, [e.target.name]: e.target.value});
        console.log("Hi");
    }

    return (
        <div className="general" id="page">
            <NavigationBar />
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
                    <div className="optionalInputs">
                        <p className="INPUT">Preferred Hand:</p>
                            <select required="true">
                                <option>None</option>
                                <option>Left</option>
                                <option> Right</option>
                            </select>
                    </div>
                    <div className="optionalInputs">
                        <p className="INPUT">Preferred Position:</p>
                            <select required="true">
                                <option>None</option>
                                <option>Batter</option>
                                <option>Bowler</option>
                                <option>Keeper</option>
                                <option>All-rounder</option>
                            </select>
                    </div>
                    <div className="RegistrationTitle">
                        <button type="submit" className="RegistrationButton">Create Account</button>
                    </div>
                    <div>
                        <Link to="/login" className="NavigationTitle">
                            <p className="LoginRedirect"> Already a user? Login here</p>
                        </Link>
                    </div>
                </form>
                <FooterLogin />
            </container>
        </div>
    )
}

export default UserRegistration;