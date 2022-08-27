import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
class Register extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        error_list: []
    }
    handleChangeInput = (e) => {
        e.persist();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        let data = new FormData();
        data.append('name', this.state.name);
        data.append('email', this.state.email);
        data.append('password', this.state.password);

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/register`, data).then(response => {
                if (response.data.status === 200) {
                    localStorage.setItem('auth_token', response.data.token);
                    localStorage.setItem('auth_name', response.data.username);
                    this.props.history.push('/');

                }
                else {
                    console.log(response.data.validation_errors.name)
                    this.setState({ error_list: response.data.validation_errors })
                }
            })
        });

    }

    render() {
        return <>

            <section class="section-conten padding-y" style={{ minHeight: "84vh" }}>


                <div class="card mx-auto" style={{ maxWidth: '380px', marginTop: "100px" }}>
                    <div class="card-body">
                        <h4 class="card-title mb-4">Đăng Kí</h4>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            {/* <a href="/" class="btn btn-facebook btn-block mb-2"> <i class="fab fa-facebook-f"></i> &nbsp;  Sign in with Facebook</a>
                            <a href="/" class="btn btn-google btn-block mb-4"> <i class="fab fa-google"></i> &nbsp;  Sign in with Google</a> */}
                            <div class="form-group">
                                <input name="name" class="form-control" onChange={(e) => this.handleChangeInput(e)} placeholder="Username" type="text" />
                                <span className="text-danger">{this.state.error_list.name}</span>
                            </div>
                            <div class="form-group">
                                <input name="email" class="form-control" onChange={(e) => this.handleChangeInput(e)} placeholder="Email" type="email" />
                                <span className="text-danger">{this.state.error_list.email}</span>
                            </div>
                            <div class="form-group">
                                <input name="password" class="form-control" onChange={(e) => this.handleChangeInput(e)} placeholder="Password" type="password" />
                                <span className="text-danger">{this.state.error_list.password}</span>
                            </div>

                            <div class="form-group">
                                {/* <a href="/" class="float-right">Quên Mật Khẩu?</a> */}
                                <label class="float-left custom-control custom-checkbox"> <input type="checkbox" class="custom-control-input" checked="" /> <div class="custom-control-label"> Remember </div> </label>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block"> Đăng Kí  </button>
                            </div>
                        </form>
                    </div>
                </div>
                <br /><br />
            </section>
        </>
    }


}


export default withRouter(Register);