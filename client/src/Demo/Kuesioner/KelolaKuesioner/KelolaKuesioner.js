import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button, Modal, Row, Col, Card, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
// import { useSelector } from 'react-redux';
import Aux from '../../../hoc/_Aux';
import Axios from 'axios';

import * as actionTypes from "../../../store/actions";



const parse = JSON.parse(sessionStorage.getItem('UserId'));


const HasilKuesioner = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { register, errors, handleSubmit } = useForm();
    const history = useHistory();

    const {id} = useParams();


    const [successMsg, setSuccessMsg] = useState();
    const [alertMsg, setalertMsg] = useState();
    // const isLoading = useSelector(state => state.isLoading);

    const [dataTanya, setDataTanya] = useState({ data: [] });
    const [datakat, setDataKat ] = useState({ data: [] });

        
    // /////////////////////////////////////////////////////////////////
    const [inputList, setInputList] = useState([ { pilihan: [] }]);
        
        // handle input change
        const handleInputChange = (e, index) => {
            const { name, value } = e.target;
            const list = [...inputList];
            list[index][name] = value;
            setInputList(list);
        };
        
        // handle click event of the Remove button
        const handleRemoveClick = index => {
            const list = [...inputList];
            list.splice(index, 1);
            setInputList(list);
        };
        
        // handle click event of the Add button
        const handleAddClick = () => {
            setInputList([...inputList, { pilihan: "" }]);
        };

        const handleDetail = (e, id) => {
            history.push(`/kuesioner/detail/${id}`);
        }
        const handleEdit = (e, id) => {
            history.push(`/kuesioner/edit/${id}`);
        }
        const handleDelete = (e, id) => {
            deleteKuesionerApi(id);
        }

// //////////////////////////////////////////////////////////////////////////

        const postDataKueApi = async (insertData) => {
            await Axios.post(`${actionTypes.URL_CLIENT}/api/admin/addKuesioner`, insertData, {
                    headers: {
                        Authorization : `Bearer ${parse.Token}` 
                    }
                })
                .then((res)=>{
                console.log(res.data)
                
                if(res.data.successMsg){
                    setalertMsg('');
                    setSuccessMsg(res.data.successMsg);  
                    setInputList([ { pilihan: "" }]);
                    getDataKueApi();
                    setTimeout(() => {
                        handleClose();
                    }, 1000);


                }

                if(res.data.alertMsg){
                    setSuccessMsg('');  
                    setalertMsg(res.data.alertMsg);
                }
                    // setSuccessMsg('');  
                   
                  
                })
                .catch(err=>{
                    console.log(err)
                })
            }

        const getDataKueApi = async () => {
            await Axios.get(`${actionTypes.URL_CLIENT}/api/admin/getKuesioner/${id}`, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            }).then(res => {
                
                // console.log(res.data.allDataUserReg)
                setDataTanya({data: res.data.allDataUserReg})
            })
        }

        const getDataKat = async () => {
            await Axios.get(`${actionTypes.URL_CLIENT}/api/admin/getAllKat/${id}`, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            })
            .then(res => {
                // console.log(res.data)
                setDataKat({data: res.data.dataKat})
            })
        }
        // console.log()

        const deleteKuesionerApi = async (id) => {
                await Axios.delete(`${actionTypes.URL_CLIENT}/api/admin/deleteKuesioner/${id}`, {
                        headers: {
                            Authorization : `Bearer ${parse.Token}` 
                        }
                }).then(res => {
                    console.log(res.data)
                    setSuccessMsg(res.data.successMsg)
                    getDataKueApi();

                }).catch(err => console.log(err.message))
        }
         

