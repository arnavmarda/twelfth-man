import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    * {
        font-family: Georgia, serif;
    }
`;


export const Layout = (props) => (
    <Styles>
        <Container fluid className='p-0'>
            {props.children}
        </Container>
    </Styles>
)