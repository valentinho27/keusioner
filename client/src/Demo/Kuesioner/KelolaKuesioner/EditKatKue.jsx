import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';

import Card from '../../../App/components/MainCard';
import * as actionTypes from '../../../store/actions';

const parse = JSON.parse(sessionStorage.getItem('UserId'));

const EditKatKue = () => {

    const [ Kat, SetKat ] = useState('')

    const {id} = useParams();
    const { register, handleSubmit, errors } = useForm();
    const [ messageSuccess, SetMessageSuccess ] = useState('')

    const history = useHistory();


    const getdata = async () => {
        await axios.get(`${actionTypes.URL_CLIENT}/api/admin/ubah_kat/${id}`, {
            headers: {
                Authorization : `Bearer ${parse.Token}` 
            }
        }).then(res => {
            SetKat(res.data.result.nama_kat)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleChange = (e) => {
            const { value } = e.target;
            SetKat(value);
    } 

    const onSubmit = async (data) => {

        const inputData = {
            id_kat : id,
            nama_kat : data.kategori
        }

        await axios.put(`${actionTypes.URL_CLIENT}/api/admin/updatekat`, inputData, {
            headers: {
                Authorization : `Bearer ${parse.Token}` 
            }  
        }).then(res => {
            console.log(res)

            SetMessageSuccess(res.data.messageScs);
            setTimeout(() => { history.push('/kuesioner/kategori')}, 1000);

        }).catch(err => console.log(err.message))
    }

    useEffect(()=>{
        getdata();
    },[])
    
    return(
        <Card title="Ubah Kategori" isOption>

                        <Form onSubmit={handleSubmit(onSubmit)}>
                           
                            
                           <Form.Group controlId="exampleForm.ControlTextarea1">
                               <Form.Label>Edit Kategori Kuesioner</Form.Label>

                               <br/><small className="float-center text-success pt-2 mb-3">{messageSuccess}</small><br/>

                               <Form.Control name="kategori" as="textarea" rows={3} value={Kat} onChange={ (e) => handleChange(e) } ref={register({ 
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
                               {/* <small className="float-left text-danger pt-2 mb-3">{messageErr}</small> */}
                               
                               
                           </Form.Group>
                           <br/>
                          
                            <div className="text-right">
                                <Button variant="danger" size="sm" type="submit" onClick={()=> history.push('/kuesioner/kategori')}>
                                    Kembali
                                </Button>
                                <Button variant="primary" size="sm" type="submit">
                                    Ubah
                                </Button>
                            </div>

                       </Form>

        </Card>
    )

}

export default EditKatKue;