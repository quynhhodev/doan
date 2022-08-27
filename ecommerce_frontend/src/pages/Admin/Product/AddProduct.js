import axios from "axios";
import React from "react";
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { withRouter } from "react-router-dom";


class Product extends React.Component {
    state = {
        productName: '',
        catName: '',
        slug: '',
        brandName: '',
        detail: '',
        shortDetail: '',
        price: '',
        salePrice: '',
        image: null,
        status: 1,
        popular: false,
        categoryList: [],
        brandList: [],
        files: [],
        quantity: '',
        specifications: '',
        origin: '',
        error_list: [],
        ram: '',
        rom: '',
        installment: false,
        mass: '',
        graphicsCard: '',
        screen: '',
        chip: '',
        offers_gifts: false
    }

    async componentDidMount() {
        let res = await axios.get(`/api/all-categories`);
        if (res.status === 200) {
            console.log(res)
            this.setState({ categoryList: res.data.data, catName: res.data.data[0].id });
        }
        let brandList = await axios.get(`/api/all-brands`);
        if (brandList.status === 200) {
            console.log(brandList)
            this.setState({ brandList: brandList.data.data, brandName: brandList.data.data[0].id });
        }
    }

    // handleChange(value) {
    //     this.setState({ detail: value })
    // }

    handleChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.checked })
    }

    fileSelectedHandler = (e) => {
        this.setState({ files: [...this.state.files, ...e.target.files] });
    }
    // handleChangeImage = async (event) => {
    //     let data = event.target.files;
    //     let file = data[0];
    //     this.setState({
    //         image: file,
    //         image_name: file.name
    //     })
    // }
    handleSubmit = async (event) => {
        event.preventDefault();
        console.log('clicked')
        let data = new FormData();
        let files = this.state.files;
        files.forEach(file => {
            data.append("files[]", file);
        });
        data.append('productName', this.state.productName);
        data.append('catId', this.state.catName);
        data.append('slug', this.state.slug);
        data.append('brandId', this.state.brandName);
        data.append('specifications', this.state.specifications);
        data.append('detail', this.state.detail);
        data.append('shortDetail', this.state.shortDetail);
        data.append('price', this.state.price);
        data.append('salePrice', this.state.salePrice);
        data.append('quantity', this.state.quantity);
        data.append('origin', this.state.origin);
        data.append('popular', this.state.popular);
        data.append('installment', this.state.installment);
        data.append('ram', this.state.ram);
        data.append('rom', this.state.rom);
        data.append('screen', this.state.screen);
        data.append('graphicsCard', this.state.graphicsCard);
        data.append('mass', this.state.mass);
        data.append('chip', this.state.chip);
        data.append('status', this.state.status);
        data.append('offersGifts', this.state.offers_gifts);
        const res = await axios.post('api/add-product', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'boundary': '<calculated when request is sent>',
                'Accept': '*/*',
            }
        });
        if (res.data.status === 200) {
            console.log(res.data.data);
            Swal.fire(
                'Thành công!',
                res.data.data,
                'success'
            );
            //this.props.history.push('/admin/products');
        }
        else {
            this.setState({
                error_list: res.data.validation_errors
            })
        }
    }
    render() {

        return (
            <>
                <div><h1>Sản Phẩm</h1></div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group md-3">
                                    <lable>Tên Sản Phẩm</lable>
                                    <input type="text" name="productName" onChange={(event) => this.handleChangeInput(event)} value={this.state.productName} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.productName}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Đường Dẫn</lable>
                                    <input type="text" name="slug" onChange={(event) => this.handleChangeInput(event)} value={this.state.slug} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.slug}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Nơi Sản Xuất</lable>
                                    <input type="text" name="origin" onChange={(event) => this.handleChangeInput(event)} value={this.state.origin} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.origin}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Tên Danh Mục</lable>
                                    <select className="form-select" aria-label="Default select example" onChange={(event) => this.handleChangeInput(event)} name="catName">

                                        {this.state.categoryList && this.state.categoryList.length > 0 ?
                                            this.state.categoryList.map((item, index) => {
                                                return <><option value={item.id}>{item.catName}</option></>
                                            }) : <option value='0'>Đang tải...</option>}
                                    </select>
                                    <span className="text-danger">{this.state.error_list.catId}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Tên Thương Hiệu</lable>
                                    <select className="form-select" aria-label="Default select example" onChange={(event) => this.handleChangeInput(event)} name="brandName">
                                        {this.state.brandList && this.state.brandList.length > 0 ?
                                            this.state.brandList.map((item, index) => {
                                                return <><option value={item.id} key={index}>{item.brandName}</option></>
                                            }) : <option value='0'>Đang Tải</option>}
                                    </select>
                                    <span className="text-danger">{this.state.error_list.brandName}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Mô Tả Ngắn</lable>
                                    <CKEditor name="shortDetail" editor={ClassicEditor}
                                        data={this.state.shortDetail}
                                        onReady={editor => {
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            this.setState({ shortDetail: data })

                                        }} />
                                    <span className="text-danger">{this.state.error_list.shortDetail}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Chi Tiết</lable>
                                    <CKEditor name="detail" editor={ClassicEditor}
                                        data={this.state.detail}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.

                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            this.setState({ detail: data })

                                        }} />
                                    <span className="text-danger">{this.state.error_list.detail}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Thông Số Kĩ Thuật</lable>
                                    <CKEditor name="specifications" editor={ClassicEditor}
                                        data={this.state.specifications}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            this.setState({ specifications: data })
                                        }} />
                                    <span className="text-danger">{this.state.error_list.specifications}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable > Hình Ảnh</lable><br />
                                    <input type="file" id="files" multiple onChange={(e) => this.fileSelectedHandler(e)} />

                                    <span className="text-danger">{this.state.error_list.files}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group md-3">
                                    <lable>RAM</lable>
                                    <input type="text" name="ram" onChange={(event) => this.handleChangeInput(event)} value={this.state.ram} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.ram}</span>

                                </div>
                                <div className="form-group md-3">
                                    <lable>ROM</lable>
                                    <input type="text" name="rom" onChange={(event) => this.handleChangeInput(event)} value={this.state.rom} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.rom}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Màn Hình</lable>
                                    <input type="text" name="screen" onChange={(event) => this.handleChangeInput(event)} value={this.state.screen} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.ram}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Chíp</lable>
                                    <input type="text" name="chip" onChange={(event) => this.handleChangeInput(event)} value={this.state.chip} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.chip}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Card đồ họa</lable>
                                    <input type="text" name="graphicsCard" onChange={(event) => this.handleChangeInput(event)} value={this.state.graphicsCard} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.ram}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Trọng lượng</lable>
                                    <input type="text" name="mass" onChange={(event) => this.handleChangeInput(event)} value={this.state.mass} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.ram}</span>
                                </div>

                                <div className="form-group md-3">
                                    <lable>Giá</lable>
                                    <input type="text" name="price" onChange={(event) => this.handleChangeInput(event)} value={this.state.price} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.price}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Giá Ưu Đãi</lable>
                                    <input type="text" name="salePrice" onChange={(event) => this.handleChangeInput(event)} value={this.state.salePrice} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.salePrice}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Số Lượng</lable>
                                    <input type="text" name="quantity" onChange={(event) => this.handleChangeInput(event)} value={this.state.quantity} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.quantity}</span>
                                </div>
                                <div className="form-group md-3">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <lable>Trả Góp</lable>
                                            <div className="form-check col-md-4">
                                                <div className="form-check">
                                                    <input className="form-check-input" name='installment' type="checkbox" value="" id="flexCheckDefault" onChange={e => this.handleChange(e)} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        Có
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <lable>Phổ Biến</lable>
                                            <div className="form-check col-md-4">
                                                <div className="form-check">
                                                    <input className="form-check-input" name='popular' type="checkbox" value="" id="flexCheckDefaultco" onChange={e => this.handleChange(e)} />
                                                    <label className="form-check-label" for="flexCheckDefaultco">
                                                        Có
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <lable>Ưu đãi-Quà</lable>
                                            <div className="form-check col-md-4">
                                                <div className="form-check">
                                                    <input className="form-check-input" name='offers_gifts' type="checkbox" value="" id="flexCheckDefaultqu" onChange={e => this.handleChange(e)} />
                                                    <label className="form-check-label" for="flexCheckDefaultqu">
                                                        Có
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Trạng Thái</lable>
                                    <select className="form-select" aria-label="Default select example" onChange={(event) => this.handleChangeInput(event)} name="status">
                                        <option selected value="1">Hiện</option>
                                        <option value="0">Ẩn</option>
                                        <option value="2">Trang Chủ</option>
                                    </select>
                                    <span className="text-danger">{this.state.error_list.status}</span>
                                </div>


                            </div>

                        </div>
                        <button type="submit" className="btn btn-primary">Tạo</button>
                    </div>
                </form>
            </>
        );

    }
}

export default withRouter(Product);