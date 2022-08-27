import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter, Link } from "react-router-dom";
class Login extends React.Component {
    state = {
        email: '',
        password: '',
        error_list: []
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleChangeInput = (e) => {
        e.persist();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var data = new FormData();
        data.append('email', this.state.email);
        data.append('password', this.state.password);
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_name', res.data.username)
                    localStorage.setItem('auth_token', res.data.token)
                    if (res.data.role === 'admin') {
                        this.props.history.push('/admin/product-list');
                    }
                    else if (res.data.role === 'shipper') {
                        this.props.history.push('/admin/shipper');
                    }
                    else {
                        //this.props.history.push('/');
                        this.props.history.goBack();
                    }
                }
                else {
                    if (res.data.status === 401) {
                        Swal.fire({
                            position: 'top-end',
                            title: 'Sai thông tin đăng nhập',
                            showConfirmButton: false,
                            timer: 2000,
                            icon: 'error'
                        })
                    }
                    else {
                        this.setState({
                            error_list: res.data.validation_errors
                        })
                    }
                }
            })
        });

    }
    render() {
        return <>

            <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>


                <div className="card mx-auto" style={{ maxWidth: '380px', marginTop: "100px" }}>
                    <div className="card-body">
                        <h4 className="card-title mb-4">Đăng Nhập</h4>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            {/* <fb:login-button
                                    scope="public_profile,email"
                                    onlogin="checkLoginState();">
                                </fb:login-button> */}

                            {/* <Link to="/" className="btn btn-facebook btn-block mb-2"> <i className="fab fa-facebook-f"></i> &nbsp;  Sign in with Facebook</Link> */}
                            {/* <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false">

                            </div> */}
                            {/* <a href="/" className="btn btn-google btn-block mb-4"> <i className="fab fa-google"></i> &nbsp;  Sign in with Google</a> */}
                            <div className="form-group">
                                <input name="email" onChange={(e) => this.handleChangeInput(e)} className="form-control" placeholder="Email" type="email" />
                                <span className="text-danger">{this.state.error_list.email}</span>
                            </div>
                            <div className="form-group">
                                <input name="password" onChange={(e) => this.handleChangeInput(e)} className="form-control" placeholder="Password" type="password" />
                                <span className="text-danger">{this.state.error_list.password}</span>
                            </div>


                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block"> Đăng Nhập  </button>
                            </div>
                            <p>Bạn chưa có tài khoản? <Link to="/register" > &nbsp;  Đăng kí ngay</Link></p>

                        </form>
                    </div>
                </div>
                <br /><br />
            </section>
        </>
    }


}


export default withRouter(Login);