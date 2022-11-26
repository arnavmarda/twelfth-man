import React from "react";
import styled from "styled-components";
import { Layout } from "./components/Layout";
import { NavigationBar } from "./components/NavbarTournament";
import { Footer } from "./components/Footer";

const Styles = styled.div``;

class TournamentPage extends React.Component {
    render() {
        return(
            <Styles>
                <Layout>
                    <NavigationBar /> 
                    <Footer />
                </Layout>
            </Styles>

        )
    }
}

export default TournamentPage;