import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";

class SliderProducts extends React.Component {
    state = { listProducts: [], loading: true }


    async componentDidMount() {
        const res = await axios.get('api/best-selling-products');
        if (res.data.status === 200) {
            this.setState({ listProducts: res.data.data, loading: false })
        }
    }
    render() {
        const settings = {

            dots: false,
            infinite: true,
            slidesToScroll: 1,
            className: "center",
            slidesToShow: 5,
            autoplay: true,
            speed: 1200,
            autoplaySpeed: 5000,
            cssEase: "ease-in-out"
        };

        var HTML = ''
        var img_path = "http://localhost:8000/img/"
        if (this.state.loading) {
            <h2>loading</h2>
        }
        else {
            HTML = this.state.listProducts.map((item, index) => {
                let listImages = JSON.parse(item.image)
                return (
                    <div className="card card-sm card-product-grid" key={index}>
                        {item.installment === 1 ? <small style={{ backgroundColor: '#e3dedc', width: '70px', borderRadius: '5px' }} className="mt-1 ml-1 mb-2">Trả góp 0%</small> : <small className="mt-4">&nbsp;</small>}
                        <Link to={`/collections/${item.category.slug}/${item.slug}`} className="img-wrap">

                            <img alt='null' src={img_path + listImages[0]} />
                        </Link>
                        <figcaption className="info-wrap">
                            <Link to={`/collections/${item.category.slug}/${item.slug}`} style={{ fontWeight: "bold" }} className="title d-flex justify-content-center">{item.productName}</Link>
                            <div style={{ marginTop: '10px' }} className="justify-content-center">
                                <div className="d-block d-flex justify-content-center">
                                    <span style={{ color: "gray" }}><i className="fas fa-memory"></i>&nbsp;{item.ram}GB </span>&nbsp;
                                    <span style={{ color: "gray" }}><i className="fa-solid fa-hard-drive"></i>&nbsp;{item.rom}GB </span>
                                </div>
                                <span className="d-block d-flex justify-content-center" style={{ color: "gray", }}><i className="fa-solid fa-microchip mt-1"></i>&nbsp;{item.chip}</span>
                                <span className="d-block d-flex justify-content-center" style={{ color: "gray", }}><i className="fa-solid fa-mobile-screen mt-1" ></i>&nbsp;{item.screen} inch </span>
                            </div>
                            <div className="price mt-1 d-inline" style={{ color: "red", fontSize: "18px", marginLeft: "50px" }}>{new Intl.NumberFormat().format(item.salePrice)}<sup>đ</sup> </div>

                            {parseFloat(item.salePrice) < parseFloat(item.price) ? <span style={{ backgroundColor: "#fccc97", borderRadius: "5px", fontWeight: "bold", fontSize: "14px", color: "#d17106" }}>
                                - {((parseInt(item.price) - parseFloat(item.salePrice)) / parseInt(item.price) * 100).toFixed(0)}%
                            </span> : <span style={{ backgroundColor: "#fccc97", borderRadius: "5px", fontWeight: "bold", fontSize: "14px", color: "#d17106" }}>{''}</span>}
                            <del className="text-mute d-block d-flex justify-content-center" style={{ color: 'gray', }}>{new Intl.NumberFormat().format(item.price)}</del>
                            <b className="d-block d-flex justify-content-center" style={{ color: "orange" }}>{item.vote === 0 ? <><div style={{ visibility: "hidden" }}>abc</div></> : item.vote} {item.vote === 0 ? '' : <span className="fa fa-star" ></span>} </b>
                            <span className="d-block d-flex justify-content-center" style={{ color: "orange" }}>{item.offersGifts === 1 ? 'Kèm quà tặng' : <div style={{ visibility: "hidden" }}>abc</div>}</span>
                        </figcaption>
                    </div>
                )
            })
        }
        return (<>

            <header className="section-heading heading-line">
                <h4 className="title-section text-uppercase">Sản Phẩm Bán chạy</h4>
            </header>

            <Slider arrows={false} {...settings} >
                {HTML}
            </Slider>


        </>);
    }
}
export default SliderProducts;