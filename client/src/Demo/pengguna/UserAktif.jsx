import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Moment from 'react-moment';

import './modif.css';

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import Cardl from '../../App/components/MainCard';
import * as actioType from '../../store/actions';


const parse = JSON.parse(sessionStorage.getItem('UserId'));
const PenggunaAktif = () => {

        const [ userActive, setuserActive ] = useState([]);
        const [ successMsg, setsuccessMsg ] = useState('');


        const getUserActiveAPI = async () => {
            await axios.get(`${actioType.URL_CLIENT}/api/admin/userActive`, {
                        headers: {
                        Authorization : `Bearer ${parse.Token}` 
                    }
                })
                .then((res)=> {
                   
                    setuserActive(res.data.dataUserActive)
                   
                })
        }

        const actionTolakAPI = async (data) => {
    
            await axios.delete(`${actioType.URL_CLIENT}/api/admin/tolak/${data}`, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            }).then(res => {
                    // this.getUserActiveAPI();
                    getUserActiveAPI();

            }).catch(err => {
                    console.log(err.message)
            })
    
        }

        const actionBlokir = async (data) => {

            await axios.put(`${actioType.URL_CLIENT}/api/admin/blokirUser`, {id: data}, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            }).then(res => {
                getUserActiveAPI();
                setsuccessMsg(res.data.messageScs)
            }).catch(err => {
                console.log(err.message)
            })

        }

        const handleHapus = (e, data)=>{
            e.preventDefault()
            actionTolakAPI(data);
        }

        const handleBlokir = (e, data)=> {
            e.preventDefault();
            actionBlokir(data);
            
        }


        

        useEffect(()=>{
            getUserActiveAPI()
        }, [])

        return(
            
            <Cardl title="Pengguna Aktif" isOption>

                                <center><small className="float-center text-success pt-2 mb-3"><strong>{successMsg}</strong></small><br/></center>
                                <Table responsive hover>
                                    <tbody>
                                   
                                {
                                    userActive.length > 0 ?

                                    userActive.map((data, index)=> 

                                    <tr className="unread" key={index}>
                                        <td>
                                            <img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/>
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.nama_user}</h6>
                                            <p className="m-0 f-12 text-success">Pengguna Aktif</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>
                                                <Moment format="DD-MM-YYYY / hh:mm:ss">{data.createdAt}</Moment>
                                            </h6>
                                        </td>
                                        <td>
                                            <a href="" onClick={ (e) => {
                                                    handleHapus(e, data.id_user)
                                                }} className="btn-danger label theme-bg3 text-white f-12 rounded">Hapus</a>

                                            <a href="" onClick={ (e) => {
                                                    handleBlokir(e, data.id_user)
                                                }} className="label theme-bg5 text-white f-12 rounded">Blokir</a>
                                        </td>
                                    </tr>

                                    )
                                    :
                                    <tr>    
                                        <td></td>
                                        <td>
                                            <center className="text-danger">Tidak Ada User Aktif</center>
                                        </td>
                                        <td></td>
                                    </tr>
                                }

                                    
                                    </tbody>
                                </Table>
                          

            </Cardl>

        )

}

export default PenggunaAktif;