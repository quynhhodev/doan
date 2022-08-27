import React from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { withRouter } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
class AddCategory extends React.Component {
    state = {
        catName: '',
        slug: '',
        image: null,
        parentId: '',
        description: '',
        popular: 0,
        status: 1,
        error_list: [],
        logo: null

    }

    handleChangeInput = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })

    }

    handleChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        this.setState({
            image: file,
        })
    }
    handleChangeLogo = async (event) => {
        let data = event.target.files;
        let file = data[0];
        this.setState({
            logo: file,
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        var data = new FormData();
        data.append('catName', this.state.catName);
        data.append('slug', this.state.slug);
        data.append('image', this.state.image);
        data.append('logo', this.state.logo);
        data.append('parentId', this.state.parentId);
        data.append('description', this.state.description);
        data.append('popular', this.state.popular);
        data.append('status', this.state.status);
        let res = await axios.post('http://localhost:8000/api/create-category', data);
        if (res.data.status === 200) {
            this.setState({
                catName: '',
                slug: '',
                parentId: '',
                description: '',
                popular: '',
                status: ''
            })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: res.data.data,
                showConfirmButton: true,
                timer: 1500
            })
            this.props.history.push('/admin/categories');
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
                <h1>Danh Mục</h1>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10">
                                <div className="form-group md-3">
                                    <lable>Tên</lable>
                                    <input type="text" name="catName" onChange={(event) => this.handleChangeInput(event)} value={this.state.catName} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.catName}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Đường Dẫn</lable>
                                    <input type="text" name="slug" onChange={(event) => this.handleChangeInput(event)} value={this.state.slug} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.slug}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Danh Mục Cha</lable>
                                    <input type="text" name="parentId" onChange={(event) => this.handleChangeInput(event)} value={this.state.parentId} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.parentId}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Mô Tả</lable>
                                    {/* <input type="text" name="description" onChange={(event) => this.handleChangeInput(event)} value={this.state.description} className="form-control" /> */}
                                    <CKEditor name="description" editor={ClassicEditor}
                                        data={this.state.description}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            this.setState({ description: data })
                                            console.log({ event, editor, data });
                                        }} />
                                    <span className="text-danger">{this.state.error_list.description}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Phổ Biến?</lable>
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => this.handleChangeInput(e)} name="popular" >
                                        <option value="1">Phổ biến</option>
                                        <option selected value="0">Không phổ biến</option>
                                    </select>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Logo</lable>
                                    <input type="file" name="logo" onChange={(event) => this.handleChangeLogo(event)} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.logo}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Ảnh</lable>
                                    <input type="file" name="image" onChange={(event) => this.handleChangeImage(event)} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.image}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Trạng Thái</lable>
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => this.handleChangeInput(e)} name="status" >
                                        <option selected value="2">Trang Chủ</option>
                                        <option selected value="1">Hiện</option>
                                        <option value="0">Ẩn</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Tạo</button>
                </form>


            </>
        )
    }
}


export default withRouter(AddCategory);