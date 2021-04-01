import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Moment from 'react-moment';

import './modif.css';

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import Cardl from '../../App/components/MainCard';
import * as actioType from '../../store/actions';


const parse = JSON.parse(sessionStorage.getItem('UserId'));


const PenggunaBlokir = () => {

    const [ userBlokir, setuserBlokir ] = useState([]);
    const [ successMsg, setsuccessMsg ] = useState('');


    const getUserBlokirAPI = async () => {
        await axios.get(`${actioType.URL_CLIENT}/api/admin/userBlokir`, {
                    headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            })
            .then((res)=> {
                
                setuserBlokir(res.data.dataUserActive)
               
            })
    }

    const actionSetujuAPI =  async (data) => {

        await axios.put(`${actioType.URL_CLIENT}/api/admin/setuju`, {id: data}, {
            headers: {
                Authorization : `Bearer ${parse.Token}` 
            }
        }).then(res => {
            // this.getUserActiveAPI();
            getUserBlokirAPI();
        }).catch(err => {
            console.log(err.message)
        })

    }

    const handleBukaBlokir = (e, data)=> {
        e.preventDefault()
        actionSetujuAPI(data);
    }

    useEffect(()=>{
        getUserBlokirAPI()
    }, [])

    return(
        
        <Cardl title="Daftar User di Blokir" isOption>

                            <center><small className="float-center text-success pt-2 mb-3"><strong>{successMsg}</strong></small><br/></center>
                            <Table responsive hover>
                                <tbody>
                               
                            {
                                userBlokir.length > 0 ?

                                userBlokir.map((data, index)=> 

                                <tr className="unread" key={index}>
                                    <td>
                                        <img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/>
                                    </td>
                                    <td>
                                        <h6 className="mb-1">{data.nama_user}</h6>
                                        <p className="m-0 text-danger f-12">Di Blokir</p>
                                    </td>
                                    <td>
                                        <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>
                                            <Moment format="DD-MM-YYYY / hh:mm:ss">{data.createdAt}</Moment>
                                        </h6>
                                    </td>
                                    <td>
                                        {/* <a href="" onClick={ (e) => {
                                                handleHapus(e, data.id_user)
                                            }} className="btn-danger label theme-bg3 text-white f-12 rounded">Hapus</a> */}

                                        <a href="" onClick={ (e) => {
                                                handleBukaBlokir(e, data.id_user)
                                            }} className="label theme-bg4 text-white f-12 rounded">Buka Blokir</a>
                                    </td>
                                </tr>

                                )
                                :
                                    <tr>    
                                        <td></td>
                                        <td>
                                            <center className="text-danger">Tidak Ada User yang di Blokir</center>
                                        </td>
                                        <td></td>
                                    </tr>
                            }

                                
                                </tbody>
                            </Table>
                      

        </Cardl>

    )

}

export default PenggunaBlokir;