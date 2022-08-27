import React from "react";
import axios from "axios";
class Contact extends React.Component {

    state = {
        title: '',
        content: '',
        message: '',
        error_list: []
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        var data = new FormData();
        data.append('title', this.state.title);
        data.append('content', this.state.content);
        const res = await axios.post(`api/contact`, data);
        if (res.data.status === 200) {
            this.setState({ title: '', content: '', message: res.data.message });
        }
        else {
            this.setState({
                error_list: res.data.validation_errors
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">

                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h2>Liên Hệ</h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={(e) => this.handleSubmit(e)}>
                                    <div><p>Đội ngũ hỗ trợ luôn trực 24/7 để có thể giải đáp bất kì thắc mắc nào của anh/chị. Liên hệ ngay để được hỗ trợ nhanh nhất.</p><br /></div>
                                    <div>
                                        <p>Bạn muốn giải quyết về vấn đề?</p>
                                        <textarea rows="1" cols="70" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)}></textarea>
                                        <span className="text-danger">{this.state.error_list.title}</span>
                                        <p>Mô tả chi tiết ở đây</p>
                                        <textarea rows="5" cols="70" value={this.state.content} name="content" onChange={(e) => this.handleChange(e)}></textarea>
                                        <span className="text-danger">{this.state.error_list.content}</span>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Gửi</button>
                                </form>
                                {this.state.message !== '' ? <div className="alert alert-success mt-3">
                                    <p className="icontext">{this.state.message}</p>
                                </div> : ''}

                            </div>
                        </div>


                    </div>
                    <div className="col-md-3">
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact;