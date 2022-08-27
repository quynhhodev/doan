import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from "react-router-dom";
class BrandTrash extends React.Component {
    state = {
        listBrand: [],
        //pagination
        currentPage: 1,
        newsPerPage: 5
    }

    //pagination begin
    chosePage = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    select = (event) => {
        this.setState({
            newsPerPage: event.target.value
        })
    }
    //pagination end

    async componentDidMount() {
        var res = await axios.get('api/brand-in-trash');
        if (res.status === 200) {
            this.setState({ listBrand: res.data.data })
        }
    }

    handleRestore = async (e, id) => {
        e.preventDefault();
        const res = await axios.get(`api/brand-restore/${id}`);
        if (res.data.status === 200) {
            Swal.fire(
                'Thành công!',
                res.data.message,
                'success'
            );
        }
        this.props.history.push('/admin/brands');

    }
    handleDelete = async (e, id) => {
        const theShy = e.currentTarget;
        //
        Swal.fire({
            title: 'Chắc chắn xóa?',
            text: "Bạn sẽ không thể khôi phục mục này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác Nhận!',
            cancelButtonText: 'Hủy!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                //const res = await axios.delete(`/api/delete-product/${id}`);
                const res = await axios.delete(`/api/delete-brand/${id}`);
                if (res.data.status === 200) {
                    theShy.closest("tr").remove();
                    Swal.fire(
                        'Thành công!',
                        res.data.message,
                        'success'
                    )
                }
            }
        })
    }


    render() {
        let HTML = '';
        const currentPage = this.state.currentPage;
        const newsPerPage = this.state.newsPerPage;
        const indexOfLastNews = currentPage * newsPerPage;
        const indexOfFirstNews = indexOfLastNews - newsPerPage;
        const currentTodos = this.state.listBrand.slice(indexOfFirstNews, indexOfLastNews);
        HTML = currentTodos.map((item, index) => {
            return (<>
                <tr>
                    <th scope="row">{index + 1 + (currentPage - 1) * newsPerPage}</th>
                    <td>{item.brandName}</td>
                    <td>{item.slug}</td>
                    <td>{item.description}</td>
                    <td>{item.status === 1 ? 'Hiện' : 'Ẩn'}</td>
                    <td><button onClick={(e) => this.handleRestore(e, item.id)} className="btn btn-success btn-sm">Khôi phục</button>
                        <button onClick={(e) => this.handleDelete(e, item.id)} className="btn btn-danger btn-sm">Xóa</button></td>
                </tr>
            </>)
        })
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.listBrand.length / newsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (<>
            <h2>Thương Hiệu</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Đường Dẫn</th>
                        <th scope="col">Mô Tả</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">Thao Tác</th>

                    </tr>
                </thead>
                <tbody>
                    {this.state.listBrand && this.state.listBrand.length > 0 ? HTML : <h1>Đang Tải</h1>}
                </tbody>
            </table>
            {/* Pagination custom Begin */}
            <div>
                <div className="pagination-custom col-md-6">
                    <ul id="page-numbers">
                        {
                            pageNumbers.map(number => {
                                if (this.state.currentPage === number) {
                                    return (
                                        <li style={{ padding: "5px", listStyleType: "none", display: "inline-block" }} key={number} id={number} className="active">
                                            {number}
                                        </li>
                                    )
                                }
                                else {
                                    return (
                                        <li style={{ padding: "5px", listStyleType: "none", display: "inline-block" }} key={number} id={number} onClick={this.chosePage} >
                                            {number}
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>

            </div>
            {/* Pagination custom End */}
        </>);
    }
}

export default withRouter(BrandTrash);