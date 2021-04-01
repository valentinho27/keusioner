import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {Row, Col, Card, Form, Button, Modal, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';


// import './../../../assets/scss/style.scss';
// import Aux from "../../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import axios from 'axios';

// import Button from '../../../../App/components/Atom/Button';

const ModalInputKuesioner = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            
            <Button variant="success" onClick={handleShow}>
                Tambah Kuesioner
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title><h5>Input Kuesioner</h5></Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                
                        <Form>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Pertanyaan</Form.Label>
                                <Form.Control as="textarea" rows="3" />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Pilihan Jawaban</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    
                    </Modal.Body>
                <Modal.Footer>

                    <Button variant="danger" size="sm" onClick={handleClose}>
                        Tutup
                    </Button>
                    <Button size="sm" variant="success">
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>

           
     
        </>
    )

}

export default ModalInputKuesioner;