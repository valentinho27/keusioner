import React, { useEffect, useState } from 'react';
import Aux from '../../../hoc/_Aux';
import { useParams, Link } from 'react-router-dom';
import {Row, Col, Button} from 'react-bootstrap';
import Card from "../../../App/components/MainCard";


import axios from 'axios';
import * as actionTypes from "../../../store/actions";


const parse = JSON.parse(sessionStorage.getItem('UserId'));


const DetailKuesioner =  () => {

    const [detailKues, setDetailKues] = useState({ pertanyaan: {} });
    const [pilih, setPilih] = useState({ data: [] })

    let { id } = useParams();
    
    const apiGetDetailKuesioner = async () => {
        
            await axios.get(`${actionTypes.URL_CLIENT}/api/admin/detailKuesioner/${id}`, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            })
            .then(res => {
                setDetailKues({ pertanyaan: res.data.dataTanya });
                setPilih({ data: res.data.dataPilihan })
            })
            .catch(err => {
                console.log(err.message)
            })
        
        
    }

    // console.log(detailKues.pertanyaan.id_kat)
    let linkBack = `/kuesioner/kelola/${detailKues.pertanyaan.id_kat}`

    useEffect(() => {
            apiGetDetailKuesioner()        
    },[]);


    return(
    
        <Aux>
            <Row>
                <Col>
                    <Card title='Hello Card' isOption>
                         
                         <Row>
                                <Col md={2}>
                                    <p>Pertanyaan</p>
                                </Col>
                                <Col md={1}>:</Col>
                                <Col md={9} className="text-left">
                                    <h6>
                                        <strong> {detailKues.pertanyaan.isi_tanya} </strong>
                                    </h6>
                                </Col>
                         </Row>
                         <Row>
                                <Col md={2}>
                                    <p>Pilihan</p>
                                </Col>
                                <Col md={1}>:</Col>
                                <Col md={9}>
                                        
                                        {

                                           pilih.data.length > 0 ? (
                                            pilih.data.map((data, index) => {
                                                return (
                                                        <div key={index}>

                                                            <li> {data.isi_pilihan} </li>
                                                        </div>
                                                    )
                                                })
                                           ) : (
                                               <p>Pilihan Belum Diisi !</p>
                                           )  
                                            
                                            
                                        }
                                        
                                </Col>
                         </Row>
                    
                            <hr/>
                            <div className="text-right">
                                <Link to={linkBack}>
                                    <Button variant="danger" size="sm">Kembali</Button>
                                </Link>
                            </div>
                        
                    </Card>
                </Col>
            </Row>
        </Aux>
    ) 

}

export default DetailKuesioner;
