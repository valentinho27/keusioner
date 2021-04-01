import React, { useEffect, useState } from 'react'
import axios from 'axios'

import * as actionType from '../../../store/actions';
import '../Akun/akun.css'
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";


const parse = JSON.parse(sessionStorage.getItem('UserId'));

const Setting = () => {

    const id    = parse.Id;

    const history = useHistory();
    const [nama, setNama]   = useState({nama: ''});
    const [email, setEmail] = useState({ email: '' })

    const [warningMsg, setwarningMsg] = useState('')
    const [messageScs, setMessageScs] = useState('');


    // const [dataProfile, setDataProfile] = useState({data: []});


    const { register, errors, handleSubmit } = useForm();

   

    const getDataApi = async() => {
        
        if(!parse){
           
            history.push('/')
           
        }else{

            await axios.get(`${actionType.URL_CLIENT}/api/profile/${id}`, {
                headers : {
                    Authorization: `Bearer ${parse.Token}` 
                }
            })
            .then(res => {
               
                setNama({ nama: res.data.profilData.nama_user })
                setEmail({ email: res.data.profilData.email_user })
               
            })
            .catch(err => console.log(err))
        }
    }

    const handelUpdateApi = async (data) => {
        if(!parse){
            history.push('/')

        }else{
            
            const dataInput = {
                id : id,
                nama: data.nama_user,
                email: data.email_user,
            }
            await axios.put(`${actionType.URL_CLIENT}/api/updateProfile/`, dataInput, {
                headers: {
                    Authorization: `Bearer ${parse.Token}`
                }
            }).then(res => {
                if(res.data.messageAlert){
                    setwarningMsg(res.data.messageAlert)
                }else{
                    setMessageScs(res.data.messageScs)
                    setTimeout(()=>{
                        history.push(`/user/profil`)
                    }, 2000)
                }
                
            })
        }
    }

    const onSubmit = (data) => {
        handelUpdateApi(data)
    }
    
    const handleEmail = (e) => {
        const {value} = e.target;
        setEmail({email: value})
    }

    const handleNama = (e) => {
        const {value} = e.target;
        setNama({nama: value})
    }

    useEffect(()=>{
        getDataApi()
    }, [])

    

    return (
        <section className="section .bg-akun" id="promotion">
            <div className="pt-3">        
            <div className="container d-flex justify-content-center pt-4">
                <div className="cardL p-3 py-4">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <center>
                    <small className="text-center text-success pt-3">{messageScs}</small>
                    </center>
                    <br/>

                    <div className="text-center"> <img src={require('../../../assets/user_assets/images/undraw_settings_ii2j.svg')} width={100} className="rounded" /><br/>
                        <small className="mt-2">Ubah Profil</small><br/>

                        <span className="mt-1 clearfix d-flex flex-column">
                            <i className="fa fa-user text-warning fa-xs" />
                            <input type="text" className="form-control input-sm pt-1" 
                                    name="nama_user"
                                    placeholder="Nama Pengguna"
                                    onChange={(e)=> handleNama(e)} 
                                    value={nama.nama || ''} 
                                    ref={ register({
                                        required: 'Nama Tidak Boleh Kosong !', 
                                    
                                        maxLength : {
                                                    value: 200,
                                                    message: 'Nama Maksimal 200 Karakter' // <p>error message</p>
                                                }
                                        })
                                    }
                            
                            />
                            <small className="float-left text-danger">{errors.nama_user && errors.nama_user.message}</small>

                        </span>
                        
                        <span className="mt-1 clearfix d-flex flex-column pt-3 pb-2">
                            <i className="fa fa-envelope-o text-warning fa-xs" /> 
                                <input type="text" className="form-control input-sm pt-1" 
                                        name="email_user"
                                        onChange={(e)=>handleEmail(e)}
                                        placeholder="Email Pengguna" 
                                        value={email.email || ''} 
                                        ref={ register({
                                            required: 'Email Tidak Boleh Kosong !', 
                                        
                                            maxLength : {
                                                        value: 200,
                                                        message: 'Email Maksimal 200 Karakter' // <p>error message</p>
                                                    }
                                            })
                                        }
                                />
                            <small className="float-left text-danger">{errors.email_user && errors.email_user.message}</small>
                            <small className="float-left text-danger pt-3">{warningMsg}</small>
                            
                        </span><br/>

                        <div className="social-buttons mt-5"> 
                            <button className="btn btn-warning btn-sm" data-toggle="Ubah" title="Ubah" type="submit">
                                <i className="fa fa-edit text-white fa-1x">Ubah</i>
                            </button>
                        </div>
                    </div>

                </form>
                
                </div>
            </div>
            </div>
        </section>

    );

}

export default Setting