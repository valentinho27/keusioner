import "../../../assets/user_assets/css/bootstrap.min.css"
import "../../../assets/user_assets/css/font-awesome.css"
import  "../../../assets/user_assets/css/templatemo-lava.css"
import  "../../../assets/user_assets/css/owl-carousel.css"
import "./kuesioner.css"

import React, { Suspense, useEffect, useState } from 'react';
import Aux from "../../../hoc/_Aux";
import { Link, Redirect } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';


import Loader from '../../../App/layout/Loader';
import * as actionTypes from "../../../store/actions"
import Header from "../Header/Header";




const KuesionerUser = ()=> {

    
   return(
    <Aux>

    {/* <div id="preloader">
    <div className="jumper">
        <div />
        <div />
        <div />
    </div>
    </div> */}

        <div className="welcome-area" id="welcome">
        {/* ***** Header Text Start ***** */}
        <div className="header-text">
            <div className="container">
            <div className="row">
                <div className="left-text col-lg-6 col-md-12 col-sm-12 col-xs-12" data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                <h1>Simple App that we <em>CREATE</em></h1>
                <p>Lava <a href="#">HTML landing page</a> template is provided by <a href="#">TemplateMo</a>.
                    You can modify and use it for your commercial websites for free of charge. This template is last updated on 29 Oct 2019.</p> 
                <a href="#about" className="main-button-slider">KNOW US BETTER</a>
                </div>
            </div>
            </div>
        </div>
        {/* ***** Header Text End ***** */}
        </div>


    
    </Aux>     
   )       
            
    
}

export default KuesionerUser;