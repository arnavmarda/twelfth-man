import React from 'react';
import { Container } from 'react-bootstrap';

export const Layout = (props) => (
    <Container fluid className='p-0'>
        {props.children}
    </Container>
)