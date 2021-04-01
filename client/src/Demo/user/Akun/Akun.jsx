import React, { useEffect, useState } from 'react'
import axios from 'axios'

import * as actionType from '../../../store/actions';
import './akun.css'
import { useHistory } from 'react-router-dom';

const parse = JSON.parse(sessionStorage.getItem('UserId'));


const Akun = () => {

    const history = useHistory();

    const [dataProfile, setDataProfile] = useState({data: []});
    

    const getDataApi = async() => {
        
            // console.log(parse)
            if(!parse){
                history.push('/auth/masuk')
            }
            


            const id    = parse.Id;
            await axios.get(`${actionType.URL_CLIENT}/api/profile/${id}`, {
                headers : {
                    Authorization: `Bearer ${parse.Token}` 
                }
            })
            .then(res => {
                setDataProfile({data: res.data.profilData})
            })
            .catch(err => console.log(err))
       
    }
    


    useEffect(()=>{
            getDataApi()
    }, [])

    

    return (
        <section className="section .bg-akun" id="promotion">
            <div className="pt-3">        
            <div className="container d-flex justify-content-center pt-4">
                <div className="cardL p-3 py-4">

                {/* { dataProfile.data.map((data, index)=> ( */}

                    <div className="text-center"> <img src={require('../../../assets/user_assets/images/undraw_female_avatar_w3jk.svg')} width={100} />
                        <h5 className="mt-2">{dataProfile.data.nama_user}</h5><br/>
                        <span className="mt-1 clearfix d-flex flex-column"><i className="fa fa-user text-warning fa-xs" /> {dataProfile.data.jenis_user}</span>
                        <span className="mt-1 clearfix d-flex flex-column"><i className="fa fa-envelope-o text-warning fa-xs" /> {dataProfile.data.email_user}</span><br/>
                        <small className="mt-4 text-success">{ dataProfile.data.is_active === 1 ? 'Aktif' : 'Tidak Aktif' }</small>
                        <div className="social-buttons mt-5"> 
                            <button className="neo-button" data-toggle="Pengaturan Akun" title="Pengaturan Akun" onClick={()=> history.push('/user/pengaturan') }>
                                <i className="fa fa-edit text-warning fa-1x" />
                            </button>
                            <button className="neo-button" data-toggle="ubah Password" title="ubah Password" onClick={()=> history.push('/user/ubahpass') }>
                                <i className="fa fa-key text-danger fa-1x" />
                            </button>

                        </div>
                    </div>

                {/* )) } */}
                
                </div>
            </div>
            </div>
        </section>

    );

}

export default Akun