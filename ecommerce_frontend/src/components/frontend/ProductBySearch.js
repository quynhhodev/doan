import React from "react";
import { connect } from "react-redux";
import Product from "./Product";
class ProductBySearch extends React.Component {
    state = {
        searchProduct: []
    }
    async componentDidMount() {

        // const res = await axios.get(`api/search/${this.props.strSearch}`)
        // if (res.data.status === 200) {
        //     this.setState({ searchProduct: res.data.data })
        // }
    }
    render() {
        let str = this.props.match.params.text;
        return (
            <div className="container">
                <div className="row" >
                    <h6>Hien thi cho tim kiem "{str}"</h6>

                    {
                        this.props.searchProduct.map((item, index) => {
                            return (
                                <Product key={index} category_slug={item.category.slug} ram={item.ram} rom={item.rom} installment={item.installment} screen={item.screen} mass={item.mass} slug={item.slug} id={item.id} image={item.image} productName={item.productName} detail={item.detail} price={item.price} salePrice={item.salePrice} chip={item.chip} />

                            )
                        })
                    }


                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchProduct: state.search,
        //strSearch: state.strSearch
    }
}
export default connect(mapStateToProps)(ProductBySearch);