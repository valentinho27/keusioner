import axios from 'axios';
import React, { useEffect, useState } from 'react';

import * as actionTypes from '../../../../store/actions';
import CardF from '../../../../App/components/MainCard';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

const parse = JSON.parse(sessionStorage.getItem('UserId'));


const KategoriKatUser = () => {

        const [ dataKat, setDataKat ] = useState({data: []});


        const {id} = useParams();
        const history = useHistory();
        
        
        
        const getKatUser = async () => {

            await axios.get(`${actionTypes.URL_CLIENT}/api/admin/getKatjwbUser/${id}`, {
                headers : {
                    Authorization : `Bearer ${parse.Token}` 
                }
            })
            .then(res => {
                    setDataKat({data: res.data.dataKat})
                }
                )
            .catch(err => console.log(err.message))
        }

    useEffect(()=>{
        getKatUser()
    }, []);



        return(
               
            <CardF isOption>


                           

                                

                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Kategori Kuesioner Yang Telah Dijawab</th>
                                        <th><center>Aksi</center></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        { dataKat.data.map((data, index)=> (
                                            <tr key={index}>
                                                <td>{data.nama_kat}</td>
                                                <td> <center>
                                                    <Button variant="success" 
                                                            size="sm" 
                                                            onClick={()=> { history.push({
                                                                                            pathname: `/kuesioner/hasil/kat`,
                                                                                            id : id,
                                                                                            id_kat: data.id_kat,
                                                                                        })
                                                                            }} ><small>Lihat Jawaban</small>
                                                    </Button>
                                                    </center>
                                                </td>
                                            </tr>
                                        )) }

                                    <tr>
                                        <th></th>
                                        <th>
                                            <center>
                                                <Button variant="danger" size="sm" onClick={()=>{history.push('/kuesioner/hasil')}}><small>Kembali</small></Button>
                                            </center>
                                        </th>
                                    </tr>

                                    </tbody>
                                </Table>

                                <div className="float-right pl-6">
                                </div><br/>
                            
            </CardF>

        )
        
}

export default KategoriKatUser;