import React, { useCallback, useEffect, useState } from "react";
import { NavigationBar } from "./components/NavbarTournament";
import { FooterLogin } from "./components/FooterLogin";
import { useNavigate } from "react-router-dom";
import Register from "./components/Registration";
import { DropdownChecklist } from "./components/DropdownChecklist";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
    const [values, setValues] = useState({
        teams: [],
        name: "",
    });

    const [teamsList, setTeamsList] = useState([]);

    var navigate = useNavigate();

    const getAllTeams = useCallback(() => {
        fetch("http://localhost:9000/teamList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                let teamsArray = data.map((team) => ({
                    value: team.name,
                    label: team.name,
                }));
                setTeamsList(teamsArray);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        getAllTeams();
    }, [getAllTeams]);

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "name",
            placeholder: "Tournament Name",
            required: true,
        },
    ];

    const handleUp = (e) => {
        e.preventDefault();

        fetch("http://localhost:9000/tournament/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                teams: values.teams.map((team) => team.label),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    const errorMsg = data.error.toString();
                    toast.error(errorMsg, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    navigate(`/tournament-${data._id}`);
                }
            })
            .catch((err) => console.log("Error: ", err));
    };
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleTeams = (teams) => {
        setValues({ ...values, teams: teams });
    };

    return (
        <div className="general" id="page">
            <NavigationBar />
            <container className="Signup">
                <form className="SignupForm" onSubmit={handleUp}>
                    <h3 className="RegistrationTitle"> Create a Tournament </h3>
                    {inputs.map((input) => (
                        <Register
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <DropdownChecklist
                        handleChange={handleTeams}
                        options={teamsList}
                        selectedOptions={values.teams}
                        placeholder={"Choose teams to add..."}
                    />
                    <div className="RegistrationTitle">
                        <button
                            type="submit"
                            id="tournamentSubmit"
                            className="RegistrationButton"
                        >
                            Create tournament
                        </button>
                    </div>
                    <ToastContainer />
                </form>
                <FooterLogin />
            </container>
        </div>
    );
};

export default LoginPage;
