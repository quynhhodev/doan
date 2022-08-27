import React from "react";
import { Link } from 'react-router-dom';
class Category extends React.PureComponent {
    render() {
        var img_path = "http://localhost:8000/img/";
        return (
            <li>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 d-flex justify-content-center"><img alt="..." src={img_path + JSON.parse(this.props.icon)} style={{ opacity: "0.7" }} /></div>
                        <div className="col-md-10  d-flex align-items-center" style={{ height: "36px" }}> <Link to={this.props.path} style={{ fontSize: "0.9rem", fontWeight: "bold" }}>{this.props.catName}</Link></div>
                    </div>
                </div>
            </li>


        );
    }
}
export default Category;