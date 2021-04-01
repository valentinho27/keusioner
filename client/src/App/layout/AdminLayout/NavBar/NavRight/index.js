import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';


import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import Bell from '../../../../components/Atom/Bell/Bell';
import * as actionTypes from '../../../../../store/actions';
import randVal from '../../../../components/Atom/function/random';

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
import Avatar3 from '../../../../../assets/images/user/avatar-3.jpg';

const parse = JSON.parse(sessionStorage.getItem('UserId'));


class NavRight extends Component {
    state = {
        listOpen: false,
        data: [],
    };

     handlePengaturan = (e) => {
         e.preventDefault()
         this.props.history.push(`/pengaturan`)
     }

     handleProfile = (e) => {
         e.preventDefault();
         this.props.history.push(`/profil`)
  
     }

     handlePass = (e) => {
         e.preventDefault();
         this.props.history.push(`/ubahPass`)
     }

     clearSession = (e) => {
         e.preventDefault()
         sessionStorage.removeItem('UserId')
         this.props.history.push('/auth/masuk') 

     }

     getUserRegisterAPI = async () => {

        // setTimeout( async () => {
            await axios.get(`${actionTypes.URL_CLIENT}/api/admin/userReg`, {
                headers: {
                    Authorization : `Bearer ${parse.Token}` 
                }
            })
            .then((res)=> {

                    // console.log(res.data.allDataUserReg)
                    this.setState({
                        data :  res.data.allDataUserReg, 
                    })
            })
        
        // }, 4000);
    }

    componentDidMount(){
        setInterval(this.getUserRegisterAPI, 3000)
    }

    

    render() {

        const random = randVal();
        
        return (
            <Aux>
                <ul className="navbar-nav ml-auto">
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout}>
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">


                                {/* <i className="icon feather icon-bell "/> */}
                                <div>
                                    <Bell/>
                                </div>
                           
                            
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="notification">
                                <div className="noti-head">
                                    <h6 className="d-inline-block m-b-0">Pemberitahuan Aktifasi Akun</h6>
                                    {/* <div className="float-right">
                                        <a href={DEMO.BLANK_LINK} className="m-r-10">mark as read</a>
                                        <a href={DEMO.BLANK_LINK}>clear all</a>
                                    </div> */}
                                </div>
                                <ul className="noti-body">
                                    <li className="n-title">
                                        <p className="m-b-0">{this.state.data.length > 0 ? 'Baru' : ''}</p>
                                    </li>
                                    <li className="notification">
                                        { this.state.data.length > 0 ?

                                          this.state.data.map((data, index) => (

                                            <div className="media">
                                                <img className="img-radius" src={require(`../../../../../assets/images/user/${random}.jpg`)} alt="Generic placeholder"/>
                                                <div className="media-body">
                                                    <p><strong>{data.nama_user}</strong><span className="n-time text-muted"><i
                                                        className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                    <p>Permintaan Aktifasi</p>
                                                </div>
                                            </div>
                                            
                                            ))
                                        :
                                        <div className="media">
                                            <img className="img-radius" src={require('../../../../../assets/images/icon/aktifasi_kosong.png')} alt="Generic placeholder"/>
                                                <p><strong>Aktifasi Akun Kosong</strong><span className="n-time text-muted"></span></p>
                                        </div>

                                        }
                                        
                                    </li>
                                    {/* <li className="n-title">
                                        <p className="m-b-0">EARLIER</p>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={Avatar2} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>Joseph William</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>Prchace New Theme and make payment</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={Avatar3} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>Sara Soudein</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>currently login</p>
                                            </div>
                                        </div>
                                    </li> */}
                                </ul>
                                <div className="noti-footer">
                                    {this.state.data.length > 0 ? <Link to="/pengguna/aktifasi">Lihat Semua</Link> : ''}
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    <li className={this.props.rtlLayout ? 'm-r-15' : 'm-l-15'}>
                        <a href={DEMO.BLANK_LINK} className="displayChatbox" onClick={() => {this.setState({listOpen: true});}}><i className="icon feather icon-mail"/></a>
                    </li>
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-settings"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                    <span>John Doe</span>
                                    <a href={DEMO.BLANK_LINK} onClick={ (e) => this.clearSession(e) } className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"/>
                                    </a>
                                </div>
                                <ul className="pro-body">
                                    <li>
                                         <a onClick={ (e) => {
                                                     this.handlePengaturan(e)
                                                 }}  
                                             className="dropdown-item"><i className="feather icon-settings"/> Pengaturan</a>
                                     </li>
                                     <li>
                                         <a onClick={ (e) => {
                                                     this.handleProfile(e)
                                                 }} 
                                             className="dropdown-item"><i className="feather icon-user"/> Profile</a>
                                     </li>
                                     <li>
                                         <a onClick={ (e) => {
                                                     this.handlePass(e)
                                                 }} 
                                             className="dropdown-item"><i className="feather icon-lock"/>Ganti Password</a>
                                     </li> 
                                 </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
                <ChatList listOpen={this.state.listOpen} closed={() => {this.setState({listOpen: false});}} />
            </Aux>
        );
    }
}

export default withRouter(NavRight);
