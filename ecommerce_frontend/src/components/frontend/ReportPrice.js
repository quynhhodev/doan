import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
class ReportPrice extends React.Component {
    state = {
        productName: '',
        quantity: '',
        requestInfo: false,
        requestPrice: false,
        error_list: [],
    }

    handleChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.checked })

    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('productName', this.state.productName);
        data.append('quantity', this.state.quantity);
        data.append('requestInfo', this.state.requestInfo);
        data.append('requestPrice', this.state.requestPrice);
        const res = await axios.post(`/api/request-user`, data);
        if (res.data.status === 200) {
            console.log(res.data.data);
            Swal.fire(
                'OK',
                res.data.message,
                'success'
            )
        }
        else if (res.data.status === 401) {
            Swal.fire(
                'Lỗi',
                "Bạn cần phải đăng nhập để gửi yêu cầu",
                'warning'
            )
        }
        else {
            this.setState({
                error_list: res.data.validation_errors
            })
        }
    }


    render() {
        return (
            <section className="padding-bottom">

                <header className="section-heading heading-line">
                    <h4 className="title-section text-uppercase">Yêu cầu báo giá</h4>
                </header>

                <div className="row">
                    <div className="col-md-8">
                        <div className="card-banner banner-quote overlay-gradient" >
                            <div className="card-img-overlay white">
                                <h3 className="card-title">Một cách dễ dàng để gửi yêu cầu đến nhà cung cấp</h3>
                                <p className="card-text" style={{ maxWidth: "400px" }}>Gửi ngay để nhận được hỗ trợ, chi tiết và tận tình.</p>
                                <a href="/" className="btn btn-primary rounded-pill">Tìm hiểu thêm</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">

                        <div className="card card-body">
                            <h4 className="title py-3">Một yêu cầu, nhiều trích dẫn</h4>
                            <form>
                                <div className="form-group">
                                    <input className="form-control" name="productName" placeholder="Bạn muốn báo giá của?" type="text" onChange={(e) => this.handleChangeInput(e)} />
                                    <span className="text-danger">{this.state.error_list.productName}</span>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input className="form-control" placeholder="Số lượng" name="quantity" type="text" onChange={(e) => this.handleChangeInput(e)} />
                                        <span className="form-control">Cái/Chiếc</span>

                                    </div>
                                    <span className="text-danger">{this.state.error_list.quantity}</span>
                                </div>
                                <div className="form-group text-muted">
                                    <p>Chọn Kiểu Yêu Cầu</p>
                                    <label className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" value="option1" name="requestPrice" onChange={(e) => this.handleChange(e)} />
                                        <span className="form-check-label">Yêu cầu giá</span>
                                    </label>
                                    <label className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" value="option2" name="requestInfo" onChange={(e) => this.handleChange(e)} />
                                        <span className="form-check-label">Yêu cầu thông tin sản phẩm</span>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-warning" onClick={(e) => this.handleSubmit(e)}>Gửi</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        );
    }
}
export default ReportPrice;