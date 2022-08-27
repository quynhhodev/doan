import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
class Tintuc extends React.Component {
    state = {
        tintuc: '',
        loading: true,
        danhsach: '',
        sidebar: ''
    }
    async componentDidMount() {
        const res = await axios.get(`api/tintuc`);
        if (res.data.status === 200) {
            this.setState({ tintuc: res.data.data.posts, loading: false, danhsach: res.data.data.listPosts, sidebar: res.data.data.sideBar })
        }
    }
    render() {
        if (!this.state.loading) {
            var danhsach = this.state.danhsach;
            let result = danhsach.slice(5, danhsach.length)
            console.log(result)
        }


        var img_path = "http://localhost:8000/img/"
        return (<div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-8">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7">{
                                    this.state.tintuc && this.state.tintuc.length > 0 && <>
                                        <Link to={`/post-detail/${this.state.tintuc[0].slug}`}>
                                            <img src={img_path + JSON.parse(this.state.tintuc[0].image)} alt='...' width='100%' />
                                            <br />
                                            <br />
                                            <h5>{this.state.tintuc[0].title}</h5>
                                        </Link>
                                    </>
                                }</div>
                                <div className="col-md-5">{
                                    this.state.tintuc && this.state.tintuc.length > 0 && <>
                                        <Link to={`/post-detail/${this.state.tintuc[1].slug}`}>
                                            <img src={img_path + JSON.parse(this.state.tintuc[1].image)} alt='...' width='100%' />
                                            <br />
                                            <h5>{this.state.tintuc[1].title}</h5>
                                        </Link>
                                        <hr />
                                        <Link to={`/post-detail/${this.state.tintuc[2].slug}`}>
                                            <p>{this.state.tintuc[2].title}</p>
                                        </Link>
                                        <hr />
                                        <Link to={`/post-detail/${this.state.tintuc[3].slug}`}>
                                            <p>{this.state.tintuc[3].title}</p>
                                        </Link>
                                        <hr />
                                        <Link to="">
                                            <p>{this.state.tintuc[4].title}</p>
                                        </Link>
                                    </>
                                }</div>
                            </div>
                        </div>
                        {
                            danhsach && danhsach.length > 0 && danhsach.slice(5, danhsach.length).map((item, index) => {
                                return (<Link className="mt-3" to={`/post-detail/${item.slug}`}>
                                    <div className="row mt-3" >
                                        <div className="col-md-3"><img src={img_path + JSON.parse(item.image)} alt='...' width='100%' /></div>
                                        <div className="col-md-9 mt-3"><h5>{item.title}</h5></div>
                                    </div>
                                </Link>
                                )

                            })}
                    </div>
                    {/* <div className="col-md-5">{
                        this.state.tintuc && this.state.tintuc.length > 0 && <>
                            <Link to="">
                                <img src={img_path + JSON.parse(this.state.tintuc[0].image)} alt='...' width='100%' />
                                <br />
                                <br />
                                <h5>{this.state.tintuc[0].title}</h5>
                            </Link>
                        </>
                    }</div>
                    <div className="col-md-3">
                        {
                            this.state.tintuc && this.state.tintuc.length > 0 && <>
                                <Link to="">
                                    <img src={img_path + JSON.parse(this.state.tintuc[1].image)} alt='...' width='100%' />
                                    <br />
                                    <h5>{this.state.tintuc[1].title}</h5>
                                </Link>
                                <hr />
                                <Link to="">
                                    <p>{this.state.tintuc[2].title}</p>
                                </Link>
                                <hr />
                                <Link to="">
                                    <p>{this.state.tintuc[3].title}</p>
                                </Link>
                                <hr />
                                <Link to="">
                                    <p>{this.state.tintuc[4].title}</p>
                                </Link>
                            </>
                        }
                    </div> */}
                    <div className="col-md-4">
                        {this.state.sidebar && this.state.sidebar.length > 0 && <>
                            <Link to={`/post-detail/${this.state.sidebar[0].slug}`}>
                                <img src={img_path + JSON.parse(this.state.sidebar[0].image)} alt='...' width='100%' />
                                <br />
                                <h5>{this.state.sidebar[0].title}</h5>
                            </Link>
                        </>
                        }
                        <div className="container-fluid">
                            <div className="row">
                                {this.state.sidebar && this.state.sidebar.length > 0 &&
                                    this.state.sidebar.slice(1, this.state.sidebar.length).map((item, index) => {
                                        return (
                                            <div className="col-md-6 mt-3" key={index}><Link to={`/post-detail/${item.slug}`}><img src={img_path + JSON.parse(item.image)} alt='...' width='100%' />
                                                <br />
                                                <p>{item.title}</p></Link></div>
                                        )
                                    }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default Tintuc;