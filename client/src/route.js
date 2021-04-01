import React from 'react';
import KuesionerUser from './Demo/user/Kuesioner/Kuesioner';

const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));
const Reset   = React.lazy(() => import('./Demo/Authentication/Reset/Reset'));

const indexUser = React.lazy(() => import('./Demo/user'));
const HomeUser  = React.lazy(() => import('./Demo/user/HomeUser/home'));
// const Kuesioner = React.lazy(() => import('./Demo/user/Kuesioner/Kuesioner'));



const route = [
    { path: '/auth/daftar', exact: true, name: 'Daftar', component: SignUp1 },
    { path: '/auth/masuk', exact: true, name: 'Masuk', component: Signin1 },
    { path: '/auth/reset', exact: true, name: 'Reset', component: Reset },

    { path: '/user/home', exact: true, name: 'Home', component: indexUser },
    { path: '/user/detail', exact: true, name: 'Detail', component: HomeUser },
    // { path: '/user/kuesioner', exact: true, name: 'Kuesioner', component: Kuesioner }
    

];

export default route;