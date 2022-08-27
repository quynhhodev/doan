import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
class Cart extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    state = {
        loading: true,
        cart: [],
        isCookies: false,
        totalPrice: 0
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        const { cookies } = this.props;
        if (cookies.get("product")) {
            //console.log(cookies.get("product"));
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

            // console.log(...formData);
            //data.append('product', 's');
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
                //this.props.history.push('/')

            }
        }


    }
    async updateCartQuantity(cart_id, scope) {

        let result = await axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`);
        if (result.data.status === 200) {
            console.log('thêm thành công')
        }

    }
    handleDecreaseItem = (cart_id) => {
        if (this.state.isCookies) {
            console.log(cart_id + ' -1');
            const { cookies } = this.props;
            var arrayProduct = [];
            var productCookies = cookies.get("product");
            const productArray = productCookies.split("/");
            for (var i = 0; i < productArray.length; i++) {
                var item = productArray[i].split("-");
                arrayProduct.push(item[0]);
            }
            if (arrayProduct.includes(cart_id.toString())) {
                var quantity;
                for (var i = 0; i < productArray.length; i++) {
                    var item = productArray[i].split("-");
                    if (item[0] == cart_id) {
                        if (parseInt(item[1]) > 1) {
                            quantity = parseInt(item[1]) - 1;
                        }
                        else {
                            quantity = parseInt(item[1]) - 0;
                        }
                        var productStr = cart_id + '-' + quantity;
                        var productCookies = cookies.get("product");
                        productCookies = productCookies.replace(productArray[i], productStr);
                        cookies.set("product", productCookies, { path: "/" });
                    }
                }
            }
        }
        // this.setState({ cart: this.state.cart.map((item) => cart_id === item.id ? { ...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0) } : item) })
        // this.updateCartQuantity(cart_id, "dec");
    }
    handleIncrementItem = (cart_id, qty) => {
        if (this.state.isCookies) {
            console.log(cart_id + ' +1');
            const { cookies } = this.props;
            var arrayProduct = [];
            var productCookies = cookies.get("product");
            const productArray = productCookies.split("/");
            for (var i = 0; i < productArray.length; i++) {
                var item = productArray[i].split("-");
                arrayProduct.push(item[0]);
            }
            if (arrayProduct.includes(cart_id.toString())) {
                var quantity;
                for (var i = 0; i < productArray.length; i++) {
                    var item = productArray[i].split("-");
                    if (item[0] == cart_id) {


                        if (parseInt(item[1]) < qty) {
                            quantity = parseInt(item[1]) + 1;
                        }
                        else {
                            quantity = parseInt(item[1]) + 0;
                        }
                        var productStr = cart_id + '-' + quantity;
                        var productCookies = cookies.get("product");
                        productCookies = productCookies.replace(productArray[i], productStr);
                        cookies.set("product", productCookies, { path: "/" });
                    }
                }
            }

            //     Swal.fire({
            //         position: 'top-end',
            //         title: 'Đã thêm vào giỏ',
            //         showConfirmButton: false,
            //         timer: 1500
            //     });

            // }
        }
        else {

        }
        // this.setState({ cart: this.state.cart.map((item) => cart_id === item.id ? { ...item, product_qty: item.product_qty + (item.product_qty < quantity ? 1 : 0) } : item) })
        // this.updateCartQuantity(cart_id, "inc");
    }

    handleDeleteItem = async (e, cart_id, qty) => {
        e.preventDefault();
        const { cookies } = this.props;
        const thisClicked = e.currentTarget;
        // const res = await axios.delete(`/api/delete-cartitem/${cart_id}`);
        // if (res.data.status === 200) {
        //     thisClicked.closest('tr').remove();
        //     this.props.descrementProduct()
        // }
        // else if (res.data.status === 404) {
        //     Swal.fire(
        //         'Oh no',
        //         res.data.message,
        //         'error'
        //     );
        // }
        if (this.state.isCookies) {
            var productStr = cart_id.toString() + "-" + qty.toString() + "/";
            var productCookies = cookies.get("product");
            productCookies = productCookies.replace(productStr, '');
            cookies.set("product", productCookies, { path: "/" });
            this.props.descrementProduct()
            //thisClicked.closest('tr').remove();
            var arrayProduct = [];
            productCookies = cookies.get("product");
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
        // else {
        //     cookies.remove("product", { path: "/" })
        //     this.props.history.push('/cart-empty')
        // }
    }


    render() {
        // if (!localStorage.getItem('auth_token')) {
        //     this.props.history.push('/');
        //     Swal.fire(
        //         'Warning!',
        //         'Login to goto Cart',
        //         'warning'
        //     );

        // }

        // const { cookies } = this.props;
        // if (cookies.get("product")) {
        //     var arrayProductQty = [];
        //     var productCookies = cookies.get("product");
        //     const productArray = productCookies.split("/");
        //     for (var i = 0; i < productArray.length - 1; i++) {
        //         var item = productArray[i].split("-");
        //         arrayProductQty.push(item[1]);
        //     }
        //     console.log(arrayProductQty);
        // }

        //this.props.history.push('/cart-empty')


        const { cookies } = this.props;
        let totalPrice = 0;
        var cartHTML = '';
        if (this.state.cart.length === 0) {
            cartHTML = <div>
                <div className="card card-body py-5 text-center shadow-sm">
                    <h4>Giỏ hàng trống!</h4>
                </div>
            </div>;
        }
        else {
            cartHTML = <section className="section-content padding-y">
                <div className="container">
                    <div className="row">
                        <main className="col-md-9">
                            <div className="card">
                                <table className="table table-borderless table-shopping-cart">
                                    <thead className="text-muted">
                                        <tr className="small text-uppercase">
                                            <th scope="col">Sản Phẩm</th>
                                            <th scope="col" width="120">Số Lượng</th>
                                            <th scope="col" width="120">Đơn Giá</th>
                                            <th scope="col" width="120">Tổng Tiền</th>
                                            <th scope="col" width="120">Xóa </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.cart && this.state.cart.length > 0 && this.state.cart.map((item, index) => {

                                            if (this.state.cart.length === 0) {
                                                this.props.history.push('/cart-empty')
                                            }
                                            else {
                                                if (cookies.get("product")) {
                                                    var arrayProductQty = [];
                                                    var productCookies = cookies.get("product");
                                                    const productArray = productCookies.split("/");
                                                    for (var i = 0; i < productArray.length - 1; i++) {
                                                        var itemQty = productArray[i].split("-");
                                                        arrayProductQty.push(itemQty[1]);
                                                    }
                                                    !this.state.loading && this.state.isCookies ? totalPrice += item.salePrice * arrayProductQty[index] : totalPrice += item.product.salePrice * item.product_qty;
                                                }
                                            }
                                            //!this.state.loading && this.state.isCookies ? totalPrice += item.salePrice * arrayProductQty[index] : totalPrice += item.product.salePrice * item.product_qty;

                                            var image

                                            //cookies
                                            !this.state.loading && this.state.isCookies ? image = JSON.parse(item.image) : image = JSON.parse(item.product.image)
                                            //const image = JSON.parse(item.image)
                                            return (
                                                <tr key={index}>
                                                    <td style={{ width: "300px" }}>
                                                        <figure className="itemside">
                                                            <div className="aside"><img src={`http://localhost:8000/img/${image[0]}`} alt="null" className="img-sm" /></div>
                                                            <figcaption className="info">
                                                                {/* login-> <a href="/" className="title text-dark">{item.product.productName} </a> */}
                                                                {/* no login-> <a href="/" className="title text-dark">{item.productName} </a> */}
                                                                {!this.state.loading && this.state.isCookies ? <a href="/" className="title text-dark">{item.productName} </a> : <a href="/" className="title text-dark">{item.product.productName} </a>}
                                                            </figcaption>
                                                        </figure>
                                                    </td>
                                                    <td>
                                                        <div className="form-row">
                                                            <div className="form-group col-md flex-grow-0">
                                                                <div className="input-group mb-3 input-spinner">
                                                                    {/* {!this.state.loading && this.state.isCookies ? "" :  */}
                                                                    <div className="input-group-prepend">
                                                                        {/* <button className="btn btn-light" type="button" onClick={() => this.handleDecreaseItem(item.id, item.quantity)} id="button-plus"> - </button> */}
                                                                        <button className="btn btn-light" type="button" onClick={() => this.handleDecreaseItem(item.id, item.quantity)} id="button-plus"> - </button>
                                                                    </div>
                                                                    {/* } */}

                                                                    <div className="form-control">{!this.state.loading && this.state.isCookies ? arrayProductQty[index] : item.product_qty}</div>
                                                                    {/* {!this.state.loading && this.state.isCookies ? "" :  */}
                                                                    <div className="input-group-append">
                                                                        {/* <button className="btn btn-light" type="button" onClick={() => this.handleIncrementItem(item.id, item.product.quantity)} id="button-minus"> + </button> */}
                                                                        <button className="btn btn-light" type="button" onClick={() => this.handleIncrementItem(item.id, item.quantity)} id="button-minus"> + </button>
                                                                    </div>
                                                                    {/* } */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="price-wrap">
                                                            {/* login-> <var className="price">{item.product.salePrice} đ</var> */}

                                                            {/* no login-> <var className="price">{item.salePrice} đ</var> */}
                                                            {!this.state.loading && this.state.isCookies ? <var className="price">{new Intl.NumberFormat().format(item.salePrice)} đ</var> : <var className="price">{new Intl.NumberFormat().format(item.product.salePrice)} đ</var>}

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="price-wrap">
                                                            <var className="price">{!this.state.loading && this.state.isCookies ? new Intl.NumberFormat().format(item.salePrice * arrayProductQty[index]) : item.product.salePrice ? new Intl.NumberFormat().format(item.product.salePrice * item.product_qty) : new Intl.NumberFormat().format(item.product.price * item.product_qty)} đ</var>
                                                        </div>
                                                    </td>
                                                    <td className="price-wrap">
                                                        <button onClick={(e) => this.handleDeleteItem(e, item.id, this.state.isCookies ? parseInt(arrayProductQty[index]) : 0)} className="btn btn-light btn-round"> <i className="fa-solid fa-trash"></i></button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                <div className="card-body border-top">
                                    <Link to="/checkout" className="btn btn-primary float-md-right"> Đặt hàng <i className="fa fa-chevron-right"></i> </Link>
                                    <Link to="/" className="btn btn-light"> <i className="fa fa-chevron-left"></i> Tiếp tục mua hàng </Link>
                                </div>
                            </div>

                            <div className="alert alert-success mt-3">
                                <p className="icontext"><i className="icon text-success fa fa-truck"></i> Giao hàng miễn phí từ 1 đến 2 tuần</p>
                            </div>

                        </main>
                        <aside className="col-md-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    {/* <form>
                                        <div className="form-group">
                                            <label>Have coupon?</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="" placeholder="Coupon code" />
                                                <span className="input-group-append">
                                                    <button className="btn btn-primary">Apply</button>
                                                </span>
                                            </div>
                                        </div>
                                    </form> */}
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <dl className="dlist-align">
                                        <dt>Giá ban đầu:</dt>
                                        <dd className="text-right">{new Intl.NumberFormat().format(totalPrice)} đ</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt>Tổng thanh toán:</dt>
                                        <dd className="text-right  h5"><strong>{new Intl.NumberFormat().format(totalPrice)} đ</strong></dd>
                                    </dl>
                                    <hr />
                                    {/* <p className="text-center mb-3">
                                        <img src="images/misc/payments.png" height="26" alt="null" />
                                    </p> */}

                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        }
        return (
            <>
                <div className="py-2 bg-info">
                    <div className="container">
                        <h6 className="text-secondary">Trang chủ / Giỏ hàng </h6>

                    </div>
                </div>
                {this.state.loading ? <div className="card card-body py-5 text-center shadow-sm"><h5>Chưa sản phẩm nào trong giỏ</h5></div> :
                    cartHTML
                }
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
        descrementProduct: () => dispatch({ type: 'DECREMENT' })

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(withRouter(Cart)));