import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
// import avatar3 from '../../assets/images/user/avatar-3.jpg';

import { connect } from 'react-redux';
import axios from 'axios';


const parse = JSON.parse(sessionStorage.getItem('UserId'));

class Dashboard extends React.Component {
   
    state = {
        allUser : [],
        userActive: [],
        regUser : [],
    }

    actionSetujuAPI =  async (data) => {

        await axios.put(`http://localhost:8080/api/admin/setuju`, {id: data}, {
            headers: {
                Authorization : `Bearer ${parse.Token}` 
            }
        }).then(res => {
            this.getUserActiveAPI();
            this.getUserRegisterAPI();
        }).catch(err => {
            console.log(err.message)
        })

    }

    actionTolakAPI = async (data) => {

        await axios.delete(`http://localhost:8080/api/admin/tolak/${data}`, {
            headers: {
                Authorization : `Bearer ${parse.Token}` 
            }
        }).then(res => {
               
                // this.getUserActiveAPI();
                this.getUserRegisterAPI();
        }).catch(err => {
                console.log(err.message)
        })

    }

    getUserActiveAPI = async () => {
            await axios.get('http://localhost:8080/api/admin/userActive', {
                        headers: {
                        Authorization : `Bearer ${parse.Token}` 
                    }
                })
                .then((res)=> {
                    this.setState({
                        userActive : res.data.dataUserActive,
                    })
                })
    }
     
    
    getUserRegisterAPI = async () => {
            await axios.get('http://localhost:8080/api/admin/userReg', {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            })
            .then((res)=> {
                this.setState({
                    regUser : res.data.allDataUserReg,
                })
            })
    }
    

    handleTolak = (e, data) => {

        e.preventDefault();
        this.actionTolakAPI(data)
        // this.getUserActiveAPI();
        this.getUserRegisterAPI();
    }

    handleSetuju = (e, data) => {

        e.preventDefault();
        this.actionSetujuAPI(data)
    
    }

    componentDidMount(){

        if(!parse){
            this.props.history.push('/auth/masuk')

        }else if(parse.Status != 'admin'){
            this.props.history.push('/user/home')
        }
        else{
            this.getUserActiveAPI();
            this.getUserRegisterAPI();
        }    
       
    }

    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();

    componentWillUnmount() {
       this.source.cancel("Operation canceled by the user.");
    }

    
    
    
     
    render() {
        if(!parse){
            this.props.history.push('/auth/masuk')

        }
        console.log('default')
        
        const tabContent = (
            <Aux>
               
                {
                    this.state.userActive.map((data, index) =>
                        
                        <div className="media friendlist-box align-items-center justify-content-center m-b-20" key={index}>
                            <div className="m-r-10 photo-table">
                                <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></a>
                            </div>
                            <div className="media-body">
                                <h6 className="m-0 d-inline">{data.nama_user}</h6>
                                <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>3784</span>
                            </div>
                        </div>
                    
                    )
                }

               
            </Aux>
        );

        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Daily Sales</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> $249.95</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">50%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Monthly Sales</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5"/> $2.942.32</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">36%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Yearly Sales</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> $8.638.32</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">70%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={8} xl={8}>
                    <Card className='Recent-Users'>
                            <Card.Header>
                            <Card.Title as='h5'>Permintaan Aktivasi Pengguna</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                   
                                {
                                    this.state.regUser.map((data, index)=> 

                                    <tr className="unread" key={index}>
                                        <td>
                                            <img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/>
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.nama_user}</h6>
                                            <p className="m-0">Permintaan Aktivasi</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>21 July 12:56</h6>
                                        </td>
                                        <td>
                                            <button onClick={ (e) => {
                                                    this.handleTolak(e, data.id_user)
                                                }} className="label theme-bg2 text-white f-12">Tolak</button>

                                            <button onClick={ (e) => {
                                                    this.handleSetuju(e, data.id_user)
                                                }} className="label theme-bg text-white f-12">Setuju</button>
                                        </td>
                                    </tr>

                                    )
                                }

                                    
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} xl={4} className='m-b-30'>
                        <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
                            <Tab eventKey="today" title="Data Pengguna">
                                {tabContent}
                            </Tab>
                            {/* <Tab eventKey="week" title="This Week">
                                {tabContent}
                            </Tab>
                            <Tab eventKey="all" title="All">
                                {tabContent}
                            </Tab> */}
                        </Tabs>
                    </Col>


                    <Col md={6} xl={8}>
                    <Card>
                            <Card.Header>
                                <Card.Title as='h5'>Rating</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center m-b-20">
                                    <div className="col-6">
                                        <h2 className="f-w-300 d-flex align-items-center float-left m-0">4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow"/></h2>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="d-flex  align-items-center float-right m-0">0.4 <i className="fa fa-caret-up text-c-green f-22 m-l-10"/></h6>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>5</h6>
                                        <h6 className="align-items-center float-right">384</h6>
                                        <div className="progress m-t-30 m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>4</h6>
                                        <h6 className="align-items-center float-right">145</h6>
                                        <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>3</h6>
                                        <h6 className="align-items-center float-right">24</h6>
                                        <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>2</h6>
                                        <h6 className="align-items-center float-right">1</h6>
                                        <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '10%'}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>1</h6>
                                        <h6 className="align-items-center float-right">0</h6>
                                        <div className="progress m-t-30  m-b-5" style={{height: '6px'}}>
                                            <div className="progress-bar" role="progressbar" style={{width: '0%'}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className='card-event'>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col">
                                        <h5 className="m-0">Upcoming Event</h5>
                                    </div>
                                    <div className="col-auto">
                                        <label className="label theme-bg2 text-white f-14 f-w-400 float-right">34%</label>
                                    </div>
                                </div>
                                <h2 className="mt-2 f-w-300">45<sub className="text-muted f-14">Competitors</sub></h2>
                                <h6 className="text-muted mt-3 mb-0">You can participate in event </h6>
                                <i className="fa fa-angellist text-c-purple f-50"/>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body className='border-bottom'>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="feather icon-zap f-30 text-c-green"/>
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">235</h3>
                                        <span className="d-block text-uppercase">total ideas</span>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="feather icon-map-pin f-30 text-c-blue"/>
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">26</h3>
                                        <span className="d-block text-uppercase">total locations</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <i className="fa fa-facebook text-primary f-36"/>
                                    </div>
                                    <div className="col text-right">
                                        <h3>12,281</h3>
                                        <h5 className="text-c-green mb-0">+7.2% <span className="text-muted">Total Likes</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-6">
                                        <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>35,098</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>350</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '45%', height: '6px'}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <i className="fa fa-twitter text-c-blue f-36"/>
                                    </div>
                                    <div className="col text-right">
                                        <h3>11,200</h3>
                                        <h5 className="text-c-purple mb-0">+6.2% <span className="text-muted">Total Likes</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-6">
                                        <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>34,185</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-green" role="progressbar" style={{width: '40%', height: '6px'}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>800</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-blue" role="progressbar" style={{width: '70%', height: '6px'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <i className="fa fa-google-plus text-c-red f-36"/>
                                    </div>
                                    <div className="col text-right">
                                        <h3>10,500</h3>
                                        <h5 className="text-c-blue mb-0">+5.9% <span className="text-muted">Total Likes</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-6">
                                        <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>25,998</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '80%', height: '6px'}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>900</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '50%', height: '6px'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                </Row>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        // To get the list of employee details from store
        isLogin: state.isLogin
    }
};

export default  connect(mapStateToProps, null)(Dashboard);



