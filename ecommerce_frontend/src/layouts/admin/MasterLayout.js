import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Switch, Route, Redirect, } from "react-router-dom";
import routes from "../../routes/routes";
// Xung đột CSS và JS
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';
class MasterLayout extends React.Component {
    render() {
        return (
            <div className="sb-nav-fixed">
                <Navbar />
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <Sidebar />
                    </div>
                    <div id="layoutSidenav_content">
                        <main>
                            <Switch>
                                {routes.map((route, index) => {
                                    return (
                                        route.component && (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={(props) => (
                                                    <route.component {...props} />)}
                                            />
                                        )
                                    );
                                })}
                                <Redirect from="/admin" to="/admin/dashboard" />
                            </Switch>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

export default MasterLayout;