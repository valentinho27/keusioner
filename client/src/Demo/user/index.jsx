import {BrowserRouter as Router, Route} from 'react-router-dom'  
import React, { Fragment, Suspense } from 'react';
// import Loadable from 'react-loadable';

import '../../../node_modules/font-awesome/scss/font-awesome.scss';
import Loader from '../../App/layout/Loader';
import ScrollToTop from '../../App/layout/ScrollToTop';
// import Aux from "../../hoc/_Aux";

// const KuesionerUser = lazy(()=> import('./Kuesioner/Kuesioner'))

import KuesionerIsi from './Kuesioner/KuesionerIsi';
import HomeUser from "./HomeUser/home";
import Tes from "./HomeUser/tes";

import Testimoni from "./Testimoni/Testimoni"
import Header from "./Header/Header";
import Akun from "./Akun/Akun";
import Setting from "./Setting/Setting";
import UbahPass from "./UbahPass/UbahPass";

import "../../assets/user_assets/css/bootstrap.min.css"
import "../../assets/user_assets/css/font-awesome.css"
import  "../../assets/user_assets/css/templatemo-lava.css"
import  "../../assets/user_assets/css/owl-carousel.css"





const indexUser = () => {


        return(
        
        <div>
            <ScrollToTop>
                <Router>
                <Fragment>

                    <Suspense fallback={<Loader/>}>
                    
                    <Header/>
                 
                    <Route path="/user/home" exact={true} component={HomeUser} />
                    <Route path="/user/Kuesioner" exact={true} component={Tes} />
                    <Route path="/user/testimoni" exact={true} component={Testimoni} />
                    <Route path="/user/isi_kuesioner/:id" exact={true} component={KuesionerIsi}/>
                    <Route path="/user/profil" exact={true} component={Akun} />
                    <Route path="/user/pengaturan" exact={true} component={Setting} />
                    <Route path="/user/ubahpass" exact={true} component={UbahPass} />
                    
                    </Suspense>
                
                </Fragment>
                </Router>
            </ScrollToTop>
        </div>
        )


}

export default indexUser;
