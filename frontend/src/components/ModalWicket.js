import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { DropdownRadio } from "./DropdownRadio";

export const ModalWicket = (props) => {
    const [isShown, setIsShown] = useState(true);
    const [isSelected, setIsSelected] = useState("");

    const handleChange = (batsman) => {
        setIsSelected(batsman);
        props.onChange(batsman);
    };

    const closeModal = () => {
        setIsShown(false);
    };

    let preFilter = props.batsmen;
    preFilter = preFilter.filter((item) => {
        return item !== undefined;
    });
    const batsmenList = preFilter.map((batsmen) => ({
        value: batsmen,
        label: batsmen,
    }));
    console.log(batsmenList);
    return (
        <Modal
            autoFocus
            centered
            show={isShown}
            onExit={closeModal}
            onExited={closeModal}
        >
            <Modal.Header>
                <Modal.Title>Report Wicket</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <DropdownRadio
                            options={batsmenList}
                            selectedOption={isSelected}
                            onChange={handleChange}
                            placeholder="Select next batsman"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" onClick={closeModal}>
                    Continue!
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
