import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Order extends React.Component {
    state = {
        loading: true,
        orders: [],
        searchType: 'phone',
        strSearch: '',
        renderType: '',
        status: 0
    }
    async componentDidMount() {
        const res = await axios.get(`/api/admin/orders`);
        if (res.data.status === 200) {
            this.setState({ orders: res.data.orders, loading: false });
        }
    }
    handleChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleChangeStatus = async (event, id) => {
        this.setState({
            status: event.target.value
        })
        await this.sleep(1000)
        this.handleUpdate(id, this.state.status);
    }
    sleep = (milliseconds = 1000) => new Promise(resolve => setTimeout(resolve, milliseconds))

    handleUpdate = async (id, status) => {
        var data = new FormData();
        data.append('status', status)
        const res = await axios.post(`api/edit-order/${id}`, data);
        if (res.data.status === 200) {
            console.log('ok')
        }
    }
    handleChangeRenderType = async (event) => {
        await this.setState({
            renderType: event.target.value
        })
        switch (this.state.renderType) {
            case 'day':
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;
                console.log(today)
                const res = await axios.get(`api/render-type?date=${today}`)
                if (res.data.status === 200) {
                    this.setState({
                        orders: res.data.data
                    })
                }
                break;
            case 'month':
                today = new Date();
                dd = String(today.getDate()).padStart(2, '0');
                mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                yyyy = today.getFullYear();
                today = yyyy + '-' + mm;
                const result = await axios.get(`api/render-type?date=${today}`)
                if (result.data.status === 200) {
                    //console.log(result.data.data)
                    this.setState({
                        orders: result.data.data
                    })
                }
                break;
            case 'year':
                today = new Date();
                dd = String(today.getDate()).padStart(2, '0');
                mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                yyyy = today.getFullYear();
                today = yyyy;
                const results = await axios.get(`api/render-type?date=${today}`)
                if (results.data.status === 200) {
                    //console.log(results.data.data)
                    this.setState({
                        orders: results.data.data
                    })
                }
                break;
            default:
            // code block
        }

    }
    handleSearch = async (e) => {
        e.preventDefault();
        const res = await axios.get(`api/order-search?type=${this.state.searchType}&str=${this.state.strSearch}`);
        if (res.data.status === 200) {

            this.setState({ orders: res.data.data })
        }
    }
    render() {





        let HTML = '';
        HTML = this.state.orders.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.id}</td>
                    <td>{item.firstName + ' ' + item.lastName}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td><Link to={`/admin/view-orders/${item.id}/${item.user_id}`} className="btn btn-success btn-sm">Xem chi tiết</Link></td>
                    <td><select className="form-select" aria-label="Default select example" onChange={(event) => this.handleChangeStatus(event, item.id)} name="status">
                        {/* {item.status == 0 && <><option selected value="0">Chưa xử lý</option>
                            <option value="1">Đang xác nhận</option>
                            <option value="2">Đã xác nhận</option>
                            <option value="3">Đã xuất kho</option>
                            <option value="4">Đang vận chuyển</option>
                            <option value="5" >Đang giao</option>
                            <option value="6" >Đã giao</option></>} */}
                        {item.status == 0 && <><option selected value="0">Chưa xử lý</option>
                            <option value="1">Đang xác nhận</option>
                        </>}
                        {item.status == 1 && <>
                            <option selected value="1">Đang xác nhận</option>
                            <option value="2">Đã xác nhận</option>
                        </>}
                        {item.status == 2 && <>
                            <option selected value="2">Đã xác nhận</option>
                            <option value="3">Đã xuất kho</option>
                        </>}
                        {item.status == 3 && <>
                            <option selected value="3">Đã xuất kho</option>
                            <option value="4">Đang vận chuyển</option>
                        </>}
                        {item.status == 4 && <>
                            <option selected value="4">Đang vận chuyển</option>
                            <option value="5">Đang giao</option></>}
                        {item.status == 5 && <>
                            <option selected value="5">Đang giao</option>
                            <option value="6">Đã giao</option></>}
                        {item.status == 6 && <>
                            <option selected value="6" disabled>Đã giao</option></>}
                    </select></td>
                </tr>
            )
        })
        return (<>
            <h2 style={{ display: 'inline' }}>Đơn Hàng</h2>
            <div>
                <span>Hiển thị theo:</span>
                <select style={{ display: 'inline', width: '100px' }} onChange={(event) => this.handleChangeRenderType(event)} name='renderType' className="form-select d-md-inline-block" aria-label="Default select example">
                    <option selected value="all">Tất cả</option>
                    <option value="day">Ngày</option>
                    <option value="month">Tháng</option>
                    <option value="year">Năm</option>
                </select>
                <select style={{ display: 'inline', width: '100px', marginLeft: '400px' }} onChange={(event) => this.handleChangeInput(event)} name='searchType' className="form-select d-md-inline-block" aria-label="Default select example">
                    <option selected value="phone">Số điện thoại</option>
                    <option value="email">Email</option>
                    <option value="created_at">Ngày lập</option>

                </select>
                <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2  my-md-0 ">
                    <div style={{ marginLeft: '20px' }} className="input-group d-flex justify-content-end">
                        <input className="form-control" type="text" name="strSearch" placeholder="Search for..." onChange={(event) => this.handleChangeInput(event)} aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button onClick={(e) => this.handleSearch(e)} className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Số Điện Thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col">Thao Tác</th>
                        <th scope="col">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {HTML}
                </tbody>
            </table>

        </>);
    }
}
export default Order;