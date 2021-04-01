import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import * as actionTypes from "../../../store/actions";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import axios from 'axios';

import Button from '../../../App/components/Atom/Button';



const SignUp1 = () => {

        
        const [successMsg, setsuccessMsg] = useState();
        const [alertMsg, setalertMsg] = useState();
        const { register, errors, handleSubmit } = useForm();
        const history = useHistory();


        // const login    = useSelector(state => state.isLogin);
        const dispatch = useDispatch();
        const isLoading = useSelector(state => state.isLoading);
        const runDispatch = () => {
            dispatch({type: actionTypes.LOGIN_TRUE});
        }
        const runLoading = (action) => {
            dispatch({type: actionTypes.CHANGE_LOADING, loading: action})
        }
    
    function onSubmit(data) {
        console.log(data)

         axios.post(`${actionTypes.URL_CLIENT}/api/login-user`, {
            email: data.email,
            password: data.password
        }).then(function (response) {
            
         
            runLoading(true);

            if (response.data.alertMsg) {
                setalertMsg(response.data.alertMsg);
                runLoading(false);
            }

            if (response.data.successMsg) {
                console.log(response.data.successMsg);
                setsuccessMsg(response.data.successMsg);
                setalertMsg('');

                const data = {
                    'Id': response.data.result.id_user,
                    'Token': response.data.token,
                    'Login': response.data.logIn,
                    'Status': response.data.result.jenis_user,
                };

                const setStorange = JSON.stringify(data);
                sessionStorage.setItem('UserId', setStorange);

                if(response.data.result.jenis_user === 'admin'){
                    history.push('/dashboard/default');
                    runDispatch();
                }else{
                    history.push('/user/home/')
                    runDispatch();
                }
            }

        }).catch(function (err) {
            runLoading(false);
            console.log(err);
        });

    }

    useEffect(()=>{
        runLoading(false);
    },[])

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

                        <form onSubmit={handleSubmit(onSubmit)}>   
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Masuk</h3>
                                <h6 className="text-center text-success">{successMsg}</h6>
                                <h6 className="text-center text-danger">{alertMsg}</h6>

                                <div className="input-group">
                                    <input type="email" name="email" className="form-control" placeholder="Email" 
                                    ref={register({ 
                                                    required: 'Email Tidak Boleh Kosong !',
                                                    })}/>
                                </div>
                                <small className="float-left text-danger mb-3">{errors.email && errors.password.message}</small>
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
                                <div className="mb-3"></div><br></br>
                                
                                <Button title="Masuk" isLoading={isLoading}/>
                                <p className="mb-2 text-muted">Lupa password ? <NavLink to="/auth/reset">Reset</NavLink></p>
                                <p className="mb-0 text-muted">Belum Punya Akun ? <NavLink to="/auth/daftar">Daftar</NavLink></p>
                                <NavLink className="mb-0 text-success" to="/user/home">Home</NavLink>

                            </div>
                        </form>

                        </div>
                    </div>
                </div>
            </Aux>
        );
}

// const mapStateToProps = (state) => {
//         return {
//             isLoading : state.isLoading,
//         }
// }

// const reduxDispatch = (dispatch) => {
//     return {
//         isLoading: () => dispatch({type: actionTypes.CHANGE_LOADING}),
//     }
// }

// export default (mapStateToProps, reduxDispatch)(SignUp1);
export default SignUp1;
