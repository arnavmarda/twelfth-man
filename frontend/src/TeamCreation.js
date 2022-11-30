import React, { useState } from "react";
import { Layout } from "./components/Layout";
import { NavigationBar } from "./components/NavbarTournament";
import { FooterLogin } from "./components/FooterLogin";
import Register from "./components/Registration";
import { DropdownChecklist } from "./components/DropdownChecklist";
import { DropdownRadio } from "./components/DropdownRadio";
import { useNavigate } from "react-router-dom";

const TeamCreation = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        roster: [],
        captain: "",
        players: [],
    });

    React.useEffect(() => {
        fetch("http://localhost:9000/userList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                let namesArray = data.map((user) => ({
                    value: user.name,
                    label: user.name,
                }));
                setValues({ ...values, players: namesArray });
                console.log(values.players);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSelectedPlayers = (roster) => {
        setValues({ ...values, roster: roster });
    };

    const handleSelectCaptain = (captain) => {
        setValues({ ...values, captain: captain });
    };

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "string",
            placeholder: "Enter team name",
            required: true,
        },
    ];

    const handleUp = (e) => {
        e.preventDefault();
        fetch("http://localhost:9000/team/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                captain: values.captain.label,
                roster: values.roster.map((player) => player.label),
            }),
        })
            .then((res) => res.json())
            .then((values) => console.log("Success: ", values))
            .catch((err) => console.log("Error: ", err));

        navigate("/team");
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className="TeamCreation" id="TeamCreation">
            <styles>
                <Layout>
                    <div>
                        <NavigationBar />
                    </div>
                    <container className="Signup">
                        <form className="SignupForm" onSubmit={handleUp}>
                            <h3 id="RegistrationTitle"> Create a team </h3>
                            {inputs.map((input) => (
                                <Register
                                    key={input.id}
                                    {...input}
                                    value={values[input.name]}
                                    onChange={onChange}
                                />
                            ))}
                            <DropdownChecklist
                                handleChange={handleSelectedPlayers}
                                options={values.players}
                                selectedOptions={values.roster}
                                placeholder={"Choose players to add..."}
                            />
                            <DropdownRadio
                                options={values.players}
                                selectedOption={values.roster}
                                handleChange={handleSelectCaptain}
                                placeholder={"Choose a captain..."}
                            />
                            <div className="RegistrationTitle">
                                <button type="submit" id="RegistrationButton">
                                    Create Team
                                </button>
                            </div>
                        </form>
                    </container>
                    <FooterLogin />
                </Layout>
            </styles>
        </div>
    );
};

export default TeamCreation;
