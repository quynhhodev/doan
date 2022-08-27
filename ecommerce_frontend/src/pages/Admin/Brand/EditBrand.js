import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
class EditBrand extends React.Component {
    state = {
        brandName: '',
        slug: '',
        description: '',
        status: '',
    }
    async componentDidMount() {
        const brandId = this.props.match.params.id;
        const res = await axios.get(`api/edit-brand/${brandId}`);
        console.log(res);
        if (res.status === 200) {

            this.setState({
                brandName: res.data.data.brandName,
                slug: res.data.data.slug,
                description: res.data.data.description,
                status: res.data.data.status,
            })
        }
    }

    handleChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const brandId = this.props.match.params.id;
        let data = new FormData();
        data.append('brandName', this.state.brandName);
        data.append('slug', this.state.slug);
        data.append('description', this.state.description);
        data.append('status', this.state.status);
        console.log(data);
        var res = await axios.post(`api/update-brand/${brandId}`, data);
        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Successfully',
                text: res.data.message
            })
            this.props.history.push('/admin/brands')
        }

    }
    render() {

        return (
            <>
                <div><h1>Chỉnh Sửa Thương Hiệu</h1></div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group md-3">
                        <lable>Tên</lable>
                        <input type="text" name="brandName" onChange={(event) => this.handleChangeInput(event)} value={this.state.brandName} className="form-control" />
                    </div>
                    <div className="form-group md-3">
                        <lable>Đường Dẫn</lable>
                        <input type="text" name="slug" onChange={(event) => this.handleChangeInput(event)} value={this.state.slug} className="form-control" />
                    </div>
                    <div className="form-group md-3">
                        <lable>Mô Tả</lable>
                        <input type="text" name="description" onChange={(event) => this.handleChangeInput(event)} value={this.state.description} className="form-control" />
                    </div>
                    <div className="form-group md-3">
                        <lable>Trạng Thái</lable>
                        <select class="form-select" aria-label="Default select example" onChange={(e) => this.handleChangeInput(e)} name="status" >
                            {this.state.status === 1 ? <><option selected value="1">Hiện</option>
                                <option value="0">Ẩn</option></> : <><option value="1">Hiện</option>
                                <option selected value="0">Ẩn</option></>}
                        </select>
                    </div>

                    <button type="submit" class="btn btn-primary">Sửa</button>
                </form>
            </>
        );

    }
}
export default withRouter(EditBrand);