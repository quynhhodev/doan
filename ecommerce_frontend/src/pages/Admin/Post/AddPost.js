import axios from "axios";
import React from "react";
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { withRouter } from "react-router-dom";


class AddPost extends React.Component {
    state = {
        title: '',
        slug: '',
        content: '',
        image: null,
        status: 1,
        error_list: [],
    }

    handleChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        this.setState({
            image: file,
        })
    }
    handleChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        let data = new FormData();
        data.append('title', this.state.title);
        data.append('slug', this.state.slug);
        data.append('image', this.state.image);
        data.append('content', this.state.content);
        data.append('status', this.state.status);
        const res = await axios.post('api/add-post', data);
        if (res.data.status === 200) {
            console.log(res.data.data)
            Swal.fire(
                'Thanh cong!',
                res.data.message,
                'success'
            );
            this.props.history.push('/admin/posts');
        }
        else {
            this.setState({
                error_list: res.data.error_list
            })
        }
    }
    render() {
        return (
            <>
                <div><h1>Bài viết</h1></div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group md-3">
                                    <lable>Tiêu Đề</lable>
                                    <input type="text" name="title" onChange={(event) => this.handleChangeInput(event)} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.title}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Đường Dẫn</lable>
                                    <input type="text" name="slug" onChange={(event) => this.handleChangeInput(event)} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.slug}</span>
                                </div>
                                <div className="form-group md-3">
                                    <lable>Ảnh</lable>
                                    <input type="file" name="image" onChange={(event) => this.handleChangeImage(event)} className="form-control" />
                                    <span className="text-danger">{this.state.error_list.image}</span>
                                </div>

                                <div className="form-group md-3">
                                    <lable>Nội Dung</lable>
                                    <CKEditor name="detail" editor={ClassicEditor}
                                        data={this.state.content}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.

                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            this.setState({ content: data })

                                        }} />
                                    <span className="text-danger">{this.state.error_list.content}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
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

export default withRouter(AddPost);