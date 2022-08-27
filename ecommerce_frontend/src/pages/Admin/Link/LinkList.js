import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
class LinkList extends React.Component {
    state = {
        listLink: [],
        currentPage: 1,
        newsPerPage: 5
    }
    async componentDidMount() {
        var res = await axios.get('/api/links');
        if (res.status === 200) {
            this.setState({ listLink: res.data.data })
        }
    }
    chosePage = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    handleDelete = (e, id) => {
        const theShy = e.currentTarget;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`api/link-to-trash/${id}`).then((res) => {
                    if (res.data.status === 200) {
                        console.log(res);
                    }
                })
                theShy.closest("tr").remove();
                Swal.fire(
                    'OK!',
                    'Xóa Thành Công.',
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
        const currentTodos = this.state.listLink.slice(indexOfFirstNews, indexOfLastNews);
        HTML = currentTodos.map((item, index) => {
            return (<>
                <tr key={index}>
                    <th scope="row">{index + 1 + (currentPage - 1) * newsPerPage}</th>
                    <td>{item.title}</td>
                    <td>{item.link}</td>
                    <td>{item.position}</td>
                    <td>{item.order}</td>
                    <td>{item.status === 1 ? 'Hiện' : 'Ẩn'}</td>
                    <td><Link to={`/admin/edit-link/${item.id}`}>Sửa</Link> <button onClick={(e) => this.handleDelete(e, item.id)} className="btn btn-danger btn-sm">Xóa</button></td>
                </tr>
            </>)
        })
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.listLink.length / newsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (<>
            <h2>Link</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên Hiển Thị</th>
                        <th scope="col">ĐƯờng Dẫn (URL)</th>
                        <th scope="col">Vị Trí</th>
                        <th scope="col">Chế Độ</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">Thao Tác</th>

                    </tr>
                </thead>
                <tbody>
                    {HTML}
                </tbody>
            </table>
            <div >
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
        </>);
    }
}

export default LinkList;