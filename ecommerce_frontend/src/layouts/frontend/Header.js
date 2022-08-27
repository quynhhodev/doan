import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Slider from "react-slick";
import Search from '../../components/frontend/Search';
import {
    Link, withRouter
} from "react-router-dom";
import Logo from "../../assets/frontend/images/logo.png";

class Header extends React.PureComponent {
    state = {
        cart: [],
        count: localStorage.getItem('count'),
        banner: [],
        loading: true
    }
    handleLogout = (e) => {
        e.preventDefault();
        axios.post(`api/logout`).then(res => {
            localStorage.removeItem('auth_name')
            localStorage.removeItem('auth_token')
            this.props.history.push('/');
        })
    }
    async componentDidMount() {

        let res = await axios.get(`/api/cart`)
        if (res.data.status === 200) {
            this.setState({ cart: res.data.cart, });
        }
        let result = await axios.get(`api/banner-top/${1}`)
        if (result.data.status === 200) {
            this.setState({ banner: result.data.data, loading: false });
        }
    }


    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToScroll: 1,
            className: "center",
            slidesToShow: 1,
            autoplay: true,
            speed: 800,
            autoplaySpeed: 15000,
            cssEase: "ease-in-out"
        };
        var img_path = "http://localhost:8000/img/"
        return (
            <>
                <header className="section-header">
                    <section className="header-main border-bottom" style={{ backgroundColor: "#ffcc00" }}>
                        <div className="container" >
                            <div className="row" >
                                <Slider arrows={false} {...settings} >
                                    {/* {this.state.loading && <img src={img_path} alt="null" style={{ width: '1200px', height: '44px' }} />} */}
                                    {!this.state.loading && this.state.banner && this.state.banner.length > 0 ? this.state.banner.map((item, index) => {
                                        let img = JSON.parse(item.image)
                                        return (

                                            <img src={img_path + img} alt="null" key={index} />

                                        )

                                    }) : <div style={{ width: '1200px', height: '44px' }}></div>}

                                </Slider>
                                {/* <img src={Banner} alt="null" /> */}
                            </div>
                            <div className="row align-items-center">
                                <div className="col-xl-2 col-lg-3 col-md-12">
                                    <a href="/" className="brand-wrap">
                                        <img className="logo" src={Logo} alt='null' />
                                    </a>
                                </div>
                                <div className="col-xl-6 col-lg-5 col-md-6">
                                    <Search />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                    <div className="widgets-wrap float-md-right">
                                        <div className="widget-header mr-3">

                                            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                                                <li className="nav-item dropdown dropdown-menu-end">
                                                    <Link className="nav-link" style={{ marginLeft: "15px" }} id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><div className="icon-area"><i className="fa fa-user" style={{ color: "black" }}></i></div></Link>
                                                    <small className="text ml-0" > Tài khoản </small>
                                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                                        <li><Link className="dropdown-item" to="/setting-user">Chỉnh sửa</Link></li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        {!localStorage.getItem('auth_token') ?
                                                            <><li className="dropdown-item"><Link to="/login" className="" exact={true}>Đăng nhập</Link></li>
                                                                <li className="dropdown-item"><Link to="/register" exact={true}>Đăng kí</Link></li></> :
                                                            <li className="dropdown-item"><button type="button" onClick={(e) => this.handleLogout(e)} style={{ border: "none", backgroundColor: "inherit" }} >Đăng xuất</button></li>}
                                                    </ul>
                                                </li>
                                            </ul>


                                        </div>
                                        <div className="widget-header mr-3">
                                            <Link to="/order" className="widget-view">
                                                <div className="icon-area">
                                                    <i className="fa fa-store" style={{ color: "black" }}></i>
                                                    <span className="notify">{this.props.dataOrder}</span>

                                                </div>
                                                <small className="text"> Đơn Hàng </small>
                                            </Link>
                                        </div>
                                        <div className="widget-header">
                                            <Link to="/cart" className="widget-view">
                                                <div className="icon-area">
                                                    <i className="fa fa-shopping-cart" style={{ color: "black" }}></i>
                                                    <span className="notify">{this.props.dataRedux}</span>
                                                </div>
                                                <small className="text"> Giỏ hàng </small>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </header>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataRedux: state.countProductInCart,
        dataOrder: state.countOrder,
    }
}

export default connect(mapStateToProps)(withRouter(Header));