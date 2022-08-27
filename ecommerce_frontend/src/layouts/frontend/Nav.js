import React from "react";
import axios from "axios";
import { withRouter, Link, } from "react-router-dom";
class Nav extends React.Component {
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
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to={`/`}>Trang chủ <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Link</Link>
                            </li>
                            {!localStorage.getItem('auth_token') ?
                                <><li className="nav-item"><Link to="/login" className="nav-link" exact={true}>Đăng nhập</Link></li>
                                    <li className="nav-item"><Link to="/register" className="nav-link" exact={true}>Đăng kí</Link></li></> :
                                <li className="nav-item"><button type="button" className="nav-link" onClick={(e) => this.handleLogout(e)} style={{ border: "none", backgroundColor: "#fff" }} >Đăng xuất</button></li>}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
export default withRouter(Nav);