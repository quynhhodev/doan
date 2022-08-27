import React from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Product from '../../components/frontend/Product';
import { withRouter } from "react-router-dom";
class ProductByBrand extends React.Component {
    state = {
        listProduct: [],
        brand: [],
        loading: true
    }
    async componentDidMount() {
        const brandSlug = this.props.match.params.brand;
        var res = await axios.get(`/api/product-by-brand/${brandSlug}`);
        if (res.data.status === 200) {
            console.log(res);
            this.setState({ listProduct: res.data.product_data.products, brand: res.data.product_data.brand, loading: false })
        }
        else if (res.data.status === 400) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.data.message,
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
        else if (res.status === 404) {
            this.props.history.push('/')
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }
    render() {
        let listProduct = this.state.listProduct
        return (<>
            <div className="py-2 bg-info">
                <div className="container">
                    <h6 className="text-secondary">Trang chủ / Thương hiệu / {this.state.brand.brandName}</h6>
                </div>
            </div>
            <div className="row">
                {this.state.loading ? '' :
                    listProduct && listProduct.length > 0 && listProduct.map((item, index) => {
                        return (
                            <Product key={index} vote={item.vote} category_slug={item.category.slug} ram={item.ram} rom={item.rom} installment={item.installment} screen={item.screen} mass={item.mass} slug={item.slug} id={item.id} image={item.image} productName={item.productName} detail={item.detail} price={item.price} salePrice={item.salePrice} chip={item.chip} />
                        )
                    })
                }
            </div>
        </>)

    }
}
export default withRouter(ProductByBrand);