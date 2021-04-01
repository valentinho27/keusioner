import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

import Card from '../../../App/components/MainCard'
import * as actionTypes from '../../../store/actions'

const parse = JSON.parse(sessionStorage.getItem('UserId'));

const DiagramKat = () => {

    const history = useHistory();

    const [ dataKat, setDataKat ] = useState({data: []});


    const getKategori = async () => {

        await axios.get(`${actionTypes.URL_CLIENT}/api/admin/getAllKat`, {
            headers: {
                Authorization : `Bearer ${parse.Token}` 
            }
        }).then(res => {
            // console.log(res)
            setDataKat({data: res.data.dataKat})
        }).catch(err=>{
            console.log(err)
        })

    }

    useEffect(()=> {

        getKategori()

    }, [])


    return(

        <Card title="Pilih Kategori Kuesioner" isOption>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Kategori Kuesioner</th>
                    <th> <center>Aksi</center> </th>
                   
                    </tr>
                </thead>
                <tbody>


                { dataKat.data.map((data, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                                {data.nama_kat}  
                        </td>
                        <td>
                            <center> 
                                <Button variant="success" size="sm" onClick={()=> history.push(`/kuesioner/diagram/${data.id_kat}`)}>Lihat</Button>
                            </center>
                        </td>
                    </tr>
                )) }
                    
                </tbody>
            </Table>
        </Card>
    )
}

export default DiagramKat;