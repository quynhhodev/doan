import React from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
class Order extends React.Component {
    state = {
        listOrder: [],
        loading: true,
        listOrderConfirmed: [],
        daXuatKho: [],
        dangVanChuyen: [],
        dangGiao: [],
        daGiao: [],

    }
    async componentDidMount() {
        const res = await axios.get('/api/view-order-by-user')
        if (res.data.status === 200) {
            console.log(res.data.data)
            await this.setState({ listOrder: res.data.data.data, listOrderConfirmed: res.data.data.confirmed, daXuatKho: res.data.data.daXuatKho, dangVanChuyen: res.data.data.dangVanChuyen, dangGiao: res.data.data.dangGiao, daGiao: res.data.data.daGiao, loading: false });
        }
        else {

            Swal.fire(
                'Lỗi',
                res.data.message,
                'error',
            )
            this.props.history.push("/login")
        }
        console.log(res.data.data)
    }

    handleDelete = async (e, item) => {
        e.preventDefault();
        console.log(item[0].orderId)
        Swal.fire({
            title: 'Bạn chắc chắn?',
            text: "Bạn muốn hủy đơn hàng!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng, Tôi muốn hủy!',
            cancelButtonText: 'Hủy!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`api/delete-order/${item[0].orderId}`);
                if (res.data.status === 200) {
                    console.log(res.data.data);
                    const result = await axios.get('/api/view-order-by-user')
                    if (result.data.status === 200) {
                        this.setState({ listOrder: result.data.data, loading: false });
                        //console.log(res.data.data)
                    }
                    else {

                        Swal.fire(
                            'Lỗi',
                            res.data.message,
                            'error',
                        )
                        this.props.history.push("/login")
                    }
                }
                this.props.descrementOrder()
                Swal.fire(
                    'Đã hủy!',
                    'Đơn hàng của bạn đã được hủy.',
                    'success'
                )
            }
        })



        // const res = await axios.delete(`api/delete-order/${item[0].orderId}`);
        // if (res.data.status === 200) {
        //     console.log("deleted");
        //     const result = await axios.get('/api/view-order-by-user')
        //     if (result.data.status === 200) {
        //         this.setState({ listOrder: result.data.data, loading: false });
        //         //console.log(res.data.data)
        //     }
        //     else {

