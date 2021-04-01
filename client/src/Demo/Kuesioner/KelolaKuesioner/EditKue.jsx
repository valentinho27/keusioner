import React, { useEffect, useState } from 'react';
import Aux from '../../../hoc/_Aux';
import { useParams, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from 'react-bootstrap';
import Card from "../../../App/components/MainCard";


import axios from 'axios';
import * as actionTypes from "../../../store/actions";



const parse = JSON.parse(sessionStorage.getItem('UserId'));


const EditKuesioner =  () => {

    const [detailKues, setDetailKues] = useState({ pertanyaan: '', id:"" });
    const [pilih, setPilih] = useState({ data: [] });
    const [succesMsg, setSuccessMsg] = useState('')
    const { register, errors, handleSubmit } = useForm();
    const [inputList, setInputList] = useState([ { pilihan: [] }]);

    const [showing, setShowing] = useState({showing: false})
    const { id } = useParams();

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
        

        const handleAddClick = (index) => {
            setInputList([...inputList, { pilihan: "" }]);
            const list = [...inputList];
            console.log(list.length)


        };
    
        const handleHapus = async (id) => {
            await axios.delete(`http://localhost:8080/api/admin/delPilihan/${id}`, {
                    headers: {
                        Authorization : `Bearer ${parse.Token}` 
                    }
                }).then(res => {
                        
                        setSuccessMsg(res.data.messageScsDelPilihan)
                        apiGetDetailKuesioner();

                }).catch(err => {
                        console.log(err.message)
                })
        }


    const apiGetDetailKuesioner = async () => {
        
            await axios.get(`${actionTypes.URL_CLIENT}/api/admin/detailKuesioner/${id}`, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            })
            .then(res => {
               
                setDetailKues({ pertanyaan: res.data.dataTanya.isi_tanya, id: res.data.dataTanya.id_kat });
                setPilih({ data: res.data.dataPilihan })
            })
            .catch(err => {
                console.log(err.message)
            })
        
        
    }

    const onSubmit = async data => {
        
        data.pilihan = inputList;

        const inputData = {
            id: id,
            pertanyaan: data.pertanyaan,
            pilihan: data.pilihan
        }

            await axios.post(`${actionTypes.URL_CLIENT}/api/admin/updateKuesPilihan`, inputData, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            })
            .then(res => {
                apiGetDetailKuesioner()
                setSuccessMsg(res.data.messageUpdate);
                setInputList([{pilihan: ""}]);
            }).catch(err=>{
                console.log(err)
            });

            
            
    }

    // console.log(detailKues)
    let linkBack =   `/kuesioner/kelola/${detailKues.id}`;

    
     useEffect(() => {
       apiGetDetailKuesioner() 
     },[]);

     


    return(
    
        <Aux>
            <Row>
                <Col>
                    <Card title='Edit Kuesioner' isOption>


                    <form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Pertanyaan</Form.Label>
                                <p>{detailKues.pertanyaan}</p>
                                
                            </Form.Group>
                            <center>
                                <Link to={`/kuesioner/edit-tanya/${id}`}>
                                    <Button className="mt-2" size="sm" variant="info">Ubah Pertanyaan</Button>
                                </Link>
                            </center>
                    
                        <center><small className="float-left text-success pt-2 mb-3">{succesMsg}</small></center>

                    {                     
                        pilih.data.length > 0  ? (
                        pilih.data.map((data, index) => {
                        return (
                                <Form.Group controlId="formBasicEmail" key={index}>
                                <div className="input-group pt-3">
                                    <input type="text" disabled  className="form-control" value={data.isi_pilihan} />

                                    <div className="btn-box pl-2">
                                        {
                                            
                                            <Button className="mt-2" size="sm" variant="warning" onClick={() => handleHapus(data.id_pilihan)}>
                                                -
                                            </Button>
                                           
                                        }
                                       </div>
                                </div>
                                </Form.Group>
                            )
                        })
                        ) : ( <center> 
                                    <h4>Tes</h4>
                             </center>)
                    }
                            

                <center>
                    <Button className="mt-2" size="sm" variant="info" onClick={ () => {
                           console.log(showing)
                           if(showing === true){
                                console.log('false')
                                setShowing({showing: false})
                            }else{
                                console.log(showing)
                                console.log('true')
                                setShowing({showing: true})
                            }

                    } }>
                                        +
                    </Button><br/>
                    <p>Tambah Pilihan</p>
                </center>
                <div style={{ display: (showing.showing ? 'block' : 'none') }}>

                    {

                        inputList.map((x, i) => {
                                    
                            return(
                                        <Form.Group controlId="formBasicEmail" key={i}>
                                        <br/>
                                        
                                                <div className="input-group pt-3">

                                            
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
                    </div>


                    <div className="text-right">

                     <Row>
                         <Col></Col><Col></Col><Col></Col><Col></Col><Col></Col>
                         <Col>
                            <div style={{ display: (showing.showing ? 'block' : 'none') }}>
                                <Button type="submit" variant="success" size="sm">Tambah</Button>
                            </div>
                         </Col>
                         <Col>
                            <Link to={linkBack}>
                                <Button variant="danger" size="sm">Kembali</Button>
                            </Link>
                         </Col>
                    </Row>       
                    
                          
                    </div>

                        
                </form>
                                                    
                    </Card>
                </Col>
            </Row>
        </Aux>
    ) 

}

export default EditKuesioner;
