import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from 'react-router-dom';
class SlideShow extends React.PureComponent {
    state = {
        banner: []
    }
    async componentDidMount() {

        let result = await axios.get(`api/banner-top/${2}`)
        if (result.data.status === 200) {
            this.setState({ banner: result.data.data });
        }
    }
    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToScroll: 1,
            className: "center",
            slidesToShow: 1,
            autoplay: true,
            speed: 1200,
            autoplaySpeed: 5000,
            cssEase: "ease-in-out"
        };
        var img_path = "http://localhost:8000/img/"

        return (

            <Slider arrows={false} {...settings} >
                {this.state.banner && this.state.banner.length > 0 && this.state.banner.map((item, index) => {
                    let img = JSON.parse(item.image)
                    return <Link to={item.url} key={index}>
                        <img src={img_path + img} alt="null" />
                    </Link>
                })
                }
            </Slider>

        )
    }
}
export default React.memo(SlideShow);