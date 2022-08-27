import ProDetail from "../pages/Frontend/ProDetail";
import Home from "../pages/Frontend/Home";
import ProductByCat from "../pages/Frontend/ProductByCat";
import Login from "../pages/Admin/User/Login";
import Register from "../pages/Admin/User/Register";
import Cart from "../pages/Frontend/Cart";
import Checkout from "../pages/Frontend/Checkout";
import Thankyou from "../pages/Frontend/Thankyou";
import ProductBySearch from '../components/frontend/ProductBySearch';
import SettingUser from '../components/frontend/SettingUser';
import ProductByBrand from '../pages/Frontend/ProductByBrand';
import Order from "../pages/Frontend/Order";
import Contact from "../pages/Frontend/Contact";
import EmptyCart from '../pages/Frontend/EmptyCart';
import PostDetail from '../components/frontend/PostDetail';
import Tintuc from "../pages/Frontend/Tintuc";


const publicRouteList = [
    { path: '/collections/:category/:product', exact: false, name: 'ProDetail', component: ProDetail },
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/collections/:slug', exact: true, name: 'ProductByCat', component: ProductByCat },
    { path: '/register', exact: false, name: 'Register', component: Register },
    { path: '/login', exact: true, name: 'Login', component: Login },
    { path: '/cart', exact: true, name: 'Cart', component: Cart },
    { path: '/checkout', exact: true, name: 'Checkout', component: Checkout },
    { path: '/thank-you', exact: true, name: 'Thankyou', component: Thankyou },
    { path: '/search/:text', exact: true, name: 'ProductBySearch', component: ProductBySearch },
    { path: '/collections-brand/:brand', exact: true, name: 'ProductByBrand', component: ProductByBrand },
    { path: '/order', exact: true, name: 'Order', component: Order },
    { path: '/setting-user', exact: true, name: 'SettingUser', component: SettingUser },
    { path: '/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/cart-empty', exact: true, name: 'EmptyCart', component: EmptyCart },
    { path: '/post-detail/:slug', exact: true, name: 'PostDetail', component: PostDetail },
    { path: '/tintuc', exact: true, name: 'Tintuc', component: Tintuc },
]
export default publicRouteList;