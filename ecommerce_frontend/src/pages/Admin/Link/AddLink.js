import axios from "axios";
import React from "react";
import Swal from 'sweetalert2';
class AddLink extends React.Component {
    state = {
        title: '',
        position: '',
        url: '',
        image: '',
        status: '1',
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
        data.append('title', this.state.title);
        data.append('position', this.state.position);
        data.append('url', this.state.url);
        data.append('image', this.state.image);
        data.append('status', this.state.status);

        const res = await axios.post('api/add-link', data);
        if (res.data.status === 200) {
            Swal.fire(
                'Thành công!',
                res.data.message,
                'success'
            )
            this.setState({
                title: '',
                position: '',
                url: '',
                order: '',
                status: '',
            })
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
                <div><h1>Đường Dẫn</h1></div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group md-3">
                        <lable>Tên Hiển Thị</lable>
                        <input type="text" name="title" onChange={(event) => this.handleChangeInput(event)} value={this.state.title} className="form-control" />
                        <span className="text-danger">{this.state.error_list.title ? "truong nay la bat buoc" : ''}</span>
                    </div>
                    <div className="form-group md-3">
                        <lable>Vị Trí</lable>
                        <input type="text" name="position" onChange={(event) => this.handleChangeInput(event)} value={this.state.position} className="form-control" />
                        <span className="text-danger">{this.state.error_list.position}</span>
                    </div>
                    <div className="form-group md-3">
                        <lable>Đường Dẫn (URL)</lable>
                        <input type="text" name="url" onChange={(event) => this.handleChangeInput(event)} value={this.state.url} className="form-control" />
                        <span className="text-danger">{this.state.error_list.link}</span>
                    </div>
                    <div className="form-group md-3">
                        <lable>Hình ảnh</lable>
                        <input type="file" name="image" onChange={(event) => this.handleChangeImage(event)} className="form-control" />
                        <span className="text-danger">{this.state.error_list.order}</span>
                    </div>
                    <div className="form-group md-3">
                        <lable>Trạng Thái</lable>
                        <select class="form-select" aria-label="Default select example" onChange={(event) => this.handleChangeInput(event)} name="status">
                            <option selected value="1">Hiện</option>
                            <option value="0">Ẩn</option>
                        </select>
                        <span className="text-danger">{this.state.error_list.status}</span>
                    </div>

                    <button type="submit" class="btn btn-primary">Tạo</button>
                </form>
            </>
        );

    }
}

export default AddLink;