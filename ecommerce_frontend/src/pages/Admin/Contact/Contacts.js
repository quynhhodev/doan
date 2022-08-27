import React from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
class Contacts extends React.Component {

    state = {
        loading: true,
        contactList: [],
        status: '',
        ischanged: true
    }
    sleep = (milliseconds = 2000) => new Promise(resolve => setTimeout(resolve, milliseconds))
    async componentDidMount() {
        const res = await axios.get(`api/contacts`);
        if (res.data.status === 200) {
            this.setState({ contactList: res.data.data, loading: false });
        }
    }
    handleChangeInput = async (event, id) => {

        this.setState({
            [event.target.name]: event.target.value,
            ischanged: false
        })
        await this.sleep(2000)
        this.handleUpdate(id, this.state.status);
        // if (this.state.ischanged === false) {
        //     var data = new FormData();
        //     data.append('status', this.state.status)
        //     const res = await axios.post(`api/edit-contact/${id}`, data);
        //     if (res.data.status === 200) {
        //         console.log(res.data.message)
        //     }
        // }


    }


    handleDeleteContact = async (e, id) => {
        const theShy = e.currentTarget;
        //
        Swal.fire({
            title: 'Xóa vĩnh viễn ?',
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
                const res = await axios.delete(`/api/delete-contact/${id}`);
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

    handleUpdate = async (id, status) => {
        var data = new FormData();
        data.append('status', status)
        const res = await axios.post(`api/edit-contact/${id}`, data);
        if (res.data.status === 200) {
            console.log(res.data.message)
        }
    }
    render() {
        let HTML = '';
        HTML = this.state.contactList.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.email}</td>
                    <td>{item.title}</td>
                    <td>{item.content}</td>
                    <td>

                        <select className="form-select" aria-label="Default select example" onChange={(event) => this.handleChangeInput(event, item.id)} name="status">
                            {item.status == 0 && <><option selected value="0">Chưa xử lý</option><option value="1">Đang xử lý</option>
                                <option value="2">Đã xong</option></>}
                            {item.status == 1 && <><option value="0">Chưa xử lý</option><option selected value="1">Đang xử lý</option>
                                <option value="2">Đã xong</option></>}
                            {item.status == 2 && <><option value="0">Chưa xử lý</option><option value="1">Đang xử lý</option>
                                <option selected value="2">Đã xong</option></>}
                        </select>
                    </td>
                    <td><button type="button" onClick={(e) => this.handleDeleteContact(e, item.id)} className="btn btn-danger">Xóa</button></td>
                </tr>
            )
        })
        return (<>
            <h2>Liên hệ</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tiêu đề</th>
                        <th scope="col">Nội dung</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {HTML}
                </tbody>
            </table>
        </>);
    }
}

export default Contacts;