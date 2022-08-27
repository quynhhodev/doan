import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
class ProductList extends React.Component {
    state = {
        listProduct: [],
        //pagination
        currentPage: 1,
        newsPerPage: 5,
        strSearch: '',
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
        var res = await axios.get('http://localhost:8000/api/products');
        if (res.status === 200) {
            this.setState({ listProduct: res.data.data })
        }
    }

    handleChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSearch = async (e) => {
        e.preventDefault();

        const res = await axios.get(`api/product-search?str=${this.state.strSearch}`);
        if (res.data.status === 200) {
            this.setState({ listProduct: res.data.data })
        }
    }

    handleDelete = async (e, id) => {
        const theShy = e.currentTarget;
        //
        Swal.fire({
            title: 'Đưa vào giỏ rác?',
            text: "Bạn chắc chắn!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa!',
            cancelButtonText: 'Hủy!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                //const res = await axios.delete(`/api/delete-product/${id}`);
                const res = await axios.delete(`/api/product-to-trash/${id}`);
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
                <td>{item.category.catName}</td>
                {/* <td>{item.catName}</td> */}
                <td>{item.quantity}</td>
                {/* <td>{item.shortDetail.indexOf('</') !== -1
                    ? (
                        <div dangerouslySetInnerHTML={{ __html: item.shortDetail.replace(/(<? *script)/gi, 'illegalscript') }} >
                        </div>
                    )
                    : item.shortDetail
                }</td> */}
                <td>{item.price}</td>
                <td>{item.salePrice}</td>
                <td><img src={img_path + listImages[0]} style={{ width: '40px', height: '40px' }} alt="..." /></td>
                <td>{item.popular === 1 ? 'Phổ biến' : 'Không phổ biến'}</td>
                <td>{item.status === 1 && 'Hiện'}{item.status === 2 && 'Trang chủ'}{item.status === 0 && 'Ẩn'}</td>
                <td><Link to={`/admin/edit-product/${item.id}`} className="btn btn-success btn-sm">Sửa</Link></td>
                <td><button onClick={(e) => this.handleDelete(e, item.id)} className="btn btn-danger btn-sm">Xóa</button></td>
            </tr>;
        });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.listProduct.length / newsPerPage); i++) {
            pageNumbers.push(i);
        }
        //pagination end


        return (<>
            <h2>Sản Phẩm</h2>
            <div>
                {/* <select style={{ display: 'inline', width: '100px', marginLeft: '600px' }} onChange={(event) => this.handleChangeInput(event)} name='searchType' class="form-select d-md-inline-block" aria-label="Default select example">
                    <option selected value="phone">Số điện thoại</option>
                    <option value="email">Email</option>
                </select> */}
                <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2  my-md-0 ">
                    <div style={{ marginLeft: '700px' }} className="input-group d-flex justify-content-end">
                        <input className="form-control" type="text" name="strSearch" placeholder="Search for..." onChange={(event) => this.handleChangeInput(event)} aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button onClick={(e) => this.handleSearch(e)} className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên Sản Phẩm</th>
                        <th scope="col">Đường Dẫn</th>
                        <th scope="col">Tên Danh Mục</th>
                        <th scope="col">Số Lượng </th>
                        {/* <th scope="col">Chi Tiết</th> */}
                        <th scope="col">Giá</th>
                        <th scope="col">Giá Ưu Đãi</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Phổ Biến?</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">Sửa</th>
                        <th scope="col">Xóa</th>
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
        </>);
    }
}

export default ProductList;