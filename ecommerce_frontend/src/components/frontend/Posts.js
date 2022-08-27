import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
class Posts extends React.Component {
    state = {
        listPosts: [],
    }
    async componentDidMount() {
        const res = await axios.get(`api/post-home`);
        if (res.data.status === 200) {
            this.setState({ listPosts: res.data.data })
        }
    }
    render() {
        var img_path = "http://localhost:8000/img/"
        return (

            <div className="card card-body">
                <header className="section-heading ">
                    <h4 className="title-section text-uppercase">Tin Công nghệ</h4>
                    <Link className="d-flex justify-content-end" to={`/tintuc`}>Xem tất cả &gt;&gt;&gt;</Link>
                </header>
                <div className="container">
                    <div className="row">
                        {this.state.listPosts && this.state.listPosts.length > 0 &&
                            this.state.listPosts.map((item, index) => {
                                var image = JSON.parse(item.image)
                                return (<div className="col-md-4" key={index}>
                                    <Link to={`/post-detail/${item.slug}`}>
                                        <img src={img_path + image} alt="..." width="100%" />
                                        <p>{item.title}</p>
                                    </Link>

                                </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Posts;