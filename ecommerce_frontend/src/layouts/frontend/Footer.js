import React from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
class Footer extends React.Component {
    handleLogout = (e) => {
        e.preventDefault();
        axios.post(`api/logout`).then(res => {
            localStorage.removeItem('auth_name')
            localStorage.removeItem('auth_token')
            this.props.history.push('/');
        })
    }
    render() {
        return (
            <>
                <footer className="section-footer bg-secondary">
                    <div className="container">
                        <section className="footer-top padding-y-lg text-white">
                            <div className="row">
                                <aside className="col-md col-6">
                                    <h6 className="title">Thông tin</h6>
                                    <ul className="list-unstyled">
                                        <li> <p>Được thành lập vào cuối năm 2001 đi vào hoạt động kinh doanh điện thoại và laptop. Đảm bảo sự an tâm, tin tưởng là mục tiêu luôn hướng tới.</p></li>
                                        <li> <p><i className="fa-solid fa-phone"></i> 1800.9080 24/7 hỗ trợ liên tục</p></li>
                                        <li> <a href="/">Kĩ thuật (8:00 - 21:00)</a></li>
                                        <li> <a href="/">Bảo hành (8:00 - 21:00)</a></li>
                                    </ul>
                                </aside>


                                <aside className="col-md-2 col-6">
                                    <h6 className="title">Tài khoản</h6>
                                    <ul className="list-unstyled">
                                        {!localStorage.getItem('auth_token') ?
                                            <><li className=""><Link to="/login" className="" exact={true}>Đăng nhập</Link></li>
                                                <li className=""><Link to="/register" exact={true}>Đăng kí</Link></li></> :
                                            <li className=""><button type="button" onClick={(e) => this.handleLogout(e)} style={{ border: "none", }} >Đăng xuất</button></li>}
                                        <li> <a href="/"> Cài đặt </a></li>
                                        <li> <a href="/"> Đơn hàng </a></li>
                                    </ul>
                                </aside>
                                <aside className="col-md-3">
                                    <h6 className="title">Thêm tin tức</h6>
                                    <ul className="list-unstyled">
                                        <li><a href="/"> <i className="fab fa-facebook"></i> Facebook </a></li>
                                        <li><a href="/"> <i className="fab fa-twitter"></i> Twitter </a></li>
                                        <li><a href="/"> <i className="fab fa-instagram"></i> Instagram </a></li>
                                        <li><a href="/"> <i className="fab fa-youtube"></i> Youtube </a></li>
                                        <li> <Link to="/contact">Liên hệ với chúng tôi</Link></li>
                                    </ul>
                                </aside>
                            </div>
                        </section>

                        <section className="footer-bottom text-center">

                            <p className="text-white">Chính sách quyền riêng tư - Điều khoản sử dụng - Thông tin người dùng Hướng dẫn hỏi đáp pháp lý</p>
                            <p className="text-muted"> &copy 2022 bản quyền thuộc về didongX.com.vn </p>
                            <br />
                        </section>
                    </div>
                </footer>
            </>
        )
    }


}


export default withRouter(Footer);