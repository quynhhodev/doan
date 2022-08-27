import React from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { withRouter } from "react-router-dom";
class EditPost extends React.Component {
    state = {
        title: '',
        slug: '',
        content: '',
        status: null,
        image: null,
    }
    async componentDidMount() {
        const catId = this.props.match.params.id;
        const res = await axios.get(`http://localhost:8000/api/edit-post/${catId}`);
        if (res.data.status === 200) {

            this.setState({
                title: res.data.data.title,
                slug: res.data.data.slug,
                content: res.data.data.content,
                status: res.data.data.status,
            })
        }
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
        event.preventDefault()
        const catId = this.props.match.params.id;
        var data = new FormData();
        data.append('title', this.state.title);
        data.append('slug', this.state.slug);
        data.append('image', this.state.image);
        data.append('content', this.state.content);
        data.append('status', this.state.status);
        let res = await axios.post(`http://localhost:8000/api/update-post/${catId}`, data);
        if (res.status === 200) {
            Swal.fire(
                'Thành công',
                res.data.message,
                'success'
            )
            this.props.history.push('/admin/posts');
        }
        else {
            Swal.fire(
                'Update fail!',
                'error'
            )
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
                                    <input type="text" name="title" onChange={(event) => this.handleChangeInput(event)} value={this.state.title} className="form-control" />

                                </div>
                                <div className="form-group md-3">
                                    <lable>Đường Dẫn</lable>
                                    <input type="text" name="slug" onChange={(event) => this.handleChangeInput(event)} value={this.state.slug} className="form-control" />

                                </div>
                                <div className="form-group md-3">
                                    <lable>Ảnh</lable>
                                    <input type="file" name="image" onChange={(event) => this.handleChangeImage(event)} className="form-control" />

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

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group md-3">
                                    <lable>Trạng Thái</lable>
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => this.handleChangeInput(e)} name="status" >
                                        {this.state.status == 1 && <><option selected value="1">Hiện</option>
                                            <option value="0">Ẩn</option><option value="2">Trang Chủ</option></>}
                                        {this.state.status == 2 && <><option value="1">Hiện</option>
                                            <option value="0">Ẩn</option><option selected value="2">Trang Chủ</option></>}
                                        {this.state.status == 0 && <><option value="1">Hiện</option>
                                            <option selected value="0">Ẩn</option><option value="2">Trang Chủ</option></>}
                                    </select>

                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Sửa</button>
                    </div>
                </form>
            </>
        );
    }
}

export default withRouter(EditPost);