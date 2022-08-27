import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
class EditLink extends React.Component {
    state = {
        title: '',
        position: '',
        url: '',
        image: '',
        status: '',
    }
    async componentDidMount() {
        const linkId = this.props.match.params.id;
        const res = await axios.get(`api/edit-link/${linkId}`);
        if (res.status === 200) {
            this.setState({
                title: res.data.data.title,
                position: res.data.data.position,
                url: res.data.data.url,
                image: res.data.data.image,
                status: res.data.data.status,
            })
        }
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
            image: file
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const linkId = this.props.match.params.id;
        let data = new FormData();
        data.append('title', this.state.title);
        data.append('position', this.state.position);
        data.append('url', this.state.url);
        data.append('image', this.state.image);
        data.append('status', this.state.status);
        console.log(data);
        var res = await axios.post(`api/update-link/${linkId}`, data);
        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Successfully',
                text: res.data.message
            })
            this.props.history.push('/admin/links')
        }

    }
    render() {
        return (
            <>
                <div><h1>Chỉnh Sửa </h1></div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group md-3">
                        <lable>Tên Hiển Thị</lable>
                        <input type="text" name="title" onChange={(event) => this.handleChangeInput(event)} value={this.state.title} className="form-control" />
                    </div>
                    <div className="form-group md-3">
                        <lable>Vị Trí</lable>
                        <input type="text" name="position" onChange={(event) => this.handleChangeInput(event)} value={this.state.position} className="form-control" />
                    </div>
                    <div className="form-group md-3">
                        <lable>Đường Dẫn (URL)</lable>
                        <input type="text" name="url" onChange={(event) => this.handleChangeInput(event)} value={this.state.url} className="form-control" />
                    </div>
                    <div className="form-group md-3">
                        <lable>Hình ảnh</lable>
                        <input type="file" name="image" onChange={(event) => this.handleChangeImage(event)} className="form-control" />

                    </div>
                    <div className="form-group md-3">
                        <lable>Trạng Thái</lable>
                        <select className="form-select" aria-label="Default select example" onChange={(e) => this.handleChangeInput(e)} name="status" >
                            {this.state.status === 1 ? <><option selected value="1">Hiện</option>
                                <option value="0">Ẩn</option></> : <><option value="1">Hiện</option>
                                <option selected value="0">Ẩn</option></>}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Sửa</button>
                </form>
            </>
        );

    }
}
export default withRouter(EditLink);