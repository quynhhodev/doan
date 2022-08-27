import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
class CommentList extends React.Component {
    state = {
        listComment: [],
        loading: true,
        currentPage: 1,
        newsPerPage: 5
    }
    async componentDidMount() {
        const res = await axios.get('api/comments');
        if (res.data.status === 200) {
            this.setState({ listComment: res.data.data, loading: false })
        }


    }
    chosePage = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    handleDelete = async (e, id) => {
        e.preventDefault();
        const theShy = e.currentTarget;
        //
        Swal.fire({
            title: 'Xóa vĩnh viễn?',
            text: "Bạn không thể lấy lại nó!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa vĩnh viễn!',
            cancelButtonText: 'Hủy!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                //const res = await axios.delete(`/api/delete-product/${id}`);
                const res = await axios.delete(`api/delete-comment/${id}`);
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
        let HTML = "";
        const currentPage = this.state.currentPage;
        const newsPerPage = this.state.newsPerPage;
        const indexOfLastNews = currentPage * newsPerPage;
        const indexOfFirstNews = indexOfLastNews - newsPerPage;
        const listComment = this.state.listComment.slice(indexOfFirstNews, indexOfLastNews);
        HTML = listComment.map((item, index) => {
            return <tr key={index}>
                <th scope="row">{index + 1 + (currentPage - 1) * newsPerPage}</th>

                <td>{item.product.productName}</td>
                <td>{item.user.name}</td>
                <td>{item.content}</td>
                <td>{item.star}</td>
                <td>
                    <button onClick={(e) => this.handleDelete(e, item.id)}><i className="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        })
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.listComment.length / newsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (<>
            <h2>Danh sách bình luận</h2>
            {
                this.state.loading ?
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <h2>Chưa có bình luận nào</h2>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div> :
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Tên Sản Phẩm</th>
                                            <th scope="col">Người bình luận</th>
                                            <th scope="col">Nội dung</th>
                                            <th scope="col">Sao</th>
                                            <th scope="col">Xóa</th>
                                            {/* <th scope="col">Chi Tiết</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {HTML}
                                    </tbody>
                                </table>
                                {/* Pagination custom Begin */}
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
                                {/* Pagination custom End */}
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
            }
        </>

        );

    }
}
export default CommentList;