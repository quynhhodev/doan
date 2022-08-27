import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from "react-router-dom";
class ProductTrash extends React.Component {
    state = {
        listProduct: [],
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
        var res = await axios.get('api/product-in-trash');
        if (res.status === 200) {
            this.setState({ listProduct: res.data.data })
        }
    }
    handleDelete = async (e, id) => {
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
                const res = await axios.delete(`/api/delete-product/${id}`);
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

    handleRestore = async (e, id) => {
        e.preventDefault();
        const res = await axios.get(`api/product-restore/${id}`);
        if (res.data.status === 200) {
            Swal.fire(
                'Thành công!',
                res.data.message,
                'success'
            );
        }
        this.props.history.push('/admin/products');

    }


    render() {
        let HTML = '';
        var img_path = "http://localhost:8000/img/";
        //pagination begin
        const currentPage = this.state.currentPage;
        const newsPerPage = this.state.newsPerPage;
        const indexOfLastNews = currentPage * newsPerPage;
        const indexOfFirstNews = indexOfLastNews - newsPerPage;
        const currentTodos = this.state.listProduct.slice(indexOfFirstNews, indexOfLastNews);
        HTML = currentTodos.map((item, index) => {
            const listImages = JSON.parse(item.image)
            return <tr key={index}>
                <th scope="row">{index + 1 + (currentPage - 1) * newsPerPage}</th>
                <td>{item.productName}</td>
                <td>{item.slug}</td>
                {/* relationships categories table by category funtion */}
                {/* <td>{item.category.catName}</td> */}
                <td>{item.category.catName}</td>
                <td>{item.brandName}</td>
                <td>{item.shortDetail.indexOf('</') !== -1
                    ? (
                        <div dangerouslySetInnerHTML={{ __html: item.shortDetail.replace(/(<? *script)/gi, 'illegalscript') }} >
                        </div>
                    )
                    : item.shortDetail
                }</td>
                <td>{item.price}</td>
                <td>{item.salePrice}</td>
                <td><img src={img_path + listImages[0]} style={{ width: '40px', height: '40px' }} alt="..." /></td>
                <td>{item.popular === 1 ? 'Phổ biến' : 'Không phổ biến'}</td>
                <td>{item.status === 1 ? 'Hiện' : 'Ẩn'}</td>
                <td><button onClick={(e) => this.handleRestore(e, item.id)} className="btn btn-success btn-sm">Khôi phục</button></td>
                <td><button onClick={(e) => this.handleDelete(e, item.id)} className="btn btn-danger btn-sm">Xóa</button></td>
            </tr>;
        });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.listProduct.length / newsPerPage); i++) {
            pageNumbers.push(i);
        }
        //pagination end


        return (<>
            <div className="container">
                <h2>Giỏ Rác</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên Sản Phẩm</th>
                            <th scope="col">Đường Dẫn</th>
                            <th scope="col">Tên Danh Mục</th>
                            <th scope="col">Tên Thương Hiệu</th>
                            <th scope="col">Chi Tiết</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Giá Ưu Đãi</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Phổ Biến?</th>
                            <th scope="col">Trạng Thái</th>
                            <th scope="col">Khôi Phục</th>
                            <th scope="col">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {HTML}
                    </tbody>
                </table>
                {/* Pagination custom Begin */}
                <div className="row">
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
                    {/* <div className="news-per-page col-md-6">
                    <label>Số lượng hiển thị: </label>
                    <select defaultValue="0" onChange={this.select} >
                        <option value="0" disabled>5</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                    </select>
                </div> */}
                </div>
                {/* Pagination custom End */}
            </div>
        </>);
    }
}

export default withRouter(ProductTrash);