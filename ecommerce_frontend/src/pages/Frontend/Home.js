import React from 'react';
import axios from 'axios';
import LazyLoad from "react-lazyload";
import CatShowHome from '../../components/frontend/CatShowHome';
import Categories from '../../components/frontend/Categories';
import SlideShow from '../../components/frontend/SlideShow';
import Deal from '../../components/frontend/Deal';
import SliderProducts from '../../components/frontend/SliderProducts';
import PopularCategories from '../../components/frontend/PopularCategories';
import RecommendedItem from '../../components/frontend/RecommendedItem';
import ReportPrice from '../../components/frontend/ReportPrice';
import Brand from '../../components/frontend/Brand';
import PopularBrand from '../../components/frontend/PopularBrand';
import Posts from '../../components/frontend/Posts';

class Home extends React.Component {
    state = {
        cats: [],
        loading: true
    }
    async componentDidMount() {
        var res = await axios.get('api/cats-show-home');
        if (res.data.status === 200) {
            this.setState({ cats: res.data.data, loading: false });
        }
    }
    render() {


        return (
            <>
                <b className="screen-overlay"></b>
                <div className="container">
                    <section className="section-main padding-y">
                        <main className="card">
                            <div className="card-body">
                                <div className="row">
                                    <Categories />
                                    <div className="col-md-9 col-xl-7 col-lg-7">
                                        <SlideShow />
                                    </div>
                                    <div className="col-md d-none d-lg-block flex-grow-1">
                                        <PopularCategories />
                                    </div>
                                </div>

                            </div>
                        </main>
                    </section>

                    <section className="padding-bottom">
                        <Deal />
                    </section>
                    <LazyLoad once offset={100} >
                        {this.state.cats && this.state.cats.length > 0 &&
                            this.state.cats.map((item, index) => {
                                return (
                                    <CatShowHome key={index} catId={item.id} />
                                );
                            })
                        }
                    </LazyLoad>

                    <LazyLoad height={200} once offset={100} >
                        <Brand />
                    </LazyLoad>
                    <LazyLoad once offset={100} >
                        <SliderProducts />
                    </LazyLoad>
                    {/* Report price for user Begin */}
                    <LazyLoad once offset={100} >
                        <ReportPrice />
                    </LazyLoad>
                    {/* Report price for user End */}

                    {/* RecommendedItem */}
                    <LazyLoad once offset={100} >
                        <RecommendedItem />
                    </LazyLoad>


                    {/* Services */}
                    <LazyLoad once offset={100} >
                        <PopularBrand />
                    </LazyLoad>
                    <LazyLoad once offset={100} >
                        <Posts />
                    </LazyLoad>
                    {/* <Services /> */}
                </div>
                {/* <Subscribe /> */}
            </>
        );
    }
}

export default Home