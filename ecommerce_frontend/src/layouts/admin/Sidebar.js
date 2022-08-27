import React from "react";
import { Link } from "react-router-dom";
class Sidebar extends React.Component {
    render() {
        return (
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    {localStorage.getItem('auth_name') == 'shipper' ? <Link className="nav-link" to="/admin/shipper" disabled>
                        <div className="sb-nav-link-icon"></div>
                        Đơn Hàng
                    </Link> :
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link className="nav-link" to="/admin/dashboard" disabled>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Trang Chủ
                            </Link>
                            <div className="sb-sidenav-menu-heading">Interface</div>
                            {/*----- Link -----*/}
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts" >
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Link
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/admin/links" >Link List</Link>
                                    <Link className="nav-link" to="/admin/add-link">Add Link</Link>
                                    <Link className="nav-link" to="/admin/link-trash">Link Trash</Link>
                                </nav>
                            </div>
                            {/*----- Brand -----*/}
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseBrands" aria-expanded="false" aria-controls="collapseBrands">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Thương Hiệu
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="collapseBrands" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/admin/brands">Danh Sách</Link>
                                    <Link className="nav-link" to="/admin/add-brand">Thêm</Link>
                                    <Link className="nav-link" to="/admin/brand-trash">Giỏ Rác</Link>
                                </nav>
                            </div>
                            {/*----- Category -----*/}
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseCategories" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Danh Mục
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="collapseCategories" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/admin/categories">Danh Sách</Link>
                                    <Link className="nav-link" to="/admin/add-category">Thêm</Link>
                                    <Link className="nav-link" to="/admin/categories-trash">Giỏ Rác</Link>
                                </nav>
                            </div>
                            {/*----- Post -----*/}
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapsePosts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Bài Viết
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="collapsePosts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/admin/posts">Danh Sách</Link>
                                    <Link className="nav-link" to="/admin/add-post">Thêm</Link>
                                </nav>
                            </div>
                            {/*----- Product -----*/}
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProducts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Sản Phẩm
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="collapseProducts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/admin/products">Danh Sách</Link>
                                    <Link className="nav-link" to="/admin/add-product">Thêm</Link>
                                    <Link className="nav-link" to="/admin/product-trash">Giỏ Rác</Link>
                                </nav>
                            </div>

                            <Link className="nav-link" to="/admin/orders">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Đơn Hàng
                            </Link>

                            <Link className="nav-link" to="/admin/comments">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Bình Luận
                            </Link>
                            <Link className="nav-link" to="/admin/contacts">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Liên hệ
                            </Link>
                            {/* <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                            Pages
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link> */}
                            <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                        Authentication
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </Link>
                                    <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to="login.html">Login</Link>
                                            <Link className="nav-link" to="register.html">Register</Link>
                                            <Link className="nav-link" to="password.html">Forgot Password</Link>
                                        </nav>
                                    </div>
                                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                        Error
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </Link>
                                    <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to="401.html">401 Page</Link>
                                            <Link className="nav-link" to="404.html">404 Page</Link>
                                            <Link className="nav-link" to="500.html">500 Page</Link>
                                        </nav>
                                    </div>
                                </nav>
                            </div>
                            {/*<div className="sb-sidenav-menu-heading">Addons</div>
                         <Link className="nav-link" to="charts.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                            Charts
                        </Link>
                        <Link className="nav-link" to="tables.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                            Tables
                        </Link> */}
                        </div>
                    }
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    didongX.com
                </div>
            </nav>
        );
    }
}

export default Sidebar;