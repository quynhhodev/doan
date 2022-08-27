import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Search extends React.Component {
    state = { strSearch: '' }
    refreshPage = () => {
        window.location.reload();
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.get(`api/search/${this.state.strSearch}`)
        if (res.data.status === 200) {
            this.props.searchProduct(res.data.data);
        }
        //this.props.history.push(`/search/${this.state.strSearch}`);
        this.props.history.replace(`/search/${this.state.strSearch}`);
    }

    handleChangeSearch = (e) => {
        this.setState({ strSearch: e.target.value });
    }

    render() {
        return (
            <form action="/" className="search-header">
                <div className="input-group w-100" >

                    <input type="text" name="search" value={this.state.strSearch} onChange={(e) => this.handleChangeSearch(e)} className="form-control" placeholder="Bạn muốn tìm điện thoại, máy tính, phụ kiện..." />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={(e) => this.handleSubmit(e)}>
                            <i className="fa fa-search"></i> Tìm
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataRedux: state.countProductInCart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchProduct: (data) => dispatch({ type: 'SEARCHPRODUCT', payload: data })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));