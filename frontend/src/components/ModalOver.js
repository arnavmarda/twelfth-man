import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { DropdownRadio } from "./DropdownRadio";


export const ModalOver = (props) => {

    const [isShown, setIsShown] = useState(true);
    const [isSelected, setIsSelected] = useState("");

    const handleChange = (bowler) => {
        setIsSelected(bowler);
        props.onChange(bowler);
    }

    const closeModal = () => {
        setIsShown(false);
    }

    const bowlersList = props.bowlers.map((bowler) => ({value: bowler, label: bowler}))

    return (
        <Modal autoFocus centered show={isShown} onExit={closeModal} onExited={closeModal}>
            <Modal.Header>
                <Modal.Title>Choose Next Bowler</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form> 
                    <DropdownRadio 
                    options={bowlersList} 
                    selectedOption={isSelected} 
                    onChange={handleChange} 
                    placeholder="Select next bowler"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" onClick={closeModal}>Continue!</Button>
            </Modal.Footer>
        </Modal>
    )
};
