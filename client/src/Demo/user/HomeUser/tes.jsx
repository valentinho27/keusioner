// import "../../../assets/user_assets/css/bootstrap.min.css"
// import "../../../assets/user_assets/css/font-awesome.css"
// import  "../../../assets/user_assets/css/templatemo-lava.css"
// import  "../../../assets/user_assets/css/owl-carousel.css"
// import "./kuesioner.css"

import React, { Suspense, useEffect, useState } from 'react';
import Aux from "../../../hoc/_Aux";
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, Table } from 'react-bootstrap';
import axios from 'axios';


import Loader from '../../../App/layout/Loader';
import * as actionTypes from "../../../store/actions"
import { Fragment } from 'react';
// import Header from "../Header/Header";




const Tes = ()=> {

    const parse = JSON.parse(sessionStorage.getItem('UserId'));
    const [ data, setData ] = useState([])


    const check = () => {
        if(!parse){
            return <Redirect to="/auth/masuk" />
        }else{
            const getDataKat = async () => {
                await axios.get(`${actionTypes.URL_CLIENT}/api/admin/getAllKatUserBelumIsi/${parse.Id}`, {
                    headers : {
                      Authorization: `Bearer ${parse.Token}`
                    }
                }).then(res => {
                    // console.log(res.data.dataKatBaru)
                    // console.log(res.data.dataTerisi)
                    
                    let arr1 = res.data.dataKatBaru;
                    let arr2 = res.data.dataTerisi;
        
                    arr1 = arr1.filter(item => {
                        let idList = arr2.map(v => v.id_kat)
                        return ! idList.includes(item.id_kat)
                    })
        
                    // console.log(arr1)
                    setData(arr1)
                   
                }).catch(err=> console.log(err))
            }
            getDataKat()
        }
    }

    useEffect(() => {
        check();
    },[])  

        return (
            
            <Aux>

            {
                !parse ? <Redirect to="/user/home" /> :
          
            <Suspense fallback={<Loader/>}>
                {/* <Header/> */}
                {/* <Breadcrumb/> */}
               
                <section className="section" id="promotion">
                    <div className="container">
                        <div className="row">
                        
                        <div className="right-text offset-lg-1 col-lg-6 col-md-12 col-sm-12 mobile-bottom-fix">
                            <ul>
                            <li data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                                <img src={require('../../../assets/user_assets/images/1.svg')} height="200" width="200" alt="true" />
                                <div className="text">
                                <h5>Tata Cara Pengisian Kuesioner</h5>
                                <p>Please do not redistribute this template ZIP file for a download purpose. You may <a rel="nofollow" href="https://templatemo.com/contact" target="_parent">contact</a> us for
                                    additional licensing of our template or to get a PSD file.</p>
                                </div>
                            </li>
                            <li data-scroll-reveal="enter right move 30px over 0.6s after 0.5s">
                                <img src={require('../../../assets/user_assets/images/22.svg')} height="200" width="200" alt="true" />
                                <div className="text">
                                <h5>Sed blandit quam in velit</h5>
                                <p>You can <a rel="nofollow" href="https://templatemo.com/tm-540-lava-landing-page">download Lava
                                    Template</a> from our website. Duis viverra, ipsum et scelerisque placerat, orci
                                    magna consequat ligula.</p>
                                </div>
                            </li>
                            <li data-scroll-reveal="enter right move 30px over 0.6s after 0.6s">
                                <img src={require('../../../assets/user_assets/images/33.svg')} height="200" width="200" alt="true" />
                                <div className="text">
                                <h5>Aenean faucibus venenatis</h5>
                                <p>Phasellus in imperdiet felis, eget vestibulum nulla. Aliquam nec dui nec augue
                                    maximus porta. Curabitur tristique lacus.</p>
                                </div>
                            </li>
                            </ul>
                        </div>

                        <div className="left-image col-lg-4 col-md-12 col-sm-12 mobile-bottom-fix-big" data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                            <img src={require('../../../assets/user_assets/images/rule.svg')} className="rounded img-fluid d-block mx-auto" alt="App" />
                        </div>

                        </div>
                    </div>
                    <br/>
                    <br/>
                  
                    <div className="container">
                    <div className="text-center">

                    <div className="cardKuesioner">
                            
                            {/* <Card.Body> */}

                            { data.length <= 0 ? <p> Kuesioner Kosong / Belum diaktifkan</p>  :

                                <Fragment>
                                    <Card.Header>
                                        <Card.Title as="h5">Daftar Kategori Kuesioner</Card.Title>
                                        <span className="d-block m-t-5"><code>Kuesioner Yang Di Tampilkan</code> Adalah Kuesioner Yang <code> Belum Anda Isi </code></span>
                                    </Card.Header>

                                    <Table responsive hover>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Kategori Kuesioner</th>
                                            <th>Aksi</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { data.map((data, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{data.nama_kat}</td>
                                            <td>
                                                <Link to={`/user/isi_kuesioner/${data.id_kat}`}>
                                                    <Button className="btn btn-sm btn success btn-sm f-12">Pilih Kuesioner</Button>
                                                </Link>
                                            </td>
                                        </tr>
                                        )) }
                                        
                                        </tbody>
                                    </Table>
                                </Fragment>
                            }   
                            {/* </Card.Body> */}
                    </div>

                    </div>
                    </div>
                </section>

            </Suspense>

            }
            </Aux>
                
            
        )
    
}

export default Tes;