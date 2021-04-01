import React, { useEffect, useState, Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Axios from 'axios';

import Aux from '../../../hoc/_Aux'
import * as actionTypes from "../../../store/actions";


const parse = JSON.parse(sessionStorage.getItem('UserId'));

const HasilDetailKuesioner = () => {

    const history = useHistory();
    // const { id } = useParams();
    const [hasil, setHasil] = useState( { tanya: [] } );
    const { id, id_kat } = useLocation();

   
    // console.log(`${id}/${id_kat}`)
   

    const getData = async () => { 
    
            await Axios.get(`${actionTypes.URL_CLIENT}/api/admin/Kuesioner/GetDetail`, {
                        headers: {
                            Authorization : `Bearer ${parse.Token}`,
                        },
                        params: {
                            id: id, 
                            id_kat: id_kat
                        }
                        
                    })
                    .then(res => {
                        // console.log(res.data.tanya)
                        setHasil({tanya: res.data.tanya})
                    })
                    .catch(err => console.log(err))
    }

    useEffect(()=> {
        getData()
        if(!id) {
            history.push('/kuesioner/hasil');
        }
    }, [])

    return(

        // <h1>ssss</h1>
        
        <Aux>
           
            <Row>   
                <Col sm="12">
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Detail Hasil Kuesioner</Card.Title>
                          
                        </Card.Header>
                        <Card.Body>

                        
                                <Fragment>
                            {      hasil.tanya.map((data, index) => 
                                
                                    <Row  key={index}>
                                        <Col>
                                            {data.isi_tanya}
                                            <ul>
                                                <li>{data.isi_pilihan}</li>
                                            </ul>
                                            <hr/>
                                        </Col>
                                    </Row>
                                )    
                            }
                                    <Row>
                                        <Col>
                                        <div className="text-right pb-4 pt-4 pl-4">
                                            <Button className="mt-2" size="sm" variant="danger" onClick={()=> history.push(`/kuesioner/hasil/kategori/${id}`)}>
                                                <small>Kembali</small>
                                            </Button>
                                        </div>
                                        </Col>
                                    </Row>
                                       
                                </Fragment>
                            
                           
                            
                        </Card.Body>

                   
                        
                    </Card>
                </Col>
            </Row>
           
        </Aux>
        
    )

}

export default HasilDetailKuesioner;