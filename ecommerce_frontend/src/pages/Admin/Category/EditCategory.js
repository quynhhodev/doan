import React from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { withRouter } from "react-router-dom";
class EditCategory extends React.Component {
    state = {
        catName: '',
        slug: '',
        parentId: '',
        description: '',
        popular: '',
        status: null,
        image: null,
        logo: null
    }
    async componentDidMount() {
        const catId = this.props.match.params.id;
        const res = await axios.get(`http://localhost:8000/api/edit-category/${catId}`);
        if (res.status === 200) {
            this.setState({
                catName: res.data.data.catName,
                slug: res.data.data.slug,
                parentId: res.data.data.parentId,
                description: res.data.data.description,
                popular: res.data.data.popular,
                status: res.data.data.status,
            })
        }
    }
    handleChangeInput = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })

    }
    handleChangeSelect = (e) => {
        this.setState({ status: e.target.value });
    }

    handleChangeLogo = async (event) => {
        let data = event.target.files;
        let file = data[0];
        this.setState({
            logo: file,
        })
    }
    handleChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        this.setState({
            image: file,
            image_name: file.name
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        const catId = this.props.match.params.id;
        var data = new FormData();
        data.append('catName', this.state.catName);
        data.append('slug', this.state.slug);
        data.append('parentId', this.state.parentId);
        data.append('description', this.state.description);
        data.append('popular', this.state.popular);
        data.append('image', this.state.image);
        data.append('logo', this.state.logo);
        data.append('status', this.state.status);
        let res = await axios.post(`http://localhost:8000/api/update-category/${catId}`, data);
        if (res.status === 200) {
            console.log(res.data.message);
            Swal.fire(
                'Thành công!',
                res.data.message,
                'success'
            )
            this.props.history.push('/admin/categories');
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
                <h1>Sửa</h1>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group md-3">
                        <lable>Tên Danh Mục</lable>
                        <input type="text" name="catName" onChange={(event) => this.handleChangeInput(event)} value={this.state.catName} className="form-control" />
                    </div>
                    <div className="form-group md-3">
                        <lable>Đường Dẫn</lable>
                        <input type="text" name="slug" onChange={(event) => this.handleChangeInput(event)} value={this.state.slug} className="form-control" />
                    </div>
                    <div className="form-group md-3">
                        <lable>Danh Mục Cha</lable>
                        <input type="text" name="parentId" onChange={(event) => this.handleChangeInput(event)} value={this.state.parentId} className="form-control" />
                    </div>
                    <div className="form-group md-3">
                        <lable>Mô Tả</lable>
                        <CKEditor
                            name="description"
                            editor={ClassicEditor}
                            data={this.state.description}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                this.setState({ description: data })
                                console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </div>
                    <div className="form-group md-3">
                        <lable>Phổ Biến</lable>
                        <select class="form-select" aria-label="Default select example" onChange={(e) => this.handleChangeInput(e)} name="popular" >
                            {this.state.popular === 1 ? <><option selected value="1">Phổ biến</option>
                                <option value="0">Không phổ biến</option></> : <><option value="1">Phổ biến</option>
                                <option selected value="0">Không phổ biến</option></>}
                        </select>
                    </div>
                    <div className="form-group md-3">
                        <lable>Logo</lable>
                        <input type="file" name="logo" onChange={(event) => this.handleChangeLogo(event)} className="form-control" />
                    </div>
                    <div className="form-group md-3">
                        <lable>Ảnh</lable>
                        <input type="file" name="image" onChange={(event) => this.handleChangeImage(event)} className="form-control" />

                    </div>
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
                    <button type="submit" class="btn btn-primary">Sửa</button>
                </form>


            </>
        );
    }
}

export default withRouter(EditCategory);