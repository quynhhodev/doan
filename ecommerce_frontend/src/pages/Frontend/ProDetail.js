import React from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import ReactStars from "react-rating-stars-component";
import { withRouter, Link } from "react-router-dom";
//cookie
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Product from "../../components/frontend/Product";
import LazyLoad from "react-lazyload";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { connect } from 'react-redux';
import { OneStar, TwoStar, ThreeStar, FourStar, FiveStar } from '../../components/frontend/Star';


class ProDetail extends React.Component {
    //cookies
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    //end cookies
    state = {
        productDetail: [],
        productLike: [],
        loading: true,
        quantity: 1,
        url: '',
        setUrl: true,
        listComment: [],
        comment: '',
        star: 0,
        editComment: {},
        isEdit: false,
        current: false,
        listProductCookies: '',
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        const product_slug = this.props.match.params.product;
        const category_slug = this.props.match.params.category;
        let res = await axios.get(`api/view-product/${category_slug}/${product_slug}`)
        if (res.data.status === 200) {
            this.setState({ productDetail: res.data.product });
        }
        else if (res.data.status === 404) {
            console.log(res.data.message);
        }
        const result = await axios.get(`api/get-comment/${this.state.productDetail.id}`)
        if (result.data.status === 200) {
            this.setState({ listComment: result.data.data })
        }
        // Product Like
        let productLike = await axios.get(`api/view-product-like/${category_slug}/${product_slug}`)
        if (productLike.data.status === 200) {
            this.setState({ productLike: productLike.data.productLike, loading: false });
        }
        else if (productLike.data.status === 404) {
            console.log('error');
        }
        this.setState({ current: false })
        // const { cookies } = this.props;
        // cookies.set("product", "", { path: "/" })
    }

    IncrementItem = (quantity) => {
        this.setState(prevState => {
            if (prevState.quantity < 9) {


                if (quantity < prevState.quantity + 1) {
                    return null;
                }
                else {
                    return {
                        quantity: prevState.quantity + 1
                    }
                }


                // return {
                //     quantity: prevState.quantity + 1
                // }
            } else {
                return null;
            }
        });
    }
    DecreaseItem = () => {
        this.setState(prevState => {
            if (prevState.quantity > 0) {
                return {
                    quantity: prevState.quantity - 1
                }
            } else {
                return null;
            }
        });
    }
    handleChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChangeLocation = () => {
        this.setState({ current: true });
    }

    handleEdit = async (comment) => {
        //this.setState({ currentCommentId: id, editText: content })
        let editComment = this.state.editComment
        let isEmptyObj = Object.keys(editComment).length === 0;
        let listCommentEdited = this.state.listComment;
        if (isEmptyObj === false && comment.id === editComment.id) {
            let objIndex = listCommentEdited.findIndex((item => item.id === comment.id));
            listCommentEdited[objIndex].content = editComment.content;
            this.setState({ listComment: listCommentEdited })
            this.setState({ editComment: {} })

            // let data = new FormData();
            // data.append('content', this.state.editText);
            // const res = await axios.put(`api/edit-comment/${id}`, data)
            // if (res.data.status === 200) {
            //     return;
            // }
            return;
        }
        this.setState({ editComment: comment })
    }

    ratingChanged = (newRating) => {
        console.log(newRating);
        this.setState({ star: newRating })
    };

    handleClick = async (category_slug, slug) => {
        window.scrollTo(0, 0);
        let res = await axios.get(`api/view-product/${category_slug}/${slug}`)
        if (res.data.status === 200) {
            this.setState({ productDetail: res.data.product, });
        }
        let productLike = await axios.get(`api/view-product-like/${category_slug}/${slug}`)
        if (productLike.data.status === 200) {
            this.setState({ productLike: productLike.data.productLike, loading: false });
        }
        this.props.history.replace(`/collections/${category_slug}/${slug}`)
    }

    loading(url) {
        this.props.history.replace(url);
    }

    handleComment = async (e, productId) => {
        e.preventDefault()
        let comment = this.state.comment;
        let data = new FormData();
        data.append('content', comment);
        data.append('productId', productId);
        data.append('star', this.state.star);

        const res = await axios.post(`api/add-comment`, data)
        if (res.data.status === 200) {
            console.log(res.data.message);
        }
        const result = await axios.get(`api/get-comment/${productId}`)
        if (result.data.status === 200) {
            this.setState({ listComment: result.data.data, comment: '' });
            this.ratingChanged(0);
        }
    }

