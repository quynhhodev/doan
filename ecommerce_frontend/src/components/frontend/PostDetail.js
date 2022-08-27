import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
class PostDetail extends React.Component {
    state = {
        post: {},
        loading: true,
        postLike: []
    }
    handleClick = async (slug) => {
        //window.scrollTo(0, 0);
        // const res = await axios.get(`api/post-detail/${slug}`);
        // if (res.data.status === 200) {
        //     this.setState({ post: res.data.data.post, postLike: res.data.data.postLike })
        // }
        await this.props.history.replace(`/post-detail/${slug}`);
        window.location.reload(false);
        // this.props.history.replace(`/post-detail/${slug}`);

        //this.props.history.replace(`/${this.props.category_slug}/${this.props.slug}`);
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        const post_slug = this.props.match.params.slug;
        const res = await axios.get(`api/post-detail/${post_slug}`);
        if (res.data.status === 200) {
            this.setState({ post: res.data.data.post, postLike: res.data.data.postLike, loading: false });
        }
        else {
            console.log(res)
        }


    }
    render() {
        var img_path = "http://localhost:8000/img/"
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8" style={{ wordWrap: 'break-word', overflow: 'hidden' }}>
                        <h2>{!this.state.loading && this.state.post.title}</h2>
                        <hr />
                        {
                            !this.state.loading && this.state.post.content.indexOf('</') !== -1
                                ? (
                                    <div dangerouslySetInnerHTML={{ __html: this.state.post.content.replace(/(<? *script)/gi, 'illegalscript') }} >
                                    </div>
                                )
                                : this.state.post.content
                        }
                        <br />
                        <br />

                        <h5>Các bài viết liên quan</h5>
                        <br />
                        <div className="container">
                            <div className="row">
                                {/* <div className="col-md-4">post 1</div> */}
                                {this.state.postLike && this.state.postLike.length > 0 &&
                                    this.state.postLike.map((item, index) => {
                                        var image = JSON.parse(item.image)
                                        return (<div className="col-md-4" key={index}>
                                            <Link to={`/post-detail/${item.slug}`} onClick={() => this.handleClick(item.slug)}>
                                                <img src={img_path + image} alt="..." width="100%" />
                                                <p>{item.title}</p>
                                            </Link>

                                        </div>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        )
    }
}
export default PostDetail;