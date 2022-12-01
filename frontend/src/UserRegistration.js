//import needed libraries:
import React, { useState } from "react";
import Register from "./components/Registration";
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import { NavigationBar } from "./components/NavbarCreation";
import { FooterLogin } from "./components/FooterLogin";
import "./components/css-files/UserRegistration.css";
import { useNavigate } from "react-router-dom";
import { DropdownRadio } from "./components/DropdownRadio";
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from "react-toastify";

const UserRegistration = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        passwordVerification: "",
        hand: "",
        position: "",
    });

    var navigate = useNavigate();

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "First and Last Name",
            // errorMessage:"Username must only contain alphumeric characters and must be between 6-29 characters long.",
            // pattern: "^[A-Za-z][A-Za-z0-9_]{5,29}$",
            required: true,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "Invalid email",
            pattern:
                "^[^W_]+w*(?:[.-]w*)*[^W_]+@[^W_]+(?:[.-]?w*[^W_]+)*(?:.[^W_]{2,})$",
            required: true,
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
                "Needs: 8-15 characters, one capital, and one special character",
            pattern:
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,15}$",
            required: true,
        },
        {
            id: 4,
            name: "passwordVerification",
            type: "password",
            placeholder: "Re-enter Password",
            errorMessage: "Passwords must match",
            pattern: values.password,
            required: true,
        },
    ];

    const handleUp = (e) => {
        e.preventDefault();
        fetch("http://localhost:9000/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password,
                hand: values.hand.label,
                position: values.position.label,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.error){
                    const errorMsg = data.error.toString();
                    toast.error(errorMsg, 
                    {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            })
            .catch((err) => console.log("Error: " + err));

        navigate("/");
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleHands = (hand) => {
        setValues({ ...values, hand: hand });
    };

    const hands = [
        { value: "Left", label: "Left" },
        { value: "Right", label: "Right" },
    ];

    const handlePosition = (position) => {
        setValues({ ...values, position: position });
    };

    const positions = [
        { value: "Batter", label: "Batter" },
        { value: "Bowler", label: "Bowler" },
        { value: "Keeper", label: "Keeper" },
        { value: "All-rounder", label: "All-rounder" },
    ];

    return (
        <div className="general" id="page">
            <NavigationBar />
            <container className="Signup">
                <form id="form1" className="SignupForm" onSubmit={handleUp}>
                    <h3 className="RegistrationTitle"> Create Your Account </h3>
                    {inputs.map((input) => (
                        <Register
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <DropdownRadio
                        handleChange={handleHands}
                        options={hands}
                        selectedOptions={values.hand}
                        placeholder={"Select your preferred hand"}
                    />
                    <DropdownRadio
                        handleChange={handlePosition}
                        options={positions}
                        selectedOptions={values.position}
                        placeholder={"Select your preferred position"}
                    />
                    <div className="RegistrationTitle">
                        <button
                            type="submit"
                            form="form1"
                            className="RegistrationButton"
                        >
                            Create Account
                        </button>
                        <ToastContainer />
                    </div>
                    <div>
                        <Link to="/login" className="NavigationTitle">
                            <p className="LoginRedirect">
                                {" "}
                                Already a user? Login here
                            </p>
                        </Link>
                    </div>
                </form>
                <FooterLogin />
            </container>
        </div>
    );
};

export default UserRegistration;
