import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export const ModalWicket = (props) => {

    const [isShown, setIsShown] = useState(true);
    const [isSelected, setIsSelected] = useState("");

    const handleChange = (batsman) => {
        setIsSelected(batsman);
        props.onChange(batsman);
    }

    const closeModal = () => {
        setIsShown(false);
    }

    const batsmenList = props.batsmen.map((batsmen) => ({value: batsmen, label: batsmen}))
    return (
        <Modal autoFocus centered show={isShown} onExit={closeModal} onExited={closeModal}>
            <Modal.Header>
                <Modal.Title>Report Wicket</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form> 
                    <Form.Group>
                        <Form.Select required aria-label="Next Batsman">

                            <DropdownRadio 
                            options={batsmenList} 
                            selectedOption={isSelected} 
                            onChange={handleChange} 
                            placeholder="Select next batsman"
                            />

                            {/* <option>Next Batsman</option>
                            <option value="Batsman 3">Batsman 3</option>
                            <option value="Batsman 4">Batsman 4</option>
                            <option value="Batsman 5">Batsman 5</option>
                            <option value="Batsman 6">Batsman 6</option>
                            <option value="Batsman 7">Batsman 7</option>
                            <option value="Batsman 8">Batsman 8</option> */}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" onClick={closeModal}>Continue!</Button>
            </Modal.Footer>
        </Modal>
    )
};