// /////////////////////////////////////////////////////////////////////////

   
    const onSubmit = data => {
        
        data.pilihan = inputList;
        const id_user = parse.Id;
       
        const insertData = {
             id_user: id_user,
             id_kat: id,
             pertanyaan: data.pertanyaan,
             pilihan: data.pilihan,
        }
        postDataKueApi(insertData)

    };

    // if(!parse){
    //     history.push('/auth/masuk')
    // } 
   
    useEffect(() => {
            if(!parse){
                history.push('/auth/masuk')
            } 
            getDataKueApi();   
            getDataKat(); 
    },[]);
    

    return(
        
        <Aux>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title><small>Input Kuesioner <strong className="text-success"> {datakat.data.map((data, index) => ( data.nama_kat ))} </strong></small></Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        
                         <form onSubmit={handleSubmit(onSubmit)}>

                             {/* <h6 className="text-default"> Kuesioner Akan di Tambahkan ke  <strong className="text-success"> {datakat.data.map((data, index) => ( data.nama_kat ))} </strong> </h6> */}
                            
                            {/* <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Pilih Kategori Kuesioner</Form.Label>

                                <select className="form-control" name="kat" ref={register({
                                                        required: "Pilih Kategori"
                                                    })}>

                                    <option value="">Pilih Kategori</option>
                                    { datakat.data.map((data, index) => (
                                        
                                            <option key={index} value={data.id_kat}>{data.nama_kat}</option>
                                        
                                    )) }
                                </select>
                                
                                <small className="float-left text-danger pt-2 mb-3">{errors.kat && errors.kat.message }</small><br/>

                            </Form.Group> */}

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Pertanyaan</Form.Label>
                                <textarea name="pertanyaan" className="form-control" placeholder="pertanyaan" 
                                    ref={register({ 
                                                    required: 'Pertanyaan Tidak Boleh Kosong !',
                                                    maxLength: 2000,
                                                    })}/>
                                <small className="float-left text-danger pt-2 mb-3">{errors.pertanyaan && errors.pertanyaan.message}</small>
                                <small className="text-center text-danger pt-2">{alertMsg}</small>

                                
                            </Form.Group>
                            
                {inputList.map((x, i) => {

                return(
                            <Form.Group controlId="formBasicEmail" key={i}>
                               <br/>
                                <Form.Label>Pilihan Jawaban</Form.Label>
                                
                                                    
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        name="pilihan" 
                                        value={x.pilihan}
                                        onChange={e => handleInputChange(e, i)}
                                        className="form-control" 
                                        placeholder="Pilihan Jawaban"
                                        ref={ register({
                                                required: 'Pilihan Jawaban Tidak Boleh Kosong !', 
                                            
                                                maxLength : {
                                                            value: 1000,
                                                            message: 'Pilihan Jawaban Maksimal 1000 Karakter' // <p>error message</p>
                                                        }
                                            })
                                            }
                                        
                                    />

                                    <div className="btn-box pl-2">
                                        {
                                            inputList.length !== 1 
                                            && 
                                            <Button className="mt-2" size="sm" variant="warning" onClick={() => handleRemoveClick(i)}>
                                                -
                                            </Button>
                                           
                                        }
                                        {
                                            inputList.length - 1 === i 
                                            && 
                                            <div className="">
                                            <Button className="mt-2" size="sm" variant="info" onClick={handleAddClick}>
                                                +
                                            </Button>
                                            </div>
                                        }
                                    </div>

                                </div>
                                <small className="float-left text-danger pt-2 mb-3">{errors.pilihan && errors.pilihan.message}</small><br/>
                            </Form.Group>
                            )
                        })
                    }

                    <div className="text-right">
                            <Button variant="danger" size="sm" onClick={handleClose}>
                                Tutup
                            </Button>
                            <Button size="sm" type="submit" variant="success">
                                Simpan
                            </Button>
                    </div>
                        
                        </form>
                       
                    </Modal.Body>
                
            </Modal>

            <Row>
                <Col>                        
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Data Kuesioner <strong className="text-success"> {datakat.data.map((data, index) => ( data.nama_kat ))} </strong></Card.Title>
                            <span className="d-block m-t-5">Data <code>Kuesioner</code></span>
                        </Card.Header>
                        <center className="pt-2">
                                <Button variant="success" size="sm" onClick={handleShow}>
                                    Tambah Kuesioner
                                </Button>
            
                                <Button variant="danger" size="sm" onClick={ () => history.push(`/kesioner/pilih_kategori`) }>
                                    Kembali
                                </Button>
                                <h6 className="text-center text-success">{successMsg}</h6>
                        </center>
                        <Card.Body>
                              
                            <Table responsive hover>
                                <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Kuesioner</th>
                                    <th>Aksi</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    dataTanya.data.map( (data, index) => (
                                       
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td width="60%">{data.isi_tanya.substring(0, 80)}</td>
                                            <td>
                                                <Button variant="info" size="sm" onClick={e => handleDetail(e, data.id_tanya)}>
                                                    Detail
                                                </Button>
                                                <Button variant="warning" size="sm" onClick={e => handleEdit(e, data.id_tanya)}>
                                                    Ubah
                                                </Button>
                                                <Button variant="danger" size="sm" onClick={e => handleDelete(e, data.id_tanya)}>
                                                    Hapus
                                                </Button>
                                            </td>                                        
                                        </tr>
                                    ))
                        
                                }                          
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    
                </Col>
            </Row>

            </Aux>
     
            
        
    )

}

export default HasilKuesioner;