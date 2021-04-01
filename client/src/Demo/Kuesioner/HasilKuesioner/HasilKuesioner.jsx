import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Table, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';


import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
import axios from 'axios';

const parse = JSON.parse(sessionStorage.getItem('UserId'));

    

    const HasilKuesioner = () => {

            const [hasil, setHasil] = useState({ data: [], isi: '', totalRes:'', belumJwb:'' });
            const history           = useHistory();

        
            const getHasilAPI = async () => {
                await axios.get(`${actionTypes.URL_CLIENT}/api/admin/getHasilKuesioner`, {
                    headers: {
                        Authorization : `Bearer ${parse.Token}`
                    }
                })
                .then(res => {
                    const belumJwb = res.data.totalRes - res.data.jumlahIsi;
                    setHasil({ data: res.data.hasil, isi: res.data.jumlahIsi, totalRes: res.data.totalRes, belumJwb: belumJwb });
                   
                })
                .catch(err => console.log(err.message))

    }

    function percentage(jum, total)
    {
        return (jum / total) * 100;
    }

    useEffect(() => {
        if(!parse){
            history.push('/auth/masuk')
        }else{
            getHasilAPI()
        }
    }, [])

    return(
        
        <Aux>

            <Row>
                    <Col md={4} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Responden</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-users text-c-green f-30 m-r-5"/>{hasil.totalRes}</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        {/* <p className="m-b-0">100 %</p> */}
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    {/* <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '100%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/> */}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Telah Menjawab</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-thumbs-up text-c-green f-30 m-r-5"/>{hasil.isi}</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">{ percentage(hasil.isi, hasil.totalRes) } %</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: `${percentage(hasil.isi, hasil.totalRes)}%`}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Belum Menjawab</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-thumbs-down text-c-red f-30 m-r-5"/>{hasil.belumJwb}</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">{percentage(hasil.belumJwb, hasil.totalRes)} %</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme4" role="progressbar" style={{width: `${percentage(hasil.belumJwb, hasil.totalRes)}%`}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            
          
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Hasil Kuesioner Pengguna</Card.Title>
                                {/* <span className="d-block m-t-5">use props <code>hover</code> with <code>Table</code> component</span> */}
                            </Card.Header>
                            <Card.Body>

                            { hasil.data.length <= 0 ? 
                                  
                                <div className="text-center text-danger">
                                    <p>Hasil Kosong</p>
                                </div>
                            
                            :
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nama</th>
                                        <th>Waktu Jawab</th>
                                        <th><center>Aksi</center></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                       
                                        {
                                            hasil.data.map((data, index) => 
                                        
                                                <tr key={index}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{data.nama_user}</td>
                                                    <td><Moment format="DD - MM - YYYY / hh:mm:ss">{data.createdAt}</Moment></td>
                                                    <td>
                                                    <center>
                                                        {/* <Button className="mt-2" size="sm" variant="success" onClick={()=> history.push(`/kuesioner/hasil/${data.user.id_user}`)}>
                                                            <small>Lihat</small>
                                                        </Button> */}

                                                        <Button className="mt-2" size="sm" variant="success" onClick={()=> history.push(`/kuesioner/hasil/kategori/${data.id_user}`)}>
                                                            <small>Lihat</small>
                                                        </Button>


                                                        <Button className="mt-2" size="sm" variant="info" onClick={()=> alert(data.id_user)}>
                                                            <small>Cetak</small>
                                                        </Button>
                                                    </center>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </Table>
                            }

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </Aux>
        
    )

}

export default HasilKuesioner;