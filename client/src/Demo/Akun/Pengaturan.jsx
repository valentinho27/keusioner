import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Container, Image, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";

import * as actionTypes from "../../store/actions"
import Card from '../../App/components/MainCard';
import Aux from '../../hoc/_Aux';
import logo from '../../icon/user_info.png';

const parse = JSON.parse(sessionStorage.getItem('UserId'));

const Profil = () => {

    
   

    const [dataProfile, setDataProfile] = useState({nama: ''});
    const [email, setEmail] = useState({ email: '' })
    const { register, errors, handleSubmit } = useForm();
    const history = useHistory();


    const getDataApi = async () => {

        if(!parse){
            history.push('/auth/masuk')

        }else{
            const id = parse.Id;
            await Axios.get(`${actionTypes.URL_CLIENT}/api/profile/${id}`, {
                headers : {
                    Authorization: `Bearer ${parse.Token}` 
                }
            })
            .then(res => {
                setDataProfile({ nama: res.data.profilData.nama_user })
                setEmail({ email: res.data.profilData.email_user })

            })
            .catch(err => console.log(err))
        }
    }

    const handelUpdateApi = async (data) => {
        if(!parse){
            history.push('/auth/masuk')

        }else{
            const id = parse.Id;
            const dataInput = {
                id : id,
                nama: data.nama,
                email: data.email,
            }
            await Axios.put(`${actionTypes.URL_CLIENT}/api/updateProfile/`, dataInput, {
                headers: {
                    Authorization: `Bearer ${parse.Token}`
                }
            }).then(res => {
                console.log(res)
                history.push(`/profil`)
                
            })
        }
    }

    const handleEmail = (e) => {
        const {value} = e.target;
        setEmail({email: value})
    }

    const handleNama = (e) => {
        const {value} = e.target;
        setDataProfile({nama: value})
    }

    const onSubmit = (data) => {
       handelUpdateApi(data);
    }

        useEffect(()=>{
            getDataApi();
        },[])

        
    return(

        <Aux>
            <Row>
           
                <Col>
                    <Card isOption>

                        
                        <Container>
                            <Row>
                                <Col xs={6}>
                                    <div className="text-center pt-4">
                                        <Image src={logo} rounded /><br/>
                                        <small className="text-warning">Pengaturan</small>
                                    </div>
                                </Col>
                                <Col xs={6}>

                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group>
                                        <Form.Label>Nama</Form.Label>
                                        <Form.Control type="text" name="nama" placeholder="Masukan Nama"
                                                        onChange={(e)=> handleNama(e)} 
                                                        value={dataProfile.nama || ''}
                                                        ref={ register({
                                                            required: 'Nama Jawaban Tidak Boleh Kosong !', 
                                                        
                                                            maxLength : {
                                                                        value: 200,
                                                                        message: 'Nama Jawaban Maksimal 200 Karakter' // <p>error message</p>
                                                                    }
                                                        })
                                                        }
                                        />
                                    <small className="float-left text-danger">{errors.nama && errors.nama.message}</small><br/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Masukan Email" value={email.email || ''} 
                                                    onChange={ (e) => handleEmail(e)}
                                                    ref={ register({
                                                        required: 'Email Tidak Boleh Kosong !', 
                                                    
                                                        maxLength : {
                                                                    value: 100,
                                                                    message: 'Email Maksimal 100 Karakter' // <p>error message</p>
                                                                }
                                                    })
                                                    }
                                        />
                                        <small className="float-left text-danger">{errors.email && errors.email.message}</small><br/>
                                        <Form.Text className="text-muted">
                                        Kami tidak akan pernah membagikan email Anda dengan orang lain.
                                        </Form.Text>
                                    </Form.Group>
                                    <div className="text-center">
                                    <Button variant="success" size="sm" type="submit">
                                        Ubah
                                    </Button>
                                    </div>
                                </Form>

                                {/* <Table>
                                    <tbody>
                                    <tr>
                                        <td><i className="feather icon-user"/></td>
                                        <td>:</td>
                                        <td>{dataProfile.data.nama_user}</td>
                                    </tr>
                                    <tr>
                                        <td><i className="feather icon-mail"/></td>
                                        <td>:</td>
                                        <td>{dataProfile.data.email_user}</td>
                                    </tr>
                                    <tr>
                                        <td><i className="feather icon-type"/></td>
                                        <td>:</td>
                                        <td>{dataProfile.data.jenis_user}</td>
                                    </tr>
                                    <tr>
                                        <td><i className="feather icon-shield"/></td>
                                        <td>:</td>
                                        <td>{dataProfile.data.is_active === 1 ? <span className="text-success">Aktif</span> : <span className="text-Danger">Belum Aktif</span>}</td>
                                    </tr>
                                    </tbody>
                                    
                                </Table> */}
                                </Col>
                                
                            </Row>
                          
                        </Container>

                    </Card>
                </Col>
              
            </Row>
        </Aux>
    )
    
}

export default Profil;