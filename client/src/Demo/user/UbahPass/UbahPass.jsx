import React, { useEffect, useState } from 'react'
import axios from 'axios'

import * as actionType from '../../../store/actions';
import '../Akun/akun.css'
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";

const parse = JSON.parse(sessionStorage.getItem('UserId'));

const UbahPass = () => {

    const id = parse.Id;
    const history = useHistory();
    const [alertmsgold, setAlertmsgold] = useState('');
    const [successMsg, SetSuccessMsg] = useState('');
    const { register, errors, handleSubmit } = useForm();


    const updatePassApi = async(data) => {
        
        

            const updateData = {
                id : id,
                passLama: data.pass_lama,
                passBaru: data.pass_baru,
            }
            
            await axios.put(`${actionType.URL_CLIENT}/api/updatePass`, updateData, {
                headers : {
                    Authorization: `Bearer ${parse.Token}` 
                }
            }).then(res => {
                
                if(res.data.alertmsgold){
                    setAlertmsgold(res.data.alertmsgold);
                }
                if(res.data.successMsg){
                    SetSuccessMsg(res.data.successMsg)
                    setAlertmsgold('');
                }
            })
        
    }

    const onSubmit = (data, e) => {
            SetSuccessMsg('')
            updatePassApi(data)
            e.target.reset();
    }

    

    return (

        <section className="section .bg-akun" id="promotion">
            <div className="pt-3">        
            <div className="container d-flex justify-content-center pt-4">
                <div className="cardL p-3 py-4"><br/>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="text-center"> <img src={require('../../../assets/user_assets/images/undraw_unlock_24mb.svg')} width={100} className="rounded-circle" /><br/>
                        <small className="mt-2">Ubah Password</small><br/>

                        <small className="float-center text-success">{successMsg}</small>


                        <span className="mt-1 clearfix d-flex flex-column">
                            <i className="fa fa-key text-warning fa-xs" />
                            <input type="password" className="form-control input-sm pt-1" 
                                    name="pass_lama"
                                    placeholder="Masukan Password Lama Anda !" 
                                    ref={ register({
                                        required: 'Password Lama Tidak Boleh Kosong !', 
                                        minLength : {
                                            value: 6,
                                            message: 'Password Lama Minimal 6 Karakter' // <p>error message</p>
                                        },
                                        maxLength : {
                                                    value: 200,
                                                    message: 'Passwor Lama Maksimal 200 Karakter' // <p>error message</p>
                                                }
                                        })
                                    }
                            
                            />
                            <small className="float-left text-danger">{errors.pass_lama && errors.pass_lama.message}</small>
                            <small className="float-left text-danger">{alertmsgold}</small><br/>


                        </span>
                        
                        <span className="mt-1 clearfix d-flex flex-column pb-2">
                            <i className="fa fa-key text-success fa-xs" />
                            <input type="password" className="form-control input-sm pt-1" 
                                    name="pass_baru"
                                    placeholder="Masukan Password Baru Anda !" 
                                    ref={ register({
                                        required: 'Password Baru Tidak Boleh Kosong !', 
                                        minLength : {
                                            value: 6,
                                            message: 'Passwor Baru Minimal 6 Karakter' // <p>error message</p>
                                        },
                                        maxLength : {
                                                    value: 200,
                                                    message: 'Passwor Baru Maksimal 200 Karakter' // <p>error message</p>
                                                }
                                        })
                                    }
                            
                            />
                            <small className="float-left text-danger">{errors.pass_baru && errors.pass_baru.message}</small>

                        </span>

                        {/* <small className="mt-4 text-success">{ dataProfile.data.is_active === 1 ? 'Aktif' : 'Tidak Aktif' }</small> */}
                        <div className="social-buttons mt-5"> 
                            <button className="btn btn-warning btn-sm" data-toggle="Ubah" title="Ubah" type="submit">
                                <i className="fa fa-edit text-white fa-1x"> Ubah</i>
                            </button>
                        </div>
                    </div>
                </form>

                {/* )) } */}
                
                </div>
            </div>
            </div>
        </section>

    );

}

export default UbahPass