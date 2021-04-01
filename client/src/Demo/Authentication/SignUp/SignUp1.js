import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../../store/constant";

import { useForm } from "react-hook-form";
import axios from 'axios';


function SignUp1() {
   
    const history = useHistory();

    const [successMsg, setsuccessMsg]  = useState();
    const [alertMsg, setalertMsg]      = useState();
    const { register, errors, reset, handleSubmit } = useForm();

    
   
    const onSubmit = (data) => {
        axios.post('http://localhost:8080/api/add-user', {
                        
                        nama_user: data.nama,
                        email_user: data.email,
                        pass_user: data.password,
                        
                  }).then(function (response) {
                     console.log(response);
                    
                    if(response.data.messagesalert){
                        setalertMsg(response.data.messagesalert);
                    }else{
                        setsuccessMsg('Pendaftaran Berhasil !');
                        setTimeout( ()=> {
                            return history.push("/auth/masuk");
                        }, 4000);
                         reset();    
                    }
                    

                  }).catch(function (error) {
                     console.log(error);
                   
                  });


    };

        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-user-plus auth-icon"/>
                                </div>
                                <h3 className="mb-4">Daftar</h3>
                                <h6 className="text-center text-success">{successMsg}</h6>
                                

                        <form onSubmit={handleSubmit(onSubmit)}>    

                                
                                <div className="input-group">
                                    <input type="text" name="nama" className="form-control" placeholder="Nama"
                                        ref={register({ required: true })}
                                    />
                                </div>
                                <small className="float-left text-danger mb-3">{errors.nama && "Nama Tidak Boleh Kosong !"}</small>
                                <div className="mb-3"></div>

                                <div className="input-group">
                                    <input type="email" name="email" className="form-control" placeholder="Email"
                                        ref={register({ 

                                                    required: 'Email Tidak Boleh Kosong !',
                                                   

                                             })}
                                    />
                                </div>
                                <small className="float-left text-danger mb-3">{errors.email && errors.email.message}</small>
                                <small className="float-left text-danger mb-3">{alertMsg}</small>
                                <div className="mb-3"></div>


                                <div className="input-group">
                                    <input type="password" name="password" className="form-control" placeholder="password"
                                        ref={ register({
                                                            required: 'Password Tidak Boleh Kosong !', 
                                                            minLength : {
                                                                        value: 6,
                                                                        message: 'Password Minimal 6 Karakter' // <p>error message</p>
                                                                    },
                                                            maxLength : {
                                                                        value: 30,
                                                                        message: 'Password Maksimal 30 Karakter' // <p>error message</p>
                                                                    }
                                                        })
                                            }
                                    />

                                   

                                </div>
                                <small className="float-left text-danger mb-3">{errors.password && errors.password.message}</small>
                                <div className="mb-3"></div>


                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                                            <label htmlFor="checkbox-fill-2" className="cr">Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a> weekly.</label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary shadow-2 mb-4">Daftar</button>
                                <p className="mb-0 text-muted">Sudah Punya Akun ? <NavLink to="/auth/masuk">Masuk</NavLink></p>
                        
                        </form>

                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }


export default SignUp1;