import React from "react";
import { Link, withRouter } from "react-router-dom";
//import ProDetail from '../../pages/Frontend/ProDetail';

class Product extends React.Component {
    state = {
        id: this.props.id,
        strUrl: '',
    }

    handleClick = (category_slug, slug) => {

        this.props.history.replace(`/collections/${this.props.category_slug}/${this.props.slug}`)
        window.location.reload(false);

        //this.props.history.replace(`/${this.props.category_slug}/${this.props.slug}`);
    }

    render() {
        var img_path = "http://localhost:8000/img/"
        var listImages = JSON.parse(this.props.image)
        return (<>
            <div className="col-md-3">
                <figure className="card card-product-grid">
                    {/* <div className="img-wrap">
                        <Link to={`/collections/${this.props.category_slug}/${this.props.slug}`}><img src={img_path + listImages[0]} alt="null" /></Link>
                    </div> */}
                    <figure className="card-product-grid card-sm">
                        {this.props.installment === 1 ? <small style={{ backgroundColor: '#e3dedc', width: '70px', borderRadius: '5px' }} className="mt-1 mb-2">Trả góp 0%</small> : <small className="mt-4">&nbsp;</small>}
                        <span onClick={() => this.handleClick(this.props.category_slug, this.props.slug)}>
                            <Link to={`/collections/${this.props.category_slug}/${this.props.slug}`} className="img-wrap item">
                                <img src={img_path + listImages[0]} alt="null" />
                            </Link>
                        </span>
                        <div className="text-wrap p-3">

                            <Link to={`/collections/${this.props.category_slug}/${this.props.slug}`} style={{ fontWeight: "bold" }} className="title d-block d-flex justify-content-center" onClick={() => this.handleClick(this.props.category_slug, this.props.slug)}>{this.props.productName}</Link>

                            <div style={{ marginTop: '10px' }} className="justify-content-center">
                                <div className="d-block d-flex justify-content-center">
                                    <span style={{ color: "gray" }}><i className="fas fa-memory"></i>&nbsp;{this.props.ram}GB </span>&nbsp;
                                    <span style={{ color: "gray" }}><i className="fa-solid fa-hard-drive"></i>&nbsp;{this.props.rom}GB </span>
                                </div>
                                <span className="d-block d-flex justify-content-center" style={{ color: "gray", }}><i className="fa-solid fa-microchip mt-1">&nbsp;</i>{this.props.chip}</span>
                                <span className="d-block d-flex justify-content-center" style={{ color: "gray", }}><i className="fa-solid fa-mobile-screen mt-1" ></i>&nbsp;{this.props.screen} inch </span>
                            </div>
                            <div style={{ marginTop: '10px' }} className="justify-content-center">

                                <b className="d-block d-block d-flex justify-content-center" style={{ color: "red", fontSize: "18px" }}>{new Intl.NumberFormat().format(this.props.salePrice)}<sub>đ</sub></b>
                                <div className="d-block d-flex justify-content-center">
                                    {this.props.salePrice < this.props.price ? <span style={{ backgroundColor: "#fccc97", borderRadius: "5px", fontWeight: "bold", fontSize: "14px", color: "#d17106" }}>
                                        - {((this.props.price - this.props.salePrice) / this.props.price * 100).toFixed(0)}%
                                    </span> : ''}
                                </div>
                            </div>

                            <div className="d-block d-flex justify-content-center">
                                <b style={{ color: "orange" }}>{this.props.vote === 0 ? '' : this.props.vote} {this.props.vote === 0 ? '' : <span className="fa fa-star" ></span>} </b>
                            </div>
                        </div>
                    </figure>
                </figure>

            </div>
            {/* <Switch>
                <Route path={`/collections/${this.props.category_slug}/${this.props.slug}`} component={ProDetail} />
            </Switch> */}
        </>
        );
    }
}
export default withRouter(Product);