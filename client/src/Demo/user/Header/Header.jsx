import React, { Fragment, Suspense } from 'react'
import { withRouter } from 'react-router';


import "../../../assets/user_assets/css/bootstrap.min.css"
import "../../../assets/user_assets/css/font-awesome.css"
import "../../../assets/user_assets/css/templatemo-lava.css"
import "../../../assets/user_assets/css/owl-carousel.css"
import { Link } from 'react-router-dom'
import Loader from '../../../App/layout/Loader';



class Header extends React.Component {

    state = {
        active : '',
        responsive: '',
        submenuli: '',
        hidemenu : '',
    }
    
    clearSession = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('UserId')
        this.props.history.push('/user/home') 
    }

    profilehandle = (e) => {
        e.preventDefault()
        this.state.submenuli === "active" ? this.setState({ submenuli: ''   }) :  this.setState({ submenuli: 'active'}) 
    }

    render() {

    let parse = JSON.parse(sessionStorage.getItem('UserId'));
    
    return (

        <div>
            <Suspense fallback={<Loader/>}>

            <header className="header-area header-sticky a">
                <div className="container">
                <div className="row">
                    <div className="col-12">
                    <nav className={`main-nav`}>
                       
                        <Link to="/user/home">
                                <div className="logo">
                                    vale
                                </div>
                        </Link>
                    
                        <ul className={`nav float-right ${this.state.hidemenu}`}>
                            <li className="scroll-to-section"><Link to="/user/home" className="menu-item">Home</Link></li>
                            <li className="scroll-to-section"><Link to="/user/testimoni" className="menu-item">Testimonials</Link></li>
                       
                        { parse ? 
                            <Fragment>
                            
                            <li className="scroll-to-section"><Link to="/user/kuesioner" className="menu-item">Kuesioner</Link></li>
                            {/* <li className="scroll-to-section"><Link to="/user/kuesioner" className="menu-item">Kuesioner</Link></li> */}
                            <li className="submenu">
                                <a href="" onClick={ (e) => this.profilehandle(e) }>Profil</a> 
                                <ul className={this.state.submenuli}>
                                    <li><Link to={`/user/profil`} className="menu-item">Profil</Link></li>
                                    <li><Link to={`/user/pengaturan`} className="menu-item">Pengaturan</Link></li>
                                    <li><Link to={`/user/ubahpass`} className="menu-item">Ubah Password</Link></li>
                                    <li><a href="" className="menu-item" onClick={ (e) => this.clearSession(e) }>Keluar</a></li>
                                </ul>
                            </li>
                            
                            </Fragment>
                            
                            : 
                            
                            <Fragment>
                                
                                <li className="scroll-to-section">
                                    <a href="/auth/masuk" className="menu-item">Login</a>
                                </li>
                            </Fragment>
                        
                    
                                
                        }

                        </ul>

                        <a className={`menu-trigger ${this.state.active}`} onClick={ () => {

                                                    this.state.hidemenu === '' ? this.setState({ hidemenu : 'none'  }) : this.setState({ hidemenu: '' }) 

                                                    this.state.active === '' ? this.setState({ active: 'active', hidemenu : 'none' }) : this.setState({ active: '', hidemenu: '' })

                                                
                                                } 
                                    }>
                            <span>Menu</span>
                        </a>
                        
                    </nav>
                    </div>
                </div>
                </div>
          </header>
          </Suspense>
          </div>

        )
    }
}

export default withRouter(Header);