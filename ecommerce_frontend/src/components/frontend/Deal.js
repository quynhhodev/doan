import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
class Deal extends React.Component {
    state = { productForSale: [], loading: true, banner: [] }

    async componentDidMount() {
        var res = await axios.get('api/product-for-sale');
        if (res.status === 200) {
            this.setState({ productForSale: res.data.productForSale })
        }
        let result = await axios.get(`api/banner-top/${3}`)
        if (result.data.status === 200) {
            this.setState({ banner: result.data.data });
        }
    }
    render() {
        if (this.state.banner && this.state.banner.length > 0) {
            var Img = JSON.parse(this.state.banner[0].image)
        }
        var productForSale = '';
        var img_path = "http://localhost:8000/img/";
        if (this.state.loading) {
            <h2>Đang tải...</h2>
        }
        productForSale = this.state.productForSale.map((item, index) => {
            let listImages = JSON.parse(item.image)
            return (
                <div className="col-md col-6" key={index}>
                    <figure className="card-product-grid card-sm">
                        {item.installment === 1 ? <small style={{ backgroundColor: '#e3dedc', width: '70px', borderRadius: '5px' }} className="mt-1 mb-2">Trả góp 0%</small> : <small className="mt-4">&nbsp;</small>}
                        <Link to={`/collections/${item.category.slug}/${item.slug}`} className="img-wrap item">
                            <img src={img_path + listImages[0]} alt="null" />
                        </Link><div className="text-wrap p-3">

                            <Link to={`/collections/${item.category.slug}/${item.slug}`} style={{ fontWeight: "bold" }} className="title">{item.productName}</Link>

                            <div style={{ marginTop: '10px' }} className="justify-content-center">
                                <div className="d-block d-flex justify-content-center">
                                    <span style={{ color: "gray" }}><i className="fas fa-memory"></i>&nbsp;{item.ram}GB </span>&nbsp;
                                    <span style={{ color: "gray" }}><i className="fa-solid fa-hard-drive"></i>&nbsp;{item.rom}GB </span>
                                </div>
                                <span className="d-block d-flex justify-content-center" style={{ color: "gray", }}><i className="fa-solid fa-microchip mt-1"></i>&nbsp;{item.chip}</span>
                                <span className="d-block d-flex justify-content-center" style={{ color: "gray", }}><i className="fa-solid fa-mobile-screen mt-1" ></i>&nbsp;{item.screen} inch </span>
                            </div>

                            <b className="d-block" style={{ color: "red", fontSize: "18px" }}>{new Intl.NumberFormat().format(item.salePrice)}<sup>đ</sup></b>
                            {parseFloat(item.salePrice) < parseFloat(item.price) ? <span style={{ backgroundColor: "#fccc97", borderRadius: "5px", fontWeight: "bold", fontSize: "14px", color: "#d17106" }}>
                                - {((parseInt(item.price) - parseFloat(item.salePrice)) / parseInt(item.price) * 100).toFixed(0)}%
                            </span> : ''}



                            <b className="d-block" style={{ color: "orange" }}>{item.vote === 0 ? '' : item.vote} {item.vote === 0 ? '' : <span className="fa fa-star" ></span>} </b>
                        </div>
                    </figure>
                </div>
            )
        })
        return (
            <div className="card card-deal">
                <div className="col-heading content-body" style={{ backgroundImage: `url(${img_path + Img})` }}>
                    <header className="section-heading">
                        <h2 style={{ textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff", color: "#c91b08" }}>Deals Ngon Mỗi Ngày</h2>
                        <h2 style={{ textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff", color: "#c91b08" }}>Mua Ngay!!!</h2>
                    </header>
                </div>
                <div className="row no-gutters items-wrap">
                    {productForSale}
                </div>
            </div>
        );
    }
}
export default Deal;