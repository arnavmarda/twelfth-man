import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export const ModalWicket = (props) => {

    const [isShown, setIsShown] = useState(true);

    const closeModal = () => {
        setIsShown(false);
    }

    return (
        <Modal autoFocus centered show={isShown} onExit={closeModal} onExited={closeModal}>
            <Modal.Header>
                <Modal.Title>Report Wicket</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form> 
                    <Form.Group className="mb-3" controlId="chooseBatsmanOut">
                        <Form.Select required aria-label="Who got out?" className="mb-2">
                            <option>Who got out?</option>
                            <option value="Batsman 1">Batsman 1</option>
                            <option value="Batsman 2">Batsman 2</option>
                        </Form.Select>
                        <Form.Select required aria-label="How did they get out?">
                            <option>How did they get out?</option>
                            <option value="b">Bowled</option>
                            <option value="lbw">LBW</option>
                            <option value="c&b">Caught and Bowled</option>
                            <option value="st">Stumped</option>
                            <option value="c">Caught</option>
                            <option value="hw">Hit-Wicket</option>
                        </Form.Select>
                    </Form.Group>
                    <hr className="solid"></hr>
                    <Form.Group>
                        <Form.Select required aria-label="Next Batsman">
                            <option>Next Batsman</option>
                            <option value="Batsman 3">Batsman 3</option>
                            <option value="Batsman 4">Batsman 4</option>
                            <option value="Batsman 5">Batsman 5</option>
                            <option value="Batsman 6">Batsman 6</option>
                            <option value="Batsman 7">Batsman 7</option>
                            <option value="Batsman 8">Batsman 8</option>
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
