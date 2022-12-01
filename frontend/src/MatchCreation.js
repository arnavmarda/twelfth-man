import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "./components/NavbarUser";
import { DropdownRadio } from "./components/DropdownRadio";
import Register from "./components/Registration";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { FooterLogin } from "./components/FooterLogin";
import { Layout } from "./components/Layout";

const CreateMatch = () => {
    const navigate = useNavigate();
    const [teamList, setTeamList] = React.useState([]);
    const [homeTeam, setHomeTeam] = React.useState("");
    const [awayTeam, setAwayTeam] = React.useState("");
    const [numOvers, setNumOvers] = React.UseState(0);

    const getAllTeams = useCallback(() => {
        fetch("http://localhost:9000/teamList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                let teamsArray = data.map((user) => ({
                    value: user.name,
                    label: user.name,
                }));
                setTeamList(teamsArray);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        getAllTeams();
    }, [getAllTeams]);

    const handleHomeTeam = (home) => {
        setHomeTeam(home);
    };

    const handleAwayTeam = (away) => {
        setAwayTeam(away);
    };

    const handleUp = (e) => {
        e.preventDefault();
        fetch("http://localhost:9000/match/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                home: homeTeam.label,
                away: awayTeam.label,
                numOvers: numOvers,
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
                    navigate(`/match-${data._id}`);
                }
            })
            .catch((err) => console.log("Error: ", err));
    };

    const inputs = [
        {
            id: 1,
            name: "numOvers",
            type: "int",
            placeholder: "Number of overs",
            required: true,
        },
    ];

    const onChange = (e) => {
        setNumOvers(e.target.value);
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
                            <h3 id="RegistrationTitle"> Create a match </h3>
                            <DropdownRadio
                                handleChange={handleHomeTeam}
                                options={teamList}
                                selectedOptions={homeTeam}
                                placeholder={"Choose a home team..."}
                            />
                            <DropdownRadio
                                options={teamList}
                                selectedOption={teamList}
                                handleChange={handleAwayTeam}
                                placeholder={"Choose an away team..."}
                            />
                            {inputs.map((input) => (
                                <Register
                                    key={input.id}
                                    {...input}
                                    value={numOvers}
                                    onChange={onChange}
                                />
                            ))}
                            <div className="RegistrationTitle">
                                <button type="submit" id="RegistrationButton">
                                    Create Team
                                </button>
                                <ToastContainer />
                            </div>
                        </form>
                    </container>
                    <FooterLogin />
                </Layout>
            </styles>
        </div>
    );
};

export default CreateMatch;
