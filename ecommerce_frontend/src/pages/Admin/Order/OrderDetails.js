import React from "react";
import axios from "axios";
class OrderDetails extends React.Component {
    state = {
        cart: [],
        user: ''
    }
    async componentDidMount() {
        const order_id = this.props.match.params.order_id;
        const user_id = this.props.match.params.user_id;
        console.log(order_id)
        let res = await axios.get(`api/order-details/${order_id}/${user_id}`);
        if (res.data.status === 200) {
            this.setState({ cart: res.data.orderdetails, user: res.data.user });
        }
    }

    render() {
        let totalPrice = 0;
        return (
            <section className="section-content padding-y">
                <h5>Thông tin đơn hàng</h5>
                <div className="container">
                    <div className="row">
                        <main className="col-md-10">
                            <div className="card">
                                <table className="table table-borderless table-shopping-cart">
                                    <thead className="text-muted">
                                        <tr className="small text-uppercase">
                                            <th scope="col">Sản Phẩm</th>
                                            <th scope="col" width="120">Số Lượng</th>
                                            <th scope="col" width="120">Đơn Giá</th>
                                            <th scope="col" width="120">Tổng</th>
                                            {/* <th scope="col" width="120">Tổng Tiền</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.cart && this.state.cart.length > 0 && this.state.cart.map((item, index) => {
                                            totalPrice += item.product.salePrice * item.quantity;
                                            const image = JSON.parse(item.product.image)
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <figure className="itemside">
                                                            <div className="aside"><img src={`http://localhost:8000/img/${image[0]}`} alt="null" className="img-sm" /></div>
                                                            <figcaption className="info">
                                                                <a href="/" className="title text-dark">{item.product.productName} </a>
                                                            </figcaption>
                                                        </figure>
                                                    </td>
                                                    <td>
                                                        <div className="form-row">
                                                            <div className="form-group col-md flex-grow-0">
                                                                <div className="input-group mb-3 input-spinner">
                                                                    <div className="form-control">{item.quantity}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="price-wrap">
                                                            <var className="price">{new Intl.NumberFormat().format(item.product.salePrice)} đ</var>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="price-wrap">
                                                            <var className="total price">{new Intl.NumberFormat().format(item.quantity * item.product.salePrice)} đ</var>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </main>

                    </div>
                </div>
                <h5>Thông tin khách hàng</h5>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th colspan="3">Thông tin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Họ và Tên</th>
                                        <td colspan="3">{this.state.user && this.state.user.lastName + " " + this.state.user.firstName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Số điện thoại</th>
                                        <td colspan="3">{this.state.user && this.state.user.phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Email</th>
                                        <td colspan="3">{this.state.user && this.state.user.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Thành Phố/...</th>
                                        <td colspan="3">{this.state.user && this.state.user.city}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Huyện/...</th>
                                        <td colspan="3">{this.state.user && this.state.user.state}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Địa chỉ giao hàng</th>
                                        <td colspan="3">{this.state.user && this.state.user.address}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className="col-md-4">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th colspan="3">Tổng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Tổng tiền</th>
                                        <td colspan="3">{new Intl.NumberFormat().format(totalPrice)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </section>
        );
    }
}
export default OrderDetails;