import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Brand extends React.Component {
    state = {
        listBrand: [], loading: true
    }

    async componentDidMount() {
        const res = await axios.get(`/api/brand-home`);
        if (res.data.status === 200) {
            this.setState({ listBrand: res.data.data, loading: false })
        }
        else {
            console.log(res.data.message);
        }
    }
    render() {
        var img_path = "http://localhost:8000/img/"
        return (
            <div className="container" style={{ overflow: 'hidden' }}>
                <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                {this.state.loading && ""}
                                {this.state.listBrand && this.state.listBrand.length > 0 && this.state.listBrand.map((item, index) => {
                                    var img = JSON.parse(item.image)
                                    return (
                                        <li className="nav-item" key={index}>
                                            <Link className="nav-link" to={`/collections-brand/${item.slug}`}><img style={{ border: "1px solid gray", borderRadius: "20px" }} src={img_path + img} alt="..." /></Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

        )
    }
}
export default Brand;