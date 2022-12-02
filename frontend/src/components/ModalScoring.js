import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { DropdownRadio } from "./DropdownRadio";
import { Form } from "react-bootstrap";

export const ModalScoring = ({home, away, setIsBattingFirst}) => {

    const [isShown, setIsShown] = useState(true);
    const [isSelected, setIsSelected] = useState("");
    
    const closeModal = () => {
        setIsShown(false);
    }

    const teams = [
        {value: home, label: home},
        {value: away, label: away},
    ]

    const handleChange = (team) => {
        setIsSelected(team);
        setIsBattingFirst(team.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        closeModal();
      };

    return (
            <Modal autoFocus centered show={isShown}>
                <Modal.Header>
                    <Modal.Title>Enter Toss Results</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                        <DropdownRadio 
                        options={teams} 
                        handleChange={handleChange} 
                        selectedOption={isSelected} 
                        placeholder={"Choose team that is batting first"}>
                        </DropdownRadio>
                        {/* <Form.Group>
                            <Form.Label onChange={handleChange} className="me-3">Batting First: </Form.Label>
                            <Form.Check inline label={home} name="bats-first" type="radio" id="inline-radio-1" required feedback="This is a required field." feedbackType="invalid"></Form.Check>
                            <Form.Check inline label={away} name="bats-first" type="radio" id="inline-radio-2" required feedback="This is a required field." feedbackType="invalid"></Form.Check>
                        </Form.Group> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" onClick={handleSubmit}>Start Game!</Button>
                </Modal.Footer>
            </Modal>
    )
};
