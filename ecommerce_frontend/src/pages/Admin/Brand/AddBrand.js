import axios from "axios";
import React from "react";
import Swal from 'sweetalert2';
import { withRouter } from "react-router-dom";
class AddBrand extends React.Component {
    state = {
        brandName: '',
        slug: '',
        description: '',
        status: '1',
        image: null,
        error_list: []
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

    handleSubmit = async (event) => {
        event.preventDefault();
        let data = new FormData();
        data.append('brandName', this.state.brandName);
        data.append('image', this.state.image);
        data.append('slug', this.state.slug);
        data.append('description', this.state.description);
        data.append('status', this.state.status);

        const res = await axios.post('http://localhost:8000/api/add-brand', data);
        if (res.data.status === 200) {
            Swal.fire(
                'Thành công!',
                res.data.message,
                'success'
            )
            this.props.history.push('/admin/brands');
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
                <div><h1>Thương Hiệu</h1></div>
                <form onSubmit={(e) => this.handleSubmit(e)}>

                    <div className="form-group md-3">
                        <lable>Tên</lable><lable className="text-danger">*</lable>
                        <input type="text" name="brandName" onChange={(event) => this.handleChangeInput(event)} value={this.state.brandName} className="form-control" />
                        <span className="text-danger">{this.state.error_list.brandName}</span>
                    </div>
                    <div className="form-group md-3">
                        <lable>Đường Dẫn (slug)</lable><lable className="text-danger">*</lable>
                        <input type="text" name="slug" onChange={(event) => this.handleChangeInput(event)} value={this.state.slug} className="form-control" />
                        <span className="text-danger">{this.state.error_list.slug}</span>
                    </div>
                    <div className="form-group md-3">
                        <lable>Mô Tả</lable><lable className="text-danger">*</lable>
                        <input type="text" name="description" onChange={(event) => this.handleChangeInput(event)} value={this.state.description} className="form-control" />
                        <span className="text-danger">{this.state.error_list.description}</span>
                    </div>
                    <div className="form-group md-3">
                        <lable>Ảnh</lable>
                        <input type="file" name="image" onChange={(event) => this.handleChangeImage(event)} className="form-control" />
                        <span className="text-danger">{this.state.error_list.image}</span>
                    </div>
                    <div className="form-group md-3">
                        <lable>Trạng Thái</lable>
                        <select className="form-select" aria-label="Default select example" onChange={(e) => this.handleChangeInput(e)} name="status" >
                            <option selected defaultValue="1">Hiện</option>
                            <option value="0">Ẩn</option>
                            <option value="2">Trang Chủ</option>
                        </select>
                        <span className="text-danger">{this.state.error_list.status ? "trường này là bắt buộc" : ''}</span>
                    </div>
                    <button type="submit" className="btn btn-primary">Tạo</button>
                </form>
            </>
        );
    }
}

export default withRouter(AddBrand);