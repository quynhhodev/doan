import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
class PostList extends React.Component {
    state = {
        listCat: [],
        loading: true,
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
        var res = await axios.get('http://localhost:8000/api/posts');
        if (res.status === 200) {
            this.setState({ listCat: res.data.data })
        }
    }
    handleDelete = (e, id) => {
        const theShy = e.currentTarget;
        Swal.fire({
            title: 'Xác nhận?',
            text: "Bạn sẽ không thể khôi phục bài viết này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Chấp nhận xóa!',
            cancelButtonText: 'Hủy!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`api/delete-post/${id}`).then((res) => {
                    if (res.data.status === 200) {
                        console.log(res);
                    }
                })
                theShy.closest("tr").remove();
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }


    render() {
        let HTML = '';
        const currentPage = this.state.currentPage;
        const newsPerPage = this.state.newsPerPage;
        const indexOfLastNews = currentPage * newsPerPage;
        const indexOfFirstNews = indexOfLastNews - newsPerPage;
        const currentTodos = this.state.listCat.slice(indexOfFirstNews, indexOfLastNews);
        HTML = currentTodos.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1 + (currentPage - 1) * newsPerPage}</th>
                    <td>{item.title}</td>
                    <td>{item.slug}</td>
                    <td>{item.image}</td>
                    {/* <td>{item.description}</td> */}
                    <td>{item.status === 1 && 'Hiện'}{item.status === 2 && 'Trang Chủ'}{item.status === 0 && 'Ẩn'}</td>
                    <td><Link to={`/admin/edit-post/${item.id}`}>Sửa</Link></td>
                    <td><button onClick={(e) => this.handleDelete(e, item.id)} className="btn btn-danger btn-sm" >Xóa</button></td>
                </tr>
            )
        })
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.listCat.length / newsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (<>
            <h2>Bài viết</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên bài viết</th>
                        <th scope="col">Đường Dẫn</th>
                        <th scope="col">Hình</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">Sửa</th>
                        <th scope="col">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.listCat && this.state.listCat.length > 0 ? HTML : <h1>Đang Tải</h1>}
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

export default PostList;