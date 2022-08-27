import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
class PopularCategories extends React.PureComponent {
    state = { popularCat: [] }

    async componentDidMount() {
        var popularCat = await axios.get('/api/popularCat');
        if (popularCat.status === 200) {
            this.setState({ popularCat: popularCat.data.data });
        }
    }
    render() {
        var img_path = "http://localhost:8000/img/";
        return (
            <aside className="special-home-right">
                <h6 className="bg-blue text-center text-white mb-0 p-2">Danh mục phổ biến</h6>
                {this.state.popularCat && this.state.popularCat.length > 0 &&
                    this.state.popularCat.map((item, index) => {
                        return <div className="card-banner border-bottom" key={index}>
                            <div className="py-3" style={{ width: "80%" }}>
                                <div className="card-title" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{item.catName}</div>
                                <Link to={`/collections/${item.slug}`} className="btn btn-secondary btn-sm" style={{ fontSize: '0.8rem' }}> Xem Ngay </Link>
                            </div>
                            <img src={img_path + JSON.parse(item.image)} style={{ margin: "0px 20px 30px 0px" }} alt='null' className="img-bg" />
                        </div>
                    })

                }
            </aside>
        );
    }
}
export default React.memo(PopularCategories);