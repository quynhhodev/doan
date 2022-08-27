import React from "react";
import axios from "axios";
import Category from './Category';
class Categories extends React.PureComponent {
    state = { listCat: [], loading: true };
    async componentDidMount() {
        var res = await axios.get('/api/categories-at-home');
        if (res.status === 200) {
            this.setState({ listCat: res.data.data, loading: false })
        }
    }
    render() {
        var HTML = '';

        if (this.state.loading) {
            <h2>Loading...</h2>
        }
        else {
            HTML = this.state.listCat.map((item, index) => {

                return (
                    <Category icon={item.icon} key={index} path={`/collections/${item.slug}`} catName={item.catName} />

                )


            })
        }

        return (
            <aside className="col-lg col-md-3 flex-lg-grow-0">
                <nav className="nav-home-aside">
                    {/* <h6 className="title-category">MY MARKETS <i className="d-md-none icon fa fa-chevron-down"></i></h6> */}
                    <ul className="menu-category">
                        {HTML}
                    </ul>
                </nav>
            </aside>
        )
    }
}
export default React.memo(Categories)