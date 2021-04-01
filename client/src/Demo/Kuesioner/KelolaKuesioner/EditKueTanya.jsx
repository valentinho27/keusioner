import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import * as actionTypes from "../../../store/actions";
import Aux from '../../../hoc/_Aux';



const parse = JSON.parse(sessionStorage.getItem('UserId'));

const EditTanya = () => {

        const [pertanyaan, setPertanyaan] = useState({pertanyaan: ''});
        const { register, errors, handleSubmit } = useForm();

        const { id } = useParams();
        const history = useHistory();
        
        const apiGetDetailKuesioner = async () => {
        
            await axios.get(`${actionTypes.URL_CLIENT}/api/admin/detailKuesioner/${id}`, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            })
            .then(res => {
                setPertanyaan({ pertanyaan: res.data.dataTanya.isi_tanya });
                // console.log(res.data.dataTanya.isi_tanya)
            })
            .catch(err => {
                console.log(err.message)
            })
        
        
    }
    
    const handleChangeTanya = (e) => {
        const {value}  = e.target;
        setPertanyaan({pertanyaan: value})
    }
    
    const onSubmit = async (data) => {

            const inputData = {
                id : id,
                pertanyaan: data.pertanyaan
            }
             
            await axios.put(`${actionTypes.URL_CLIENT}/api/admin/updateKuesTanya`, inputData, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }  
            }).then( res => {
                apiGetDetailKuesioner();
                history.push(`/kuesioner/edit/${id}`)
   
            })
    }


    useEffect( () => {
        apiGetDetailKuesioner()
    }, [])

    return(
            <Aux>
                <Row>
                    <Col>
                    <Card>
                    <Card.Header>
                        <Card.Title as="h5">Basic Component</Card.Title>
                    </Card.Header>
                            <Card.Body>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Pertanyaan</Form.Label>
                                        <textarea name="pertanyaan" className="form-control" value={pertanyaan.pertanyaan} onChange={ e => handleChangeTanya(e)} placeholder="pertanyaan" 
                                            ref={register({ 
                                                            required: 'Pertanyaan Tidak Boleh Kosong !',
                                                            })}/>
                                        <small className="float-left text-danger pt-2 mb-3">{errors.pertanyaan && errors.pertanyaan.message}</small>
                                        
                                    </Form.Group>
                                    <div className="text-right">          
                                            <Button type="submit" variant="success" size="sm">Ubah</Button>
                                            <Link to={`/kuesioner/edit/${id}`}>
                                                <Button variant="danger" size="sm">Kembali</Button>
                                            </Link>
                                    </div>
                                </form>
                            </Card.Body>
                    </Card>
                    </Col> 
                </Row>
            </Aux>   
    )
}

export default EditTanya;