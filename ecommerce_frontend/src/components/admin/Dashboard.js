import React from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";


class Dashboard extends React.Component {
    state = {
        dataWeek: [],
        listDataWeek: [],
        dataYear: [],
        listDataYear: [],
        loading: true,
        listData: [],
        type: "day",
        doanhThu: []
    }
    async componentDidMount() {
        const result = await axios.get(`/api/data-year`)
        if (result.data.status === 200) {
            this.setState({ dataYear: result.data.data })
        }
        const res = await axios.get(`/api/data-week`)
        if (res.data.status === 200) {
            this.setState({ dataWeek: res.data.data.data, loading: false })
        }
        const data = await axios.get(`/api/list-data?scope=day`)
        if (data.data.status === 200) {
            this.setState({ listData: data.data.data })
        }
        const doanhThu = await axios.get(`/api/doanh-thu`)
        if (doanhThu.data.status === 200) {

            this.setState({ doanhThu: doanhThu.data.data })
        }
    }

    handleChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
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
        const data = [];
        this.state.doanhThu && this.state.doanhThu.length > 0 && this.state.doanhThu.map((item) => {
            let a = {
                productName: item.product.productName,
                quantity: item.quantity,
                price: item.product.salePrice
            }
            data.push(a);
        })
        const dataYear = []
        if (!this.state.loading) {
            this.state.dataYear.map((item) => {

                let a = {
                    name: item.month + '-' + '2022',
                    Máy: item.product,
                }
                dataYear.push(a);
            })
        }

        const dataWeek = []
        if (!this.state.loading) {
            this.state.dataWeek.map((item, index) => {
                let a = {
                    name: item.date,
                    Máy: item.product,
                    amt: 2000
                }
                dataWeek.push(a);
            })
        }

        let soMay = 0
        let total = 0
        return (<>

            <h1>Bảng thống kê</h1>
            <div className="container">
                <div className="row">
                    <div className="col col-md-6">
                        <h5>Bảng thống kê năm</h5>
                        <LineChart
                            width={500}
                            height={300}
                            data={dataYear}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis type="number" domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Máy" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                    <div className="col col-md-6">
                        <h5>7 ngày gần nhất</h5>
                        <LineChart
                            width={500}
                            height={300}
                            data={dataWeek}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis type="number" domain={[0, 50]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Máy" stroke="#035afc" />
                        </LineChart>

                        <Link to={`/admin/list-product/week`} className="d-flex justify-content-center" style={{ fontWeight: 'bold' }}>Xem chi tiết</Link>

                    </div>
                </div>
                <h3>Sản phẩm đã bán hôm nay</h3>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">

                        <div className="card">
                            <table className="table table-borderless table-shopping-cart">
                                <thead className="text-muted">
                                    <tr className="small text-uppercase">
                                        <th scope="col">Hình ảnh</th>
                                        <th scope="col">Sản Phẩm</th>
                                        <th scope="col" width="120">Số Lượng</th>
                                        <th scope="col" width="120">Đơn Giá</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.listData && this.state.listData.length > 0 && this.state.listData.map((item, index) => {
                                        var image = JSON.parse(item.product.image)
                                        return (
                                            <tr key={index}>
                                                <td style={{ width: "300px" }}>
                                                    <figure className="itemside">
                                                        <div className="aside"><img src={`http://localhost:8000/img/${image[0]}`} alt="null" className="img-sm" /></div>
                                                        <figcaption className="info">
                                                        </figcaption>
                                                    </figure>
                                                </td>
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
                <h3>Doanh thu tháng</h3>
                {/* <select style={{ display: 'inline', width: '100px', marginLeft: '745px' }} onChange={(event) => this.handleChangeInput(event)} name='type' className="form-select d-md-inline-block" aria-label="Default select example">
                    <option selected value="day">Ngày</option>
                    <option value="month">Tháng</option>
                </select> */}
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">

                        <div className="card">
                            <table className="table table-borderless table-shopping-cart">
                                <thead className="text-muted">
                                    <tr className="small text-uppercase">
                                        <th scope="col">Hình ảnh</th>
                                        <th scope="col">Sản Phẩm</th>
                                        <th scope="col" width="120">Số Lượng</th>
                                        <th scope="col" width="120">Đơn Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.doanhThu && this.state.doanhThu.length > 0 && this.state.doanhThu.map((item, index) => {
                                        var image = JSON.parse(item.product.image)
                                        soMay += item.quantity
                                        total += item.quantity * item.price
                                        return (
                                            <tr key={index}>
                                                <td style={{ width: "300px" }}>
                                                    <figure className="itemside">
                                                        <div className="aside"><img src={`http://localhost:8000/img/${image[0]}`} alt="null" className="img-sm" /></div>
                                                        <figcaption className="info">
                                                        </figcaption>
                                                    </figure>
                                                </td>
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
                        <div className="card">
                            <div><span>Số máy đã bán: </span><span style={{ fontWeight: "bold" }}>{soMay}</span>&emsp;&emsp;&emsp;&emsp;<span>Tiền: </span><span style={{ fontWeight: "bold" }}>{new Intl.NumberFormat().format(total)} đ</span></div>
                        </div>
                        <CSVLink data={data} headers={headers} className="d-flex justify-content-end mt-2">
                            <i className="fa-solid fa-file-export"></i>Xuất excel
                        </CSVLink>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>


        </>
        );
    }
}
export default Dashboard;