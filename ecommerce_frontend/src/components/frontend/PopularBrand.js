import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";

class PopularBrand extends React.Component {
    state = {
        listBrands: [],
        loading: true
    }
    async componentDidMount() {
        var res = await axios.get('api/popular-brands');
        if (res.status === 200) {

            this.setState({ listBrands: res.data.data, loading: false });
        }
    }
    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToScroll: 1,
            className: "center",
            slidesToShow: 6,
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
            HTML = this.state.listBrands.map((item, index) => {
                //let listImages = JSON.parse(item.image)
                var img = JSON.parse(item.image)
                return (
                    <div className="card card-sm card-product-grid" key={index}>
                        {item.installment === 1 ? <small style={{ backgroundColor: '#e3dedc', width: '70px', borderRadius: '5px' }} className="mt-1 ml-1 mb-2">Trả góp 0%</small> : <small className="mt-4">&nbsp;</small>}
                        <Link to={`/collections-brand/${item.slug}`} className="img-wrap mt-3"> <img alt='null' src={img_path + img} /> </Link>

                    </div>
                )

            })
        }

        return <section className="padding-bottom-sm">
            <header className="section-heading heading-line">
                <h4 className="title-section text-uppercase">Chuyên laptop</h4>
            </header>

            <div className="row row-sm">
                <Slider arrows={false} {...settings} >
                    {HTML}
                </Slider>
            </div>
        </section>
    }
}
export default PopularBrand;