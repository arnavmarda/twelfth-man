import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavbarTournament';
import { FooterLogin } from './components/FooterLogin';
import { Link, Navigate } from 'react-router-dom';
import Register from "./components/Registration";
import M from "materialize-css";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navigate = useNavigate();

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
            errorMessage:"Invalid email",
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

    const handleUp = (e) => {
        e.preventDefault();
        fetch("http:localhost:9000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.error) {
                M.toast({ html: data.error, classes: "#b71c1c red darken-4" });
                console.log("ERROR");
            } else {
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("hand", data.hand);
                localStorage.setItem("position", data.position);
                localStorage.setItem("player-id", data.registrationID);
                localStorage.setItem("name", data.name);
                console.log("NO ERROR");
                navigate("/user");
            } 
        })
        .catch((error) => console.log("Error: ", error));
    }

    const onChange = (e)=>{
        setValues({...values, [e.target.name]: e.target.value});
        console.log("Hi");
    }
    return(
        <div id="page" className='general'>
            <Layout>
                <NavigationBar />
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
                                    <p id="LoginRedirect"> Not a user? Sign up here!</p>
                                </Link>
                            </div>
                        </form>
                        <FooterLogin />
                </container>
            </Layout>
        </div>
    )
}


export default LoginPage;