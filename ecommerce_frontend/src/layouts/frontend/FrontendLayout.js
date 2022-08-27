import React from "react";
import { Switch, Route, } from "react-router-dom";
import publicRouteList from "../../routes/Publicroutelist";
import Header from "../frontend/Header";
import Footer from "../frontend/Footer";
import LazyLoad from "react-lazyload";
//import Nav from "./Nav";

import '../../assets/frontend/css/bootstrap.css';
import '../../assets/frontend/css/responsive.css';
import '../../assets/frontend/css/ui.css';

class FrontendLayout extends React.Component {
    render() {
        return (
            <div>
                <Header />
                {/* <Nav /> */}
                <div>
                    <Switch>
                        {publicRouteList.map((routedata, index) => {
                            return (
                                routedata.component && (
                                    <Route
                                        key={index}
                                        path={routedata.path}
                                        exact={routedata.exact}
                                        name={routedata.name}
                                        render={(props) => (
                                            <routedata.component {...props} />)}
                                    />
                                )
                            );
                        })}
                    </Switch>
                </div>
                <LazyLoad offset={100}>
                    <Footer />
                </LazyLoad>
            </div>
        );
    }
}

export default FrontendLayout;