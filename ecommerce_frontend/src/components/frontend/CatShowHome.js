import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

class CatShowHome extends React.Component {
    state = {
        listProduct: [],
        loading: true
    }
    async componentDidMount() {

        var res = await axios.get(`/api/product-by-cat-show-home/${this.props.catId}`);
        if (res.data.status === 200) {
            this.setState({ listProduct: res.data.data, loading: false })
        }
    }
    render() {
        var img_path = "http://localhost:8000/img/";
        let HTML = ''
        if (this.state.listProduct && this.state.listProduct.length > 0) {
            HTML = this.state.listProduct.map((item, index) => {
                var listImages = JSON.parse(item.image);
                return (
                    <li className="col-6 col-lg-3 col-md-4" key={index}>
                        <div className="card-body">
                            <Link to={`/collections/${item.category.slug}/${item.slug}`} className="item">
                                <h6 className="title" style={{ fontWeight: "bold", minHeight: "0px" }} >{item.productName}</h6>
                                <LazyLoad height={130} once>
                                    <img className="img-sm float-right" src={img_path + listImages[0]} alt='null' />
                                </LazyLoad>
                            </Link>

                            <div style={{ marginTop: '10px' }}>
                                <span style={{ color: "gray" }}><i className="fas fa-memory"></i>&nbsp;{item.ram}GB </span>&nbsp;
                                <span style={{ color: "gray" }}><i className="fa-solid fa-hard-drive"></i>&nbsp;{item.rom}GB </span>
                                <span className="d-block" style={{ color: "gray" }}><i className="fa-solid fa-microchip"></i>&nbsp;{item.chip}</span>
                                <span className="d-block" style={{ color: "gray" }}><i className="fa-solid fa-mobile-screen"></i>&nbsp;{item.screen} inch </span>
                            </div>
                            {item.shortDetail === null ? "" : item.shortDetail.indexOf('</') !== -1
                                ? (
                                    <div className="my-3" style={{ background: 'linear-gradient(to right, #ff0000 0%, #ff9966 100%', borderRadius: '5px', width: '100px', color: 'white' }} dangerouslySetInnerHTML={{ __html: item.shortDetail.replace(/(<? *script)/gi, 'illegalscript') }} >
                                    </div>
                                )
                                : item.shortDetail

                            }
                            <b className="d-inline" style={{ color: "red", fontSize: "18px" }}> {new Intl.NumberFormat().format(item.salePrice)}<sup>đ</sup></b>&nbsp;

                            {parseFloat(item.salePrice) < parseFloat(item.price) ? <span style={{ backgroundColor: "#fccc97", borderRadius: "5px", fontWeight: "bold", fontSize: "14px", color: "#d17106" }}> -{((parseInt(item.price) - parseFloat(item.salePrice)) / parseInt(item.price) * 100).toFixed(0)}%</span> : ''}

                            <b className="d-block" style={{ color: "orange" }}>{item.vote === 0 ? '' : item.vote} {item.vote === 0 ? '' : <span className="fa fa-star" ></span>} </b>
                            <span className="text-mute" style={{ color: "orange" }}>{item.offersGifts === 1 ? 'Kèm quà tặng' : ''}</span>
                        </div>
                    </li>
                )
            })
        }

        var banner = ''
        if (!this.state.loading) {

            //console.log(this.state.listProduct[0].category.image)
            banner = JSON.parse(this.state.listProduct[0].category.image)
        }
        return (
            <div className="container">
                <section className="padding-bottom" >
                    <header className="section-heading heading-line">
                        <h4 className="title-section text-uppercase">{!this.state.loading && this.state.listProduct[0].category.catName}</h4>
                    </header>
                    <div className="card card-home-category">
                        <div className="row no-gutters">

                            <div className="col-md-9">
                                <ul className="row no-gutters bordered-cols">
                                    {HTML}
                                </ul>
                            </div>
                            <div className="col-md-3" style={{ overflow: 'hidden' }}>
                                <div style={{ backgroundImage: `url(${img_path + banner})` }}></div>
                                <img src={img_path + banner} alt='null' />
                                {/* {this.state.listProduct && this.state.listProduct.length > 0 &&
                            <div className="home-category-banner bg-light-orange" key={this.state.listProduct[0].id}>
                                <h5 className="title">{this.state.listProduct[0].productName}</h5>

                                {this.state.listProduct[0].shortDetail.indexOf('</') !== -1
                                    ? (
                                        <div dangerouslySetInnerHTML={{ __html: this.state.listProduct[0].shortDetail.replace(/(<? *script)/gi, 'illegalscript') }} >
                                        </div>
                                    )
                                    : this.state.listProduct[0].shortDetail
                                }
                                <Link to={`/collections/${this.state.listProduct[0].category.slug}/${this.state.listProduct[0].slug}`} className="btn btn-outline-primary rounded-pill">View now</Link>
                                <img src={img_path + IMG[0]} className="img-bg" alt='null' />
                            </div>
                        } */}


                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default CatShowHome;