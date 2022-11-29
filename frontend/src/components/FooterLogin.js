//import needed libraries:
import React from "react";
// eslint-disable-next-line
import '../components/css-files/Login.css'
import { FaCopyright } from 'react-icons/fa';
import { Container} from 'react-bootstrap';

export const FooterLogin = () => (
    <Container fluid className="footer-copyright">
        <p className="copyright">
            <FaCopyright size={20} color={"white"} /> Copyright 2022 Twelfth Man. All rights reserved.
        </p> 
    </Container>
)
