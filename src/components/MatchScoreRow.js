import React from "react";
import { Col, Row, Container} from "react-bootstrap";
import styled from 'styled-components';

const Styles = styled.div`
    .matchScore {
        background-color: white;
        z-index: 0;
        opacity: 1;
`;

export const MatchScoreRow = () => (
    <Styles>
        <Container>
        <Row className="text-center position-relative">
            <Col className="m-3 p-3 matchScore border border-dark border-2">Match Score</Col>
            <Col className="m-3 p-3 matchScore border border-dark border-2">Match Score</Col>
            <Col className='m-3 p-3 matchScore border border-dark border-2'>Match Score</Col>
        </Row>
        </Container>
    </Styles>
)