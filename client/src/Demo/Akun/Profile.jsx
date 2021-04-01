import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Image, Table } from 'react-bootstrap';


import * as actionTypes from "../../store/actions";
import Card from '../../App/components/MainCard';
import Aux from '../../hoc/_Aux';
import logo from '../../icon/user_info.png';
import { useHistory } from 'react-router-dom';

const parse = JSON.parse(sessionStorage.getItem('UserId'));

const Profil = () => {

    const [dataProfile, setDataProfile] = useState({data: []});
    const history = useHistory();

    const getDataApi = async() => {
        if(!parse){
            history.push('/auth/masuk')
            console.log('Kosong')

        }else{
            const id    = parse.Id;
            await Axios.get(`${actionTypes.URL_CLIENT}/api/profile/${id}`, {
                headers : {
                    Authorization: `Bearer ${parse.Token}` 
                }
            })
            .then(res => {
                setDataProfile({data: res.data.profilData})
            })
            .catch(err => console.log(err))
        }
    }
    

        useEffect(()=>{
          getDataApi();
        },[])

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
                                        <small className="text-warning">Profile</small>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                <Table>
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
                                    
                                </Table>
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