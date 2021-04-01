import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";

import * as actionTypes from '../../../store/actions'
import Card from '../../../App/components/MainCard';
import { useHistory } from 'react-router-dom';

const parse = JSON.parse(sessionStorage.getItem('UserId'));


const KategoriKue = () => {
       
        const [smShow, setSmShow] = useState(false);
        const { register, handleSubmit, errors } = useForm();
        const history = useHistory();



        const [ messageSuccess, SetMessageSuccess] = useState('')
        const [ messageErr, SetMessageErr ] = useState('')

        const [ dataKat, SetDataKat ] = useState({ data: [] })

        const getKat = async () => {

            await axios.get(`${actionTypes.URL_CLIENT}/api/admin/getAllKat`, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            }).then(res=>{
                SetDataKat({data: res.data.dataKat})
            }).catch(err => {
                console.log(err)
            })

        }

        const onSubmit = async data => {
           const inputData = {
               id_user  : parse.Id,
               nama_kat : data.kategori,
               status   : 1,
           }
            
            await axios.post(`${actionTypes.URL_CLIENT}/api/admin/kuesioner/inputKat`, inputData, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            }).then(res => {
                if(res.data.messageScs){
                    SetMessageSuccess(res.data.messageScs)
                    setTimeout(()=> setSmShow(false), 1000 );
                    getKat();
                }
                SetMessageErr(res.data.messageError)
            }).catch(err => {
                console.log(err)
            })
        }

        const ubahKat = (id) => {
            console.log(id)
            history.push(`/ubah/kategori/${id}`)
        }

        const hapusKat = async (id) => {
                await axios.delete(`${actionTypes.URL_CLIENT}/api/admin/deletekat/${id}`, {
                    headers: {
                        Authorization : `Bearer ${parse.Token}` 
                    }
            })
            .then(res=> {
                SetMessageSuccess(res.data.successMsg);
                getKat();
            })
            .catch(err => console.log(err))
        }

        const statusKat = async (id_kat, status) => {
            await axios.put(`${actionTypes.URL_CLIENT}/api/admin/updateStatusKat`, {id_kat : id_kat, status}, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }  
            }).then( res => {
                setTimeout(() => SetMessageSuccess(''), 3000);
                SetMessageSuccess(res.data.messageScs);
                getKat();
   
            })
        }

        useEffect(() => {
            getKat()
        },[])

        return(

            <Card title='Kategori Kuesioner' isOption>
               
                <div className="text-center">
                <small className="float-center text-success pt-2 mb-3">{messageSuccess}</small><br/><br/>
                   <Button size="sm" onClick={() => setSmShow(true)}>Tambah Kategori</Button>
                </div>


                   <Modal
                        size="md"
                        show={smShow}
                        onHide={() => setSmShow(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">
                           <small>Tambah Kategori Kuesioner</small>
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                        <Form onSubmit={handleSubmit(onSubmit)}>
                           
                            
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Kategori Kuesioner textarea</Form.Label>
                                <Form.Control name="kategori" as="textarea" rows={3} ref={register({ 
                                                    required: 'Kategori Tidak Boleh Kosong !',
                                                    maxLength:  {
                                                        value: 2000,
                                                        message: 'Pilihan Jawaban Maksimal 2000 Karakter' // <p>error message</p>
                                                    },
                                                    pattern:{
                                                        value: /[A-Za-z0-9 _.,!"'/$]*/,
                                                        message: "Karakter Inputan Harus Berupa Huruf dan Angka !"
                                                    } 
                                                    
                                                    })}/>
                                <small className="float-left text-danger pt-2 mb-3">{errors.kategori && errors.kategori.message}</small>
                                <small className="float-left text-danger pt-2 mb-3">{messageErr}</small>
                                
                                
                            </Form.Group>
                            <br/>
                           
                        <div className="text-right">
                            <Button variant="primary" size="sm" type="submit">
                                Tambah
                            </Button>
                        </div>

                        </Form>

                        </Modal.Body>
                    </Modal>

                    <br/>

                    <Table striped hover size="sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th width="60%">Kategori Kuesioner</th>
                        <th><center>Aksi</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataKat.data.map( (data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.nama_kat.substring(0, 60)}</td>
                                <td>
                                    <center>
                                        { data.status === 1 ? 
                                            
                                            <Button variant="success" size="sm" onClick={ () => statusKat(data.id_kat, data.status) }><small>Tutup</small></Button>
                                        : 
                                            <Button variant="info" size="sm" onClick={ () => statusKat(data.id_kat, data.status) }><small>Buka</small></Button>
                                            
                                        }
                                        <Button variant="warning" size="sm" onClick={ () => ubahKat(data.id_kat) }><small>Ubah</small></Button>
                                        <Button variant="danger" size="sm" onClick={ ()=> hapusKat(data.id_kat) }><small>Hapus</small></Button>                                
                                    </center>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </Table>
                   
                    

            </Card>

        )


}

export default KategoriKue;