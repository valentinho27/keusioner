import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import * as actionTypes from "../../../store/actions"
import "./kuesioner.css"


const parse = JSON.parse(sessionStorage.getItem('UserId'));

const KuesionerIsi = () => {
   
    const ArridTanya                            = []
    const history                               = useHistory()
    const { id }                                = useParams()
    const [dataTanya, SetDataTanya]             = useState({data: []})
    const [dataDetailTanya, setDataDetailTanya] = useState({ pertanyaan: '', pilihan : [] })
    const [ messageSuccess, setmessageSuccess ] = useState('')
    const [ msuccessInput, setmsuccessInput ]   = useState('')
    const [ preview, setPreview ]               = useState({ now: 0, allques: 0 })    

    
    dataTanya.data.map(data => ArridTanya.push(data.id_tanya))


    
    const getDataPertanyaan = async () => {
        await axios.get(`${actionTypes.URL_CLIENT}/api/admin/getKuesioner/${id}`, {
            headers : {
              Authorization: `Bearer ${parse.Token}`
            }
        }).then(res => {
            SetDataTanya({ data: res.data.allDataUserReg })
            console.log('adad')
        }).catch(err => console.log(err))           
    }

    const getDataTanyaPilihan = async (id) => {
        await axios.get(`${actionTypes.URL_CLIENT}/api/admin/detailKuesioner/${id}`, {
          headers : {
              Authorization: `Bearer ${parse.Token}`
          }
        }).then(res => {
            setDataDetailTanya({ pertanyaan: res.data.dataTanya, pilihan: res.data.dataPilihan })
        }).catch(err => {
           console.log(err.message)
        })

    } 

      const mulai = () => {
        const first = ArridTanya[0]
        setPreview({ now: 1, allques: ArridTanya.length})
        getDataTanyaPilihan(first)
            
      }

      const prosesInput = async (data) => {
            
            await axios.post(`${actionTypes.URL_CLIENT}/api/post/inputJawaban/`, data, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            }).then( res => {
                setmsuccessInput(res.data.messageSuccessInput)
                setTimeout(()=>{
                    setmsuccessInput('')
                }, 1000)
            })
      }

      
      const handleWeekdayChange = (id_tanya, id_pilihan) => {


        const index = ArridTanya.indexOf(id_tanya);
        setPreview({ now: index+1, allques: ArridTanya.length})
 
            if(index >= 0 && index < ArridTanya.length - 1){                
                const nextItem = ArridTanya[index + 1]
                getDataTanyaPilihan(nextItem)


            }else{
                setmessageSuccess('Terima Kasih Sudah Mengisi Kuesioner Ini')
            }

           const data = {
                id_tanya : id_tanya,
                id_user : parse.Id,
                id_pilihan : id_pilihan,

           }

           prosesInput(data)
            
            
      }

    useEffect(() => {
        getDataPertanyaan()
    }, [])

    return(

          <Fragment>

            <div className="container">
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="col-lg-8 offset-lg-2">
                <div className="center-heading">
                    <h2>Teliti <em>Sebelum Menjawab</em></h2>
                   
                    <p>Suspendisse vitae laoreet mauris. Fusce a nisi dapibus, euismod purus non, convallis odio.
                    Donec vitae magna ornare, pellentesque ex vitae, aliquet urna.</p>
                   

                </div>
            </div>


                    <div className="footer-content">
                    

                        <div className="row">
                        <div className="col-2"></div>
                        {/* <div className="col-4 text-center" style={{backgroundColor: '#f4f9f9'}}>
                            <label className="pt-2 pl-2">Nomor Kuesioner</label>


                                {

                                ArridTanya.length <= 0 ? '' :
                                

                                    preview.now <= 0 ? <p className="text-success"> Tekan Tombol Mulai </p>
                                    
                                    :

                                    <Fragment>
                                        <center>
                                            <p className="text-success text-center pt-4">{preview.now} / {preview.allques}</p><br/>
                                        </center>

                                        <div className="row">
                                            <div className="text-center">
                                                {
                                                    dataTanya.data.map((data, index)=> (
                                                    <div className="col-3 pl-2" key={index}>
                                                        <Button className="mt-2" size="sm" variant="success" onClick={ () => getDataTanyaPilihan(data.id_tanya) }>{index+1}</Button>
                                                    </div> 
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </Fragment>

                                }
                            

                        </div> */}
                        
                        <div className="col-8" style={{backgroundColor: '#f4f9f9'}}>

                        { 
                          messageSuccess ?  
                        <center>
                            
                            <Fragment>
                                <div className="pt-4 pb-4">
                                    <p className="text-success">{messageSuccess}</p>
                                    <div className="text-center">
                                        <img src={require('../../../assets/user_assets/images/thanks1.svg')} height="120" width="100" alt="true" />
                                    </div>
                                    <p className="text-danger"><small>Tekan Tombol Selesai Untuk Menyimpan Jawaban Anda !</small></p>
                                </div>

                                <div className="pt-4 pb-3">
                                    <Button className="btn btn-sm btn-success" onClick={ () => history.push("/user/kuesioner") }>Selesai</Button>
                                </div>
                            </Fragment>
                        </center>
                          
                                        
                        :

                        <Fragment>

                            <div className="text-center">
                            {

                                    ArridTanya.length <= 0 ? '' :


                                        preview.now <= 0 ? 
                                        
                                        <Fragment>
                                            <div className="text-center">
                                                <img src={require('../../../assets/user_assets/images/isi.svg')} height="120" width="100" alt="true" />
                                            </div>
                                                <p className="text-success"> Tekan Tombol Mulai </p>
                                        </Fragment>
                                        
                                        :

                                        <Fragment>
                                            <center>
                                                <p className="text-success text-center pt-4">{preview.now} / {preview.allques}</p><br/>
                                            </center>
                                        </Fragment>

                                    }
                            </div>

                            <div className="cardKuesioner">

                                <div className="row pl-3">
                                    <div className="col-md-12 col-sm-12 text-center">
                                    <label className="pt-2">Daftar Kuesioner</label>
                                    
                                    <p className="pl-3 pt-2">

                                    {
                                            dataDetailTanya.pertanyaan.isi_tanya ? dataDetailTanya.pertanyaan.isi_tanya 
                                       : 

                                            // dataDetailTanya.pertanyaan.isi_tanya === null ? '0 Belum Ada Kuesioner Untuk Kategori ini' :

                                            ArridTanya.length > 0 ? 

                                            <Button onClick={ () => mulai()} className="btn btn-sm btn-success w-30">
                                                Mulai 
                                            </Button> 
                                        :
                                                "Belum Ada Kuesioner Untuk Kategori ini"
                                       }
                                    </p>
                                    </div>
                                    <br/>

                                <div className="col-md-12 col-sm-12 pb-3">
                                    <br/>
                                    <fieldset>
                                        <div className="container">

                                        {
                                            
                                        dataDetailTanya.pilihan.map((data, index)=>(
                                            
                                            <div className="row" key={index}>

                                                <div className="col-lg-12">
                                                    <Button onClick={ () => handleWeekdayChange(data.id_tanya, data.id_pilihan)} className="btn btn-sm btn-light w-100">
                                                        {data.isi_pilihan}    
                                                    </Button> 
                                                </div>   
                                            </div>
                                        
                                        ))} 
                                           
                                        </div>
                                        <p className="text-success text-center pb-3"><small>{msuccessInput}</small></p>

                                    </fieldset>

                                </div>
                                </div>
                            </div>
                            </Fragment>
                        
                        }

                        </div>
                        <div className="col-2"></div>
                        </div>
                        
                      

                    </div>
                  
                    </div>


          </Fragment>
    )

}

export default KuesionerIsi;