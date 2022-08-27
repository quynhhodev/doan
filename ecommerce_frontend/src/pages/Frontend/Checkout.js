import React from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
class Checkout extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    state = {
        loading: true,
        cart: [],
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        error: [],
        isCookies: false
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        const res = await axios.get('api/user-detail');
        if (res.data.status === 200) {
            this.setState({
                //name: res.data.data.name,
                lastname: res.data.data.name,
                email: res.data.data.email,
                phone: res.data.data.phone,
                firstname: res.data.data.firstName,
                address: res.data.data.address,
                city: res.data.data.city,
                state: res.data.data.state,
                loading: false
            });
        }
        const { cookies } = this.props;
        if (cookies.get("product")) {
            var arrayProduct = [];
            var productCookies = cookies.get("product");
            const productArray = productCookies.split("/");
            for (var i = 0; i < productArray.length; i++) {
                var item = productArray[i].split("-");
                arrayProduct.push(item[0]);
            }
            var formData = new FormData();

            for (i = 0; i < arrayProduct.length - 1; i++) {
                formData.append('arr[]', arrayProduct[i]);
            }
            const result = await axios.post(`api/view-cart-by-cookies`, formData);
            if (result.status === 200) {
                this.setState({ cart: result.data.data, loading: false, isCookies: true });
            }
            else {
                console.log("error")
            }
        }
        else {
            let res = await axios.get(`/api/cart`)
            if (res.data.status === 200) {
                this.setState({ cart: res.data.cart, loading: false });
            }
            else if (res.data.status === 401) {
                this.props.history.push('/')
            }
        }





    }
    handleChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmitOrder = async (e) => {
        e.preventDefault();
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
        }


        const { cookies } = this.props;
        if (cookies.get("product")) {
            var productCookies = cookies.get("product");
            const productArray = productCookies.split("/");
            var formData = new FormData();
            for (var i = 0; i < productArray.length - 1; i++) {
                formData.append('arr[]', productArray[i]);
            }
            formData.append('firstname', this.state.firstname);
            formData.append('lastname', this.state.lastname);
            formData.append('phone', this.state.phone);
            formData.append('email', this.state.email);
            formData.append('address', this.state.address);
            formData.append('city', this.state.city);
            formData.append('state', this.state.state);
            formData.append('zipcode', this.state.zipcode);
            const result = await axios.post(`api/place-order-cookies`, formData);
            if (result.data.status === 200) {
                console.log(result.data.data)
                this.props.history.push("/order")
                this.props.resetCountCart();
                this.props.countOrder();
                cookies.remove('product', { path: "/" });
            }
        }
        else {
            const res = await axios.post(`/api/place-order`, data);
            if (res.data.status === 200) {
                console.log(res.data.data);
                // Swal.fire(
                //     'Cảm ơn!',
                //     res.data.message,
                //     'success'
                // );
                this.props.history.push('/order');
                this.props.resetCountCart();
                this.props.countOrder();
            }
            else if (res.data.status === 422) {
                Swal.fire(
                    'All fields is mandatory!',
                    "",
                    'error'
                );
                this.setState({ error: res.data.error });
            }
        }




        // const res = await axios.post(`/api/place-order`, data);
        // if (res.data.status === 200) {
        //     console.log(res.data.data);
        //     // Swal.fire(
        //     //     'Cảm ơn!',
        //     //     res.data.message,
        //     //     'success'
        //     // );
        //     // this.props.history.push('/thank-you');
        // }
        // else if (res.data.status === 422) {
        //     Swal.fire(
        //         'All fields is mandatory!',
        //         "",
        //         'error'
        //     );
        //     this.setState({ error: res.data.error });
        // }
    }
    render() {
        if (!localStorage.getItem('auth_token')) {
            this.props.history.push('/login');
            Swal.fire(
                'Lỗi!',
                'Đăng nhập để thanh toán',
                'warning'
            );

        }
        const { cookies } = this.props;
        if (cookies.get("product")) {
            const { cookies } = this.props;
            var arrayProductQty = [];
            var productCookies = cookies.get("product");
            const productArray = productCookies.split("/");
            for (var i = 0; i < productArray.length - 1; i++) {
                var item = productArray[i].split("-");
                arrayProductQty.push(item[1]);
            }
        }
        let totalPrice = 0;
        return (
            <div>
                <div className="py-2 bg-info">
                    <div className="container">
                        <h6 className="text-secondary">Trang Chủ / Đặt Hàng </h6>
                    </div>
                </div>
                <div className="py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Thông tin</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label>Tên</label>
                                                    <input type="text" name="firstname" onChange={(event) => this.handleChangeInput(event)} value={this.state.firstname} className="form-control" />
                                                    <small className="text-danger">{this.state.error.firstname}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label>Họ</label>
                                                    <input type="text" name="lastname" onChange={(event) => this.handleChangeInput(event)} value={this.state.lastname} className="form-control" />
                                                    <small className="text-danger">{this.state.error.lastname}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label>Số điện thoại</label>
                                                    <input type="text" name="phone" onChange={(event) => this.handleChangeInput(event)} value={this.state.phone} className="form-control" />
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
                                                    <textarea rows="3" type="text" name="address" onChange={(event) => this.handleChangeInput(event)} value={this.state.address} className="form-control"></textarea>
                                                    <small className="text-danger">{this.state.error.address}</small>

                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group mb-3">
                                                    <label>Tỉnh/Thành Phố</label>
                                                    <input type="text" name="city" onChange={(event) => this.handleChangeInput(event)} value={this.state.city} className="form-control" />
                                                    <small className="text-danger">{this.state.error.city}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group mb-3">
                                                    <label>Huyện/...</label>
                                                    <input type="text" name="state" onChange={(event) => this.handleChangeInput(event)} value={this.state.state} className="form-control" />
                                                    <small className="text-danger">{this.state.error.state}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group mb-3">
                                                    <label>Mã Zip</label>
                                                    <input type="text" name="zipcode" onChange={(event) => this.handleChangeInput(event)} value={this.state.zipcode} className="form-control" />
                                                    <small className="text-danger">{this.state.error.zipcode}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group text-end">
                                                    <button type="button" className="btn btn-primary" onClick={(e) => this.handleSubmitOrder(e)}>Đặt hàng</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-5">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th width="50%">Tên sản phẩm</th>
                                            <th>Giá (đ)</th>
                                            <th>Số lượng</th>
                                            <th>Tổng tiền (đ)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.cart && this.state.cart.length > 0 && this.state.cart.map((item, index) => {
                                            !this.state.loading && this.state.isCookies ? totalPrice += item.salePrice * arrayProductQty[index] : totalPrice += item.product.salePrice * item.product_qty
                                            return (
                                                <tr key={index}>
                                                    <td>{!this.state.loading && this.state.isCookies ? item.productName : item.product.productName}</td>
                                                    <td>{!this.state.loading && this.state.isCookies ? new Intl.NumberFormat().format(item.salePrice) : item.product.salePrice}</td>
                                                    <td>{!this.state.loading && this.state.isCookies ? arrayProductQty[index] : item.product_qty}</td>
                                                    <td>{!this.state.loading && this.state.isCookies ? new Intl.NumberFormat().format(item.salePrice * arrayProductQty[index]) : new Intl.NumberFormat().format(item.product.salePrice * item.product_qty)}</td>
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td colSpan="2" className="text-end"> Tổng Tiền</td>
                                            <td colSpan="2" className="text-end">{new Intl.NumberFormat().format(totalPrice)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataRedux: state.countProductInCart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        countOrder: () => dispatch({ type: 'INCREMENTORDER' }),
        resetCountCart: () => dispatch({ type: 'RESETCOUNTCART' })
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withCookies(withRouter(Checkout)));