import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

import Moment from 'react-moment';


import avatar2 from '../../assets/images/user/avatar-2.jpg';
import Cardl from '../../App/components/MainCard';
import * as actioType from '../../store/actions';


const parse = JSON.parse(sessionStorage.getItem('UserId'));

const PenggunaAktifasi = () => {

        const  [ regUser, setregUser ] = useState([]);


        const getUserRegisterAPI = async () => {
            await axios.get(`${actioType.URL_CLIENT}/api/admin/userReg`, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            })
            .then((res)=> {
                setregUser(res.data.allDataUserReg)
               
            })
        }

        const actionSetujuAPI =  async (data) => {

            await axios.put(`${actioType.URL_CLIENT}/api/admin/setuju`, {id: data}, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            }).then(res => {
                // this.getUserActiveAPI();
                getUserRegisterAPI();
            }).catch(err => {
                console.log(err.message)
            })
    
        }
    
        const actionTolakAPI = async (data) => {
    
            await axios.delete(`${actioType.URL_CLIENT}/api/admin/tolak/${data}`, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            }).then(res => {
                    // this.getUserActiveAPI();
                    getUserRegisterAPI();

            }).catch(err => {
                    console.log(err.message)
            })
    
        }

        const handleTolak = (e, data) => {

            e.preventDefault();
            actionTolakAPI(data)
            getUserRegisterAPI();
        }
    
        const handleSetuju = (e, data) => {
    
            e.preventDefault();
            actionSetujuAPI(data)
        
        }

        useEffect(()=>{
            getUserRegisterAPI();
        }, [])

        return(
            
            <Cardl title="Permintaan Aktifasi Pengguna" isOption>

                    
                                <Table responsive hover>
                                    <tbody>
                                   
                                {
                                    regUser.length > 0 ?

                                    regUser.map((data, index)=> 

                                    <tr className="unread" key={index}>
                                        <td>
                                            <img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/>
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.nama_user}</h6>
                                            <p className="m-0">Permintaan Aktivasi</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>
                                                <Moment format="DD - MM - YYYY / hh:mm:ss">{data.createdAt}</Moment>
                                            </h6>
                                        </td>
                                        <td>
                                            <a href="" onClick={ (e) => {
                                                    handleTolak(e, data.id_user)
                                                }} className="label theme-bg2 text-white f-12 rounded">Tolak</a>

                                                <a href="" onClick={ (e) => {
                                                    handleSetuju(e, data.id_user)
                                                }} className="label theme-bg text-white f-12 rounded">Setuju</a>
                                        </td>
                                    </tr>

                                    )
                                    :
                                    <tr>    
                                        <td></td>
                                        <td>
                                            <center className="text-danger">Tidak Ada Permintaan Aktifasi</center>
                                        </td>
                                        <td></td>
                                    </tr>
                                }

                                    
                                    </tbody>
                                </Table>
                          

            </Cardl>

        )

}

export default PenggunaAktifasi;