import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
class SettingUser extends React.Component {
    state = {
        firstname: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        error: [],
        loading: true
    }
    async componentDidMount() {
        const res = await axios.get('api/user-detail');
        if (res.data.status === 200) {
            this.setState({
                name: res.data.data.name,
                email: res.data.data.email,
                phone: res.data.data.phone,
                firstname: res.data.data.firstName,
                address: res.data.data.address,
                city: res.data.data.city,
                state: res.data.data.state,
                loading: false
            });
        }
    }
    handleChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmitUser = async (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('name', this.state.name);
        data.append('firstName', this.state.firstname);
        data.append('phone', this.state.phone);
        data.append('email', this.state.email);
        data.append('address', this.state.address);
        data.append('city', this.state.city);
        data.append('state', this.state.state);
        const res = await axios.post('api/user-update', data);
        if (res.data.status === 200) {
            Swal.fire({
                position: 'top-end',
                title: 'Cập nhật hoàn tất',
                showConfirmButton: false,
                timer: 3000,
            })
            this.props.history.push('/')
        }

    }
    render() {
        if (!localStorage.getItem("auth_name")) {
            this.props.history.push('/')
            Swal.fire({
                position: 'top-end',
                title: 'Đăng nhập để thực hiện chức năng này',
                showConfirmButton: false,
                timer: 3000,
            })
        }
        return (
            <div className="container" >
                <div className="row">
                    <h2>Cập nhật thông tin</h2>
                    <div className="col-md-3"></div>
                    <div className="col-md-7">
                        <div className="card">
                            <div className="card-header">
                                <h4>Thông tin</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Họ</label>
                                            <input type="text" name="firstname" onChange={(event) => this.handleChangeInput(event)} value={!this.state.firstname ? "" : this.state.firstname} className="form-control" />

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Tên</label>
                                            <input type="text" name="name" onChange={(event) => this.handleChangeInput(event)} value={this.state.name} className="form-control" />

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Số điện thoại</label>
                                            <input type="text" name="phone" onChange={(event) => this.handleChangeInput(event)} value={!this.state.phone ? "" : this.state.phone} className="form-control" />
                                            <small className="text-danger">{this.state.error.phone}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Địa chỉ email</label>
                                            <input type="email" name="email" onChange={(event) => this.handleChangeInput(event)} value={this.state.email} className="form-control" />
                                            <small className="text-danger">{this.state.error.email}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Địa chỉ đầy đủ</label>
                                            <textarea rows="3" type="text" name="address" onChange={(event) => this.handleChangeInput(event)} value={!this.state.address ? "" : this.state.address} className="form-control"></textarea>


                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>Tỉnh/Thành Phố</label>
                                            <input type="text" name="city" onChange={(event) => this.handleChangeInput(event)} value={!this.state.city ? "" : this.state.city} className="form-control" />

                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>Huyện/...</label>
                                            <input type="text" name="state" onChange={(event) => this.handleChangeInput(event)} value={!this.state.state ? "" : this.state.state} className="form-control" />

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group text-end">
                                            <button type="button" className="btn btn-primary" onClick={(e) => this.handleSubmitUser(e)}>Cập nhật</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        )
    }
}
export default withRouter(SettingUser);