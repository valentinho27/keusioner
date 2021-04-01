import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap'
import Chart from "react-apexcharts";
import Axios from "axios";

import * as actionTypes from '../../../store/actions';
import Aux from '../../../hoc/_Aux';
import Card from '../../../../src/App/components/MainCard';
import { useHistory, useParams } from 'react-router-dom';

const parse = JSON.parse(sessionStorage.getItem('UserId'));
// console.log(parse.Token);

const Diagram = () => {

    const { id } = useParams();
    const history = useHistory();


    const [dataTanya, setDataTanya] = useState({ data: [] })
    const [dataDetailTanya, setDataDetailTanya] = useState({ pertanyaan: '' })
    const [dataDetailPilih, setDataDetailPilih] = useState({ pilihan: [] })
    const [ kategori, setKategori ] = useState('')


    const [diagram, setDiagram] = useState({
          
          series: [10, 10, 10, 10],
        
                options: {
                  chart: {
                    width: 380,
                    type: 'donut',
                  },
                  plotOptions: {
                    pie: {
                      startAngle: -90,
                      endAngle: 270
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  fill: {
                    type: 'gradient',
                  },
                  legend: {
                    formatter: function(val, opts) {
                        // console.log(opts)
                      return opts.seriesIndex+1 +' '+ 'Pilihan' + " - " + opts.w.globals.series[opts.seriesIndex]
                    }
                  },
                  title: {
                    text: 'Hasil Kuesioner',
                  },
                  responsive: [{
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }]
                },
              
              
        })
 

    const getKatKue = () => {

          Axios.get(`${actionTypes.URL_CLIENT}/api/admin/getAllKat/${id}`, {
            headers : {
              Authorization: `Bearer ${ parse.Token }`
            }
          }).then(res => {
              setKategori(res.data.dataKat[0].nama_kat)
              
          })


    }


    const getDataPertanyaan = () => {
          Axios.get(`${actionTypes.URL_CLIENT}/api/admin/getKuesioner/${id}`, {
              headers : {
                Authorization: `Bearer ${parse.Token}`
              }
          }).then(res => {
              setDataTanya({ data: res.data.allDataUserReg })
              getKatKue()
          })           
    }

    const getCountPilihan = (id) => {
      // console.log('Tess')  
      Axios.get(`${actionTypes.URL_CLIENT}/api/admin/getCountPilihan`, {
          headers: {
                     Authorization: `Bearer ${parse.Token}`
                  },
          params: id
        })
        .then(res => {
              console.log(res.data.Total)
              setDiagram({ series: res.data.Total })
        })
        .catch(err => console.log(err.message))
    }

    const getDataTanyaPilihan = (id) => {
          Axios.get(`${actionTypes.URL_CLIENT}/api/admin/detailKuesioner/${id}`, {
            headers : {
                Authorization: `Bearer ${parse.Token}`
            }
          }).then(res => {
            setDataDetailTanya({ pertanyaan: res.data.dataTanya })
            setDataDetailPilih({ pilihan: res.data.dataPilihan })

            const idPilih = res.data.dataPilihan.map(data => data.id_pilihan)
            getCountPilihan(idPilih)
      
          }).catch(err => {
             console.log(err.message)
          })

    }

    useEffect(() => {
      getDataPertanyaan();
    }, [])


   
    
    return(
        <Aux>
            <Card title={`Hasil Diagram Kategori ${kategori}`} isOption>
              <Row>
                    <Col>
                        
                        <h6>Pertanyaan</h6>
                        <Row className="pl-3">
                            <div style={{textAlign: 'justify'}}>
                              {dataDetailTanya.pertanyaan.isi_tanya ? dataDetailTanya.pertanyaan.isi_tanya : 'Pilih Nomor Pertanyaan Disamping'}
                            </div>
                        </Row>
                        <br/><br/>
                            {dataDetailPilih.pilihan.map((data, index)=> (
                              <li key={index}>Pilihan ke-{index+1}  : {data.isi_pilihan} </li>
                              
                            ))}

                        <Row className="pt-4">
                            <Chart options={diagram.options} series={diagram.series} type="donut" width={380} />
                        </Row>
                    </Col>
                    <Col>
                        <Row className="pl-4">
                          { dataTanya.data.map((data, index) => (
                                <Col key={index} md={3} sm={3} xs={2}><Button className="btn btn-sm btn-warning" onClick={ ()=> getDataTanyaPilihan(data.id_tanya) }>{index + 1}</Button> </Col>
                              )
                            ) 
                          }
                        </Row>
                    </Col>
               </Row>
               <hr/>
               <Row>
                                    
                        <Col>
                            <div className="text-center">
                                <Button className="mt-2" size="sm" variant="danger" onClick={()=> history.push('/kuesioner/diagram/kategori') } >Kembali</Button>
                            </div>
                        </Col>
              </Row>
            </Card>
        </Aux>

    )

}

export default Diagram;