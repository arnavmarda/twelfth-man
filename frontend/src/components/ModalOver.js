import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";


export const ModalOver = (props) => {

    const [isShown, setIsShown] = useState(true);

    const closeModal = () => {
        setIsShown(false);
    }

    return (
        <Modal autoFocus centered show={isShown} onExit={closeModal} onExited={closeModal}>
            <Modal.Header>
                <Modal.Title>Choose Next Bowler</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form> 
                    <Form.Group className="mb-3" controlId="chooseBatsmanOut">
                        <Form.Select required aria-label="Next Bowler" className="mb-2">
                            <option>Next Bowler</option>
                            <option value="Bowler 1">Bowler 1</option>
                            <option value="Bowler 2">Bowler 2</option>
                            <option value="Bowler 3">Bowler 3</option>
                            <option value="Bowler 4">Bowler 4</option>
                            <option value="Bowler 5">Bowler 5</option>
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