    handleAddProduct = async (e, id) => {
        e.preventDefault();
        // const productId = id;
        // let data = new FormData();
        // data.append('product_id', productId);
        // data.append('product_qty', this.state.quantity);
        // const res = await axios.post(`/api/add-to-cart`, data);
        // if (res.data.status === 201) {
        //     Swal.fire({
        //         position: 'top-end',
        //         title: 'Đã thêm vào giỏ',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        //     this.props.incrementProduct()
        // }
        // else if (res.data.status === 409) {
        //     //Already Item in cart
        //     Swal.fire(
        //         'Cảnh báo!',
        //         res.data.message,
        //         'warning'
        //     );
        // }
        // else if (res.data.status === 401) {
        //cookies begin
        const { cookies } = this.props;
        if (!cookies.get("product")) {
            var str = id + '-' + this.state.quantity + '/';
            cookies.set("product", str, { path: "/" });
            Swal.fire({
                position: 'top-end',
                title: 'Đã thêm vào giỏ',
                showConfirmButton: false,
                timer: 1500
            })
            this.props.incrementProduct()

        }
        else {
            var arrayProduct = [];
            var productCookies = cookies.get("product");
            const productArray = productCookies.split("/");
            for (var i = 0; i < productArray.length; i++) {
                var item = productArray[i].split("-");
                arrayProduct.push(item[0]);
            }
            if (arrayProduct.includes(id.toString())) {
                var quantity;
                for (var i = 0; i < productArray.length; i++) {
                    var item = productArray[i].split("-");
                    if (item[0] == id) {
                        quantity = parseInt(item[1]) + this.state.quantity;
                        var productStr = id + '-' + quantity;
                        var productCookies = cookies.get("product");
                        productCookies = productCookies.replace(productArray[i], productStr);
                        cookies.set("product", productCookies, { path: "/" });
                    }
                }

                // arrayProduct.map((item) => {
                //     if (item == id) {
                //         console.log(item)

                //     }
                // })

                Swal.fire({
                    position: 'top-end',
                    title: 'Đã thêm vào giỏ',
                    showConfirmButton: false,
                    timer: 1500
                });

            }
            else {
                var currentListProductCookies = cookies.get("product");
                var result = currentListProductCookies + id + '-' + this.state.quantity + '/'
                cookies.set("product", result, { path: "/" });
                Swal.fire({
                    position: 'top-end',
                    title: 'Đã thêm vào giỏ',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.props.incrementProduct()
            }

        }
        // }
        // else if (res.data.status === 404) {
        //     Swal.fire(
        //         'Warning!',
        //         res.data.message,
        //         'warning'
        //     );
        // }
    }
    handleOnChangeComment = (event) => {
        let editCommmentCoppy = this.state.editComment
        editCommmentCoppy.content = event.target.value;
        this.setState({ editTodo: editCommmentCoppy })
    }
    handleDeleteComment = async (e, id, productId) => {
        e.preventDefault();
        const res = await axios.delete(`api/delete-comment/${id}`)
        if (res.data.status === 200) {
            console.log('ok');
        }
        const result = await axios.get(`api/get-comment/${productId}`)
        if (result.data.status === 200) {
            this.setState({ listComment: result.data.data, comment: '' });
            this.ratingChanged(0);
        }
    }
    render() {
        var img_path = "http://localhost:8000/img/"
        if (!this.state.loading) {
            var listImages = JSON.parse(this.state.productDetail.image)
        }
        // slider image product
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            cursor: "text",
        };
        let productLike = this.state.productLike
        let editComment = this.state.editComment;
        let isEmptyObj = Object.keys(editComment).length === 0;
        return <>
            <div>{this.state.current}</div>
            {!this.state.loading ?
                <>
                    <div className="py-2 bg-info">
                        <div className="container">
                            <h6 className="text-secondary">Danh Mục / {this.state.productDetail.category.catName} / {this.state.productDetail.productName} </h6>
                        </div>
                    </div>
                    <h2>Chi tiết sản phẩm: </h2>
                    <section className="section-content bg-white padding-y" key={this.state.productDetail.id}>
                        <div className="container">
                            <div className="row">
                                <aside className="col-md-7" style={{ width: "800px", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    <div className="card">
                                        <article className="gallery-wrap">
                                            <Slider arrows={true} {...settings}>
                                                <div>
                                                    <Link to="#" className="item-thumb"> <img src={img_path + listImages[1]} alt="null" /></Link>
                                                </div>
                                                <div>
                                                    <Link to="#" className="item-thumb"> <img src={img_path + listImages[2]} alt="null" /></Link>
                                                </div>
                                                <div>
                                                    <Link to="#" className="item-thumb"> <img src={img_path + listImages[3]} alt="null" /></Link>
                                                </div>
                                                <div>
                                                    <Link to="#" className="item-thumb"> <img src={img_path + listImages[4]} alt="null" /></Link>
                                                </div>
                                                <div>
                                                    <Link to="#" className="item-thumb"> <img src={img_path + listImages[5]} alt="null" /></Link>
                                                </div>
                                            </Slider>
                                        </article>
                                    </div>
                                    <div style={{ marginTop: "100px" }}>
                                        <LazyLoad offset={100} once>
                                            {this.state.productDetail.detail.indexOf('</') !== -1
                                                ? (
                                                    <div dangerouslySetInnerHTML={{ __html: this.state.productDetail.detail.replace(/(<? *script)/gi, 'illegalscript') }} >
                                                    </div>
                                                )
                                                : this.state.productDetail.detail
                                            }
                                        </LazyLoad>
                                    </div>
                                </aside>
                                <main className="col-md-4">
                                    <article className="product-info-aside">
                                        <h2 className="title mt-3">{this.state.productDetail.productName}</h2>
                                        <div className="mb-3">
                                            <var style={{ color: "red" }} className="price h4">{new Intl.NumberFormat().format(this.state.productDetail.salePrice)} vnd&nbsp;</var>
                                            <span className="text-muted">{new Intl.NumberFormat().format(this.state.productDetail.price)} vnd</span>
                                        </div>
                                        <div className="form-row  mt-4">
                                            <div className="form-group col-md flex-grow-0">
                                                <div className="input-group mb-3 input-spinner">
                                                    <div className="input-group-prepend">
                                                        <button className="btn btn-light" type="button" onClick={() => this.DecreaseItem(this.state.productDetail.quantity)} id="button-plus"> - </button>
                                                    </div>
                                                    <div className="form-control">{this.state.quantity}</div>
                                                    <div className="input-group-append">
                                                        <button className="btn btn-light" type="button" onClick={() => this.IncrementItem(this.state.productDetail.quantity)} id="button-minus"> + </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row  mt-4">
                                            {
                                                this.state.productDetail.specifications.indexOf('</') !== -1
                                                    ? (
                                                        <div dangerouslySetInnerHTML={{ __html: this.state.productDetail.specifications.replace(/(<? *script)/gi, 'illegalscript') }} >
                                                        </div>
                                                    )
                                                    : this.state.productDetail.specifications
                                            }

                                        </div>
                                        {
                                            this.state.productDetail.quantity >= 1 ? <>
                                                <div className="rating-wrap my-3">
                                                    <small className="label-rating text-success"> <i className="fa fa-clipboard-check"></i> Còn hàng </small>
                                                </div>
                                                <div className="form-group col-md">
                                                    <button href="#" className="btn  btn-primary" onClick={(e) => this.handleAddProduct(e, this.state.productDetail.id)}>
                                                        <i className="fas fa-shopping-cart"></i> <span className="text">Thêm vào giỏ</span>
                                                    </button>
                                                </div>
                                            </>
                                                : ''
                                        }
                                    </article>
                                </main>
                            </div>
                        </div>
                    </section>
                </> : ''
            }
            <LazyLoad offset={100} once>
                {productLike && productLike.length > 0 && <h2 >Sản phẩm liên quan</h2>}
                <div className="container">
                    <div className="row">
                        {productLike && productLike.length > 0 && productLike.map((item, index) => {

                            //var listImages = JSON.parse(item.image)
                            return (<>
                                <Product key={index} vote={item.vote} category_slug={item.category.slug} ram={item.ram} rom={item.rom} installment={item.installment} screen={item.screen} mass={item.mass} slug={item.slug} id={item.id} image={item.image} productName={item.productName} detail={item.detail} price={item.price} salePrice={item.salePrice} chip={item.chip} />
                            </>

                            )
                        })}
                    </div>
                </div>
            </LazyLoad>
            <LazyLoad offset={100} once>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            {this.state.loading ? '' : <>
                                <h4>Bình Luận</h4>
                                <ReactStars
                                    count={5}
                                    onChange={(newRating) => this.ratingChanged(newRating)}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                                <textarea rows="4" cols="70" placeholder="Nhập bình luận vào đây" name="comment" onChange={(event) => this.handleChangeInput(event)} value={this.state.comment}></textarea>
                                {this.state.comment === '' ? '' : <button type="button" onClick={(e) => this.handleComment(e, this.state.productDetail.id)} className="btn btn-success">Gửi</button>}
                                <div>{this.state.listComment && this.state.listComment.length > 0 &&
                                    this.state.listComment.map((item, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>{item.user.name}</h6>
                                                {item.star === 1 &&
                                                    <small ><OneStar /></small>
                                                }
                                                {item.star === 2 &&
                                                    <small ><TwoStar /></small>
                                                }
                                                {item.star === 3 &&
                                                    <small ><ThreeStar /></small>
                                                }
                                                {item.star === 4 &&
                                                    <small ><FourStar /></small>
                                                }
                                                {item.star === 5 &&
                                                    <small ><FiveStar /></small>
                                                }
                                                <p>{isEmptyObj ? item.content : <>
                                                    {this.state.editComment.id === item.id ? <span><textarea rows="3" cols="70" value={this.state.editComment.content} onChange={(event) => this.handleOnChangeComment(event)} /></span> :
                                                        <span>{item.content}</span>
                                                    }
                                                </>}</p>
                                                {/* {item.user.name === localStorage.getItem('auth_name') &&
                                                    <>
                                                        <button onClick={(e) => this.handleEdit(e, item)} style={{ border: 'none' }}><small>{isEmptyObj === true ? 'Sửa' : 'Lưu'}</small></button>
                                                        &nbsp;<button style={{ border: 'none' }} onClick={(e) => this.handleDeleteComment(e, item.id, this.state.productDetail.id)}><small >xóa</small></button></>} */}
                                                <p className="border-bottom mt-1"></p>
                                            </div>

                                        )
                                    })
                                }</div>
                            </>}

                        </div>

                    </div>
                </div>
            </LazyLoad>
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        dataRedux: state.countProductInCart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        incrementProduct: () => dispatch({ type: 'INCREMENT' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(withRouter(ProDetail)));