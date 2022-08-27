import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from "react-router-dom";
class LinkTrash extends React.Component {
    state = {
        listLink: [],
        currentPage: 1,
        newsPerPage: 5
    }
    async componentDidMount() {
        var res = await axios.get('api/link-in-trash');
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
                axios.delete(`api/delete-link/${id}`).then((res) => {
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
    handleRestore = async (e, id) => {
        e.preventDefault();
        const res = await axios.get(`api/link-restore/${id}`);
        if (res.data.status === 200) {
            Swal.fire(
                'Thành công!',
                res.data.message,
                'success'
            );
        }
        this.props.history.push('/admin/links');

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
                    <td><button onClick={(e) => this.handleRestore(e, item.id)} className="btn btn-success btn-sm">Khôi phục</button> <button onClick={(e) => this.handleDelete(e, item.id)} className="btn btn-danger btn-sm">Xóa</button></td>
                </tr>
            </>)
        })
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
        </>);
    }
}

export default withRouter(LinkTrash);