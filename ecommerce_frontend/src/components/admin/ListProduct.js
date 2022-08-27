import React from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
class ListProduct extends React.Component {
    state = {
        listData: [],
    }
    async componentDidMount() {
        const scope = this.props.match.params.scope;
        const res = await axios.get(`/api/list-data?scope=${scope}`)
        if (res.data.status === 200) {
            this.setState({ listData: res.data.data })
        }
    }
    render() {
        const headers = [
            { label: "Tên sản phẩm", key: "productName" },
            { label: "Số lượng", key: "quantity" },
            { label: "Đơn giá", key: "price" }
        ];
        const dataa = [];
        this.state.listData && this.state.listData.length > 0 && this.state.listData.map((item) => {
            let a = {
                productName: item.product.productName,
                quantity: item.quantity,
                price: item.product.salePrice
            }
            dataa.push(a);
        })
        // dataa = [
        //     { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
        //     { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
        //     { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
        // ];
        return <>
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <h2>Chi tiết</h2>

                        <div className="card">
                            <table className="table table-borderless table-shopping-cart">
                                <thead className="text-muted">
                                    <tr className="small text-uppercase">
                                        <th scope="col">Sản Phẩm</th>
                                        <th scope="col" width="120">Số Lượng</th>
                                        <th scope="col" width="120">Đơn Giá</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.listData && this.state.listData.length > 0 && this.state.listData.map((item, index) => {

                                        //var image = JSON.parse(item.product.image)
                                        return (
                                            <tr key={index}>
                                                <td style={{ width: "300px" }}>
                                                    <figure className="itemside">
                                                        {/* <div className="aside"><img src={`http://localhost:8000/img/${image[0]}`} alt="null" className="img-sm" /></div> */}
                                                        <figcaption className="info">
                                                            {/* login-> <a href="/" className="title text-dark">{item.product.productName} </a> */}
                                                            {/* no login-> <a href="/" className="title text-dark">{item.productName} </a> */}
                                                            {<span className="title text-dark">{item.product.productName} </span>}
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
                                                        {/* login-> <var className="price">{item.product.salePrice} đ</var> */}

                                                        {/* no login-> <var className="price">{item.salePrice} đ</var> */}
                                                        {!this.state.loading && this.state.isCookies ? <var className="price">{new Intl.NumberFormat().format(item.salePrice)} đ</var> : <var className="price">{new Intl.NumberFormat().format(item.product.salePrice)} đ</var>}

                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>


                        </div>
                        <CSVLink data={dataa} headers={headers} className="d-flex justify-content-end mt-2">
                            <i className="fa-solid fa-file-export"></i>Xuất excel
                        </CSVLink>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>

        </>
    }
}
export default ListProduct;