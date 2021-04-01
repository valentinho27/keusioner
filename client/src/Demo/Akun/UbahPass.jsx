import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Container, Image, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";

import * as actionTypes from "../../store/actions"
import Card from '../../App/components/MainCard';
import Aux from '../../hoc/_Aux';
import logo from '../../icon/user_info.png';
import { useHistory } from 'react-router-dom';

const parse = JSON.parse(sessionStorage.getItem('UserId'));

const UbahPass = () => {

    const { register, errors, handleSubmit } = useForm();
    const [alertmsgold, setAlertmsgold] = useState('');
    const [successMsg, SetSuccessMsg] = useState('');
    const history = useHistory();


    
    const updatePassApi = async (data) => {

     
            const id = parse.Id;
            const updateData = {
                id : id,
                passLama: data.pass_lama,
                passBaru: data.pass_baru,
            }
            
            await Axios.put(`${actionTypes.URL_CLIENT}/api/updatePass`, updateData, {
                headers : {
                    Authorization: `Bearer ${parse.Token}` 
                }
            }).then(res => {
                
                if(res.data.alertmsgold){
                    setAlertmsgold(res.data.alertmsgold);
                }
                if(res.data.successMsg){
                    SetSuccessMsg(res.data.successMsg)
                    setAlertmsgold('');
                }
            })
    }

    const onSubmit = (data, e) => {
        SetSuccessMsg('')
        updatePassApi(data)
        e.target.reset();
    }

    

    useEffect(()=>{
        // console.log(parse)
        if(!parse){
            history.push('/auth/masuk')
        }
    })

    return(

        <Aux>
            <Row>
           
                <Col>
                    <Card>

                        
                        <Container>
                            <Row>
                                <Col xs={6}>
                                    <div className="text-center pt-4">
                                        <Image src={logo} rounded /><br/>
                                        <small className="text-warning">Ganti Password</small>

                                    </div>
                                </Col>
                                

                                <Col xs={6}>
                                <small className="float-center text-success">{successMsg}</small>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group>
                                        <Form.Label>Password Lama</Form.Label>
                                        <Form.Control type="password" name="pass_lama" placeholder="Masukan Password Lama"
                                                        ref={ register({
                                                            required: 'Password Lama Tidak Boleh Kosong !', 
                                                        
                                                            maxLength : {
                                                                        value: 200,
                                                                        message: 'Password Lama Maksimal 100 Karakter' // <p>error message</p>
                                                                    }
                                                        })
                                                        }
                                        />
                                    <small className="float-left text-danger pb-2">{errors.pass_lama && errors.pass_lama.message}</small>
                                    <small className="float-left text-danger">{alertmsgold}</small><br/>

                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Password Baru</Form.Label>
                                        <Form.Control type="password" name="pass_baru" placeholder="Masukan Password Baru"
                                                    ref={ register({
                                                        required: 'Password Baru Tidak Boleh Kosong !', 
                                                        
                                                        minLength : {
                                                            value: 6,
                                                            message: 'Password Baru Minimal 6 Karakter' // <p>error message</p>
                                                        },

                                                        maxLength : {
                                                                    value: 100,
                                                                    message: 'Password Baru Maksimal 100 Karakter' // <p>error message</p>
                                                                }
                                                    })
                                                    }
                                        />
                                        <small className="float-left text-danger">{errors.pass_baru && errors.pass_baru.message}</small>
                                        <Form.Text className="text-muted"><br/>
                                        Kami tidak akan pernah membagikan email Anda dengan orang lain.
                                        </Form.Text>
                                    </Form.Group>
                                    <div className="text-center">
                                    <Button variant="success" size="sm" type="submit">
                                        Ubah Password
                                    </Button>
                                    </div>
                                </Form>
                                </Col>
                                
                            </Row>
                          
                        </Container>

                    </Card>
                </Col>
              
            </Row>
        </Aux>
    )
    
}

export default UbahPass;