        //         Swal.fire(
        //             'Lỗi',
        //             res.data.message,
        //             'error',
        //         )
        //         this.props.history.push("/")
        //     }
        // }
    }
    render() {

        return (
            <>
                <div className="py-2 bg-info">
                    <div className="container">
                        <h6 className="text-secondary">Trang chủ / Đơn hàng</h6>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            {this.state.listOrder && this.state.listOrder.length >= 1 ? this.state.listOrder.map((items, index) => {
                                var totalPrice = 0;
                                return (<>
                                    <h3 key={index}>Đơn số: {index + 1}</h3>
                                    <span>Tình trạng: </span><span>Chưa xác nhận</span>
                                    {items.map((item, index) => {
                                        totalPrice += item.quantity * item.product.salePrice
                                        var listImages = JSON.parse(item.product.image)
                                        return (<>
                                            <div className="container" key={index}>
                                                <div className="row">
                                                    <main className="col-md-10">
                                                        <div className="card">
                                                            <table className="table table-borderless table-shopping-cart">
                                                                <thead className="text-muted">
                                                                    <tr className="small text-uppercase">
                                                                        <th scope="col" width="300">Sản Phẩm</th>
                                                                        <th scope="col" width="120">Số Lượng</th>
                                                                        <th scope="col" width="120">Đơn Giá</th>
                                                                        <th scope="col" width="120">Tổng</th>
                                                                        {/* <th scope="col" width="120">Tổng Tiền</th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <figure className="itemside">
                                                                                <div className="aside"><img src={`http://localhost:8000/img/${listImages[0]}`} alt="null" className="img-sm" /></div>
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
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </main>
                                                </div>
                                            </div>
                                        </>)
                                    })}
                                    <div className="container mt-2">
                                        <div className="row">
                                            <main className="col-md-3">
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th colSpan="3">Tổng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">Tổng tiền</th>
                                                            <td colSpan="3">{new Intl.NumberFormat().format(totalPrice)} đ</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </main>
                                            <main className="col-md-3">
                                                <button className="btn btn-danger" onClick={(e) => this.handleDelete(e, items)}>Hủy đơn</button>
                                            </main>
                                        </div>
                                    </div>

                                </>)
                            }) : ''}
                            {this.state.listOrderConfirmed && this.state.listOrderConfirmed.length >= 1 ? this.state.listOrderConfirmed.map((items, index) => {
                                var totalPrice = 0;
                                return (<>
                                    <h3 key={index}>Đơn số: {index + 1}</h3>
                                    <span>Tình trạng: </span><span>Đã tiếp nhận</span>
                                    {items.map((item, index) => {
                                        totalPrice += item.quantity * item.product.salePrice

                                        var listImages = JSON.parse(item.product.image)
                                        return (<>
                                            <div className="container" key={index}>
                                                <div className="row">
                                                    <main className="col-md-10">
                                                        <div className="card">
                                                            <table className="table table-borderless table-shopping-cart">
                                                                <thead className="text-muted">
                                                                    <tr className="small text-uppercase">
                                                                        <th scope="col" width="300">Sản Phẩm</th>
                                                                        <th scope="col" width="120">Số Lượng</th>
                                                                        <th scope="col" width="120">Đơn Giá</th>
                                                                        <th scope="col" width="120">Tổng</th>
                                                                        {/* <th scope="col" width="120">Tổng Tiền</th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <figure className="itemside">
                                                                                <div className="aside"><img src={`http://localhost:8000/img/${listImages[0]}`} alt="null" className="img-sm" /></div>
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
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </main>

                                                </div>
                                            </div>
                                        </>)
                                    })}
                                    <div className="container mt-2">
                                        <div className="row">
                                            <main className="col-md-3">
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th colSpan="3">Tổng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">Tổng tiền</th>
                                                            <td colSpan="3">{new Intl.NumberFormat().format(totalPrice)} đ</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </main>
                                            <main className="col-md-3">
                                                {/* <button className="btn btn-danger" onClick={(e) => this.handleDelete(e, items)}>Hủy đơn</button> */}
                                            </main>
                                        </div>
                                    </div>

                                </>)
                            }) : ''}
                            {this.state.daXuatKho && this.state.daXuatKho.length >= 1 ? this.state.daXuatKho.map((items, index) => {
                                var totalPrice = 0;
                                return (<>
                                    <h3 key={index}>Đơn số: {index + 1}</h3>
                                    <span>Tình trạng: </span><span>Đã xuất kho</span>
                                    {items.map((item, index) => {
                                        totalPrice += item.quantity * item.product.salePrice

                                        var listImages = JSON.parse(item.product.image)
                                        return (<>
                                            <div className="container" key={index}>
                                                <div className="row">
                                                    <main className="col-md-10">
                                                        <div className="card">
                                                            <table className="table table-borderless table-shopping-cart">
                                                                <thead className="text-muted">
                                                                    <tr className="small text-uppercase">
                                                                        <th scope="col" width="300">Sản Phẩm</th>
                                                                        <th scope="col" width="120">Số Lượng</th>
                                                                        <th scope="col" width="120">Đơn Giá</th>
                                                                        <th scope="col" width="120">Tổng</th>
                                                                        {/* <th scope="col" width="120">Tổng Tiền</th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <figure className="itemside">
                                                                                <div className="aside"><img src={`http://localhost:8000/img/${listImages[0]}`} alt="null" className="img-sm" /></div>
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

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </main>

                                                </div>
                                            </div>
                                        </>)
                                    })}
                                    <div className="container mt-2">
                                        <div className="row">
                                            <main className="col-md-3">
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th colSpan="3">Tổng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">Tổng tiền</th>
                                                            <td colSpan="3">{new Intl.NumberFormat().format(totalPrice)} đ</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </main>
                                            <main className="col-md-3">
                                                {/* <button className="btn btn-danger" onClick={(e) => this.handleDelete(e, items)}>Hủy đơn</button> */}
                                            </main>
                                        </div>
                                    </div>

                                </>)
                            }) : ''}
                            {this.state.dangVanChuyen && this.state.dangVanChuyen.length >= 1 ? this.state.dangVanChuyen.map((items, index) => {
                                var totalPrice = 0;
                                return (<>
                                    <h3 key={index}>Đơn số: {index + 1}</h3>
                                    <span>Tình trạng: </span><span>Đang vận chuyển</span>
                                    {items.map((item, index) => {
                                        totalPrice += item.quantity * item.product.salePrice
                                        var listImages = JSON.parse(item.product.image)
                                        return (<>
                                            <div className="container" key={index}>
                                                <div className="row">
                                                    <main className="col-md-10">
                                                        <div className="card">
                                                            <table className="table table-borderless table-shopping-cart">
                                                                <thead className="text-muted">
                                                                    <tr className="small text-uppercase">
                                                                        <th scope="col" width="300">Sản Phẩm</th>
                                                                        <th scope="col" width="120">Số Lượng</th>
                                                                        <th scope="col" width="120">Đơn Giá</th>
                                                                        <th scope="col" width="120">Tổng</th>
                                                                        {/* <th scope="col" width="120">Tổng Tiền</th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <figure className="itemside">
                                                                                <div className="aside"><img src={`http://localhost:8000/img/${listImages[0]}`} alt="null" className="img-sm" /></div>
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

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </main>
                                                </div>
                                            </div>
                                        </>)
                                    })}
                                    <div className="container mt-2">
                                        <div className="row">
                                            <main className="col-md-3">
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th colSpan="3">Tổng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">Tổng tiền</th>
                                                            <td colSpan="3">{new Intl.NumberFormat().format(totalPrice)} đ</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </main>
                                            <main className="col-md-3">
                                                {/* <button className="btn btn-danger" onClick={(e) => this.handleDelete(e, items)}>Hủy đơn</button> */}
                                            </main>
                                        </div>
                                    </div>

                                </>)
                            }) : ''}
                            {this.state.dangGiao && this.state.dangGiao.length >= 1 ? this.state.dangGiao.map((items, index) => {
                                var totalPrice = 0;
                                return (<>
                                    <h3 key={index}>Đơn số: {index + 1}</h3>
                                    <span>Tình trạng: </span><span>Đang giao hàng</span>
                                    {items.map((item, index) => {
                                        totalPrice += item.quantity * item.product.salePrice
                                        var listImages = JSON.parse(item.product.image)
                                        return (<>
                                            <div className="container" key={index}>
                                                <div className="row">
                                                    <main className="col-md-10">
                                                        <div className="card">
                                                            <table className="table table-borderless table-shopping-cart">
                                                                <thead className="text-muted">
                                                                    <tr className="small text-uppercase">
                                                                        <th scope="col" width="300">Sản Phẩm</th>
                                                                        <th scope="col" width="120">Số Lượng</th>
                                                                        <th scope="col" width="120">Đơn Giá</th>
                                                                        <th scope="col" width="120">Tổng</th>
                                                                        {/* <th scope="col" width="120">Tổng Tiền</th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <figure className="itemside">
                                                                                <div className="aside"><img src={`http://localhost:8000/img/${listImages[0]}`} alt="null" className="img-sm" /></div>
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

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </main>

                                                </div>
                                            </div>
                                        </>)
                                    })}
                                    <div className="container mt-2">
                                        <div className="row">
                                            <main className="col-md-3">
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th colSpan="3">Tổng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">Tổng tiền</th>
                                                            <td colSpan="3">{new Intl.NumberFormat().format(totalPrice)} đ</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </main>
                                            <main className="col-md-3">
                                                {/* <button className="btn btn-danger" onClick={(e) => this.handleDelete(e, items)}>Hủy đơn</button> */}
                                            </main>
                                        </div>
                                    </div>

                                </>)
                            }) : ''}
                            {this.state.daGiao && this.state.daGiao.length >= 1 ? this.state.daGiao.map((items, index) => {
                                var totalPrice = 0;
                                return (<>
                                    <h3 key={index}>Đơn số: {index + 1}</h3>
                                    <span>Tình trạng: </span><span>Đã giao</span>
                                    {items.map((item, index) => {
                                        totalPrice += item.quantity * item.product.salePrice

                                        var listImages = JSON.parse(item.product.image)
                                        return (<>
                                            <div className="container" key={index}>
                                                <div className="row">
                                                    <main className="col-md-10">
                                                        <div className="card">
                                                            <table className="table table-borderless table-shopping-cart">
                                                                <thead className="text-muted">
                                                                    <tr className="small text-uppercase">
                                                                        <th scope="col" width="300">Sản Phẩm</th>
                                                                        <th scope="col" width="120">Số Lượng</th>
                                                                        <th scope="col" width="120">Đơn Giá</th>
                                                                        <th scope="col" width="120">Tổng</th>
                                                                        {/* <th scope="col" width="120">Tổng Tiền</th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <figure className="itemside">
                                                                                <div className="aside"><img src={`http://localhost:8000/img/${listImages[0]}`} alt="null" className="img-sm" /></div>
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
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </main>
                                                </div>
                                            </div>
                                        </>)
                                    })}
                                    <div className="container mt-2">
                                        <div className="row">
                                            <main className="col-md-3">
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th colSpan="3">Tổng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">Tổng tiền</th>
                                                            <td colSpan="3">{new Intl.NumberFormat().format(totalPrice)} đ</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </main>
                                            <main className="col-md-3">
                                                {/* <button className="btn btn-danger" onClick={(e) => this.handleDelete(e, items)}>Hủy đơn</button> */}
                                            </main>
                                        </div>
                                    </div>

                                </>)
                            }) : ''}
                        </div>
                        <div className="col-md-2"></div>
                    </div>

                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataRedux: state.countProductInCart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        descrementOrder: () => dispatch({ type: 'DESCREMENTORDER' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));