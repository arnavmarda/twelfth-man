import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

const Styled = styled.div``;

export const ModalScoring = () => {

    const [isShown, setIsShown] = useState(true);
    const [validated, setValidated] = useState(false);
    
    const showModal = () => {
        setIsShown(true);
    }

    const closeModal = () => {
        setIsShown(false);
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        
        closeModal();
        setValidated(true);
      };

    return (
        <Form validate validated={validated} onSubmit={handleSubmit}>
            <Modal autoFocus centered show={isShown}>
                <Modal.Header>
                    <Modal.Title>Enter Toss Results</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    
                        <Form.Group className="mb-3" controlId="chooseTossWinner">
                            <Form.Label className="me-3">Toss Winner: </Form.Label>
                            <Form.Check inline label="Team 1" name="toss-winner" type="radio" id="inline-radio-1" required feedback="This is a required field." feedbackType="invalid"></Form.Check>
                            <Form.Check inline label="Team 2" name="toss-winner" type="radio" id="inline-radio-2" required feedback="This is a required field." feedbackType="invalid"></Form.Check>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="me-3">Batting First: </Form.Label>
                            <Form.Check inline label="Team 1" name="bats-first" type="radio" id="inline-radio-1" required feedback="This is a required field." feedbackType="invalid"></Form.Check>
                            <Form.Check inline label="Team 2" name="bats-first" type="radio" id="inline-radio-2" required feedback="This is a required field." feedbackType="invalid"></Form.Check>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" onClick={handleSubmit}>Start Game!</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    )
};
