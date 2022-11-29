import React, { useState } from 'react';
import { NavigationBar } from './components/NavbarTournament';
import { FooterLogin } from './components/FooterLogin';
import {Link} from 'react-router-dom';
import Register from "./components/Registration";
import { DropdownChecklist } from "./components/DropdownChecklist";
import { DropdownRadio } from './components/DropdownRadio';



const LoginPage = () => {

    const [values, setValues] = useState({
        noOfTeams: "",
        teams: [],
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

    var number = ""

    const handleUp = (e) =>{
        e.preventDefault();
        // eslint-disable-next-line 
        // setValues({...values, noOfTeams: document.getElementById("noOfTeams").value});

        console.log(values)
    }
    const onChange = (e)=>{
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleTeams = (teams) => {
        setValues({...values, teams: teams});
    }

    const handleNoOfTeams = (noOfTeams) => {
        setValues({...values, noOfTeams: noOfTeams});
    }

    const noOfTeams = [
        {value: "2", label: "2"},
        {value: "4", label: "4"},
        {value: "8", label: "8"},
        {value: "16", label: "16"}
    ];

    const teams = [
        {value: "Team 1", label: "Team 1"},
        {value: "Team 2", label: "Team 2"},
        {value: "Team 3", label: "Team 3"},
        {value: "Team 4", label: "Team 4"},
    ];

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
                    {/* <div className="optionalInputs">
                        <p className="INPUT">Tounament Size:</p>
                            <select required="true" id="noOfTeams">
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                                <option value="16">16</option>
                            </select>
                    </div> */}
                    <DropdownRadio handleChange={handleNoOfTeams} options={noOfTeams} selectedOptions={values.noOfTeams} placeholder={"Choose the number of teams..."} />
                    <DropdownChecklist handleChange={handleTeams} options={teams} selectedOptions={values.teams} placeholder={"Choose teams to add..."} />
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