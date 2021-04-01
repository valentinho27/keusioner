import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";


import Card from '../../../../App/components/MainCard';
import * as actionTypes from '../../../../store/actions';


const parse = JSON.parse(sessionStorage.getItem('UserId'));


const PilihKategori = () => {

        const [ dataKat, setDataKat ] = useState({data: []});
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const { register, errors, handleSubmit } = useForm();

        const history = useHistory();

        const [successMsg, setSuccessMsg] = useState();
        const [alertMsg, setalertMsg] = useState();
        const [dataTanya, setDataTanya] = useState({ data: [] });
        

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


        const getKategori = async () => {

                await axios.get(`${actionTypes.URL_CLIENT}/api/admin/getAllKat`, {
                    headers: {
                        Authorization : `Bearer ${parse.Token}` 
                    }
                }).then(res => {
                    // console.log(res)
                    setDataKat({data: res.data.dataKat})
                }).catch(err=>{
                    console.log(err)
                })

        }

        const postDataKueApi = async (insertData) => {
            await axios.post(`${actionTypes.URL_CLIENT}/api/admin/addKuesioner`, insertData, {
                    headers: {
                        Authorization : `Bearer ${parse.Token}` 
                    }
                })
                .then((res)=>{
                   
                if(res.data.successMsg){
                    setalertMsg(res.data.alertMsg);  
                }
                    setalertMsg(res.data.alertMsg);
                    setInputList([ { pilihan: "" }]);
                    // getDataKueApi();
                    handleClose();
                  
                })
                .catch(err=>{
                    console.log(err)
                })
            }

        const onSubmit = data => {
        
            data.pilihan = inputList;
            const id_user = parse.Id;
           
            const insertData = {
                 id_user: id_user,
                 id_kat: data.kat,
                 pertanyaan: data.pertanyaan,
                 pilihan: data.pilihan,
            }
            postDataKueApi(insertData)
    
        };

    useEffect(()=>{
            getKategori();
    }, [])

        

        return(
        <Fragment>
            <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
            <Modal.Title><small>Input Kuesioner</small></Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    
                     <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Pilih Kategori Kuesioner</Form.Label>

                            <select className="form-control" name="kat" ref={register({
                                                    required: "Pilih Kategori"
                                                })}>

                                <option value="">Pilih Kategori</option>
                                { dataKat.data.map((data, index) => (
                                    
                                        <option key={index} value={data.id_kat}>{data.nama_kat}</option>
                                    
                                )) }
                            </select>
                            
                            <small className="float-left text-danger pt-2 mb-3">{errors.kat && errors.kat.message }</small><br/>

                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Pertanyaan</Form.Label>
                            <textarea name="pertanyaan" className="form-control" placeholder="pertanyaan" 
                                ref={register({ 
                                                required: 'Pertanyaan Tidak Boleh Kosong !',
                                                maxLength: 2000,
                                                })}/>
                            <small className="float-left text-danger pt-2 mb-3">{errors.pertanyaan && errors.pertanyaan.message}</small>
                            
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





            <Card title="Pilih Kategori Kuesioner" isOption>

            <center className="pt-2">
                    <Button variant="success" size="sm" onClick={handleShow}>
                        Tambah Kuesioner
                    </Button>
                    <h6 className="text-center text-danger pt-2">{alertMsg}</h6>
                    <h6 className="text-center text-success">{successMsg}</h6>
            </center>

                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Kategori Kuesioner</th>
                        <th> <center>Aksi</center> </th>
                       
                        </tr>
                    </thead>
                    <tbody>


                    { dataKat.data.map((data, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                    {data.nama_kat}  
                            </td>
                            <td>
                                <center> 
                                    <Button variant="success" size="sm" onClick={()=> history.push(`/kuesioner/kelola/${data.id_kat}`)}>Lihat</Button>
                                </center>
                            </td>
                        </tr>
                    )) }
                        
                    </tbody>
                </Table>
            </Card>
        </Fragment>
        )

}

export default PilihKategori;