import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import LinkList from '../pages/Admin/Link/LinkList';
import AddLink from '../pages/Admin/Link/AddLink';
import EditLink from '../pages/Admin/Link/EditLink';
import ProductList from '../pages/Admin/Product/ProductList';
import AddProduct from '../pages/Admin/Product/AddProduct';
import EditProduct from '../pages/Admin/Product/EditProduct';
import CategoryList from '../pages/Admin/Category/CategoryList';
import AddCategory from '../pages/Admin/Category/AddCategory';
import EditCategory from '../pages/Admin/Category/EditCategory';
import AddBrand from '../pages/Admin/Brand/AddBrand';
import BrandList from '../pages/Admin/Brand/BrandList';
import EditBrand from '../pages/Admin/Brand/EditBrand';
import Order from '../pages/Admin/Order/Order';
import OrderDetails from '../pages/Admin/Order/OrderDetails';
import ProductTrash from '../pages/Admin/Product/ProductTrash';
import CategoryTrash from '../pages/Admin/Category/CategoryTrash';
import BrandTrash from '../pages/Admin/Brand/BrandTrash';
import LinkTrash from '../pages/Admin/Link/LinkTrash';
import CommentList from '../pages/Admin/Comment/CommentList';
import Contacts from '../pages/Admin/Contact/Contacts';
import AddPost from '../pages/Admin/Post/AddPost';
import PostList from '../pages/Admin/Post/PostList';
import EditPost from '../pages/Admin/Post/EditPost';
import ListProduct from '../components/admin/ListProduct';
import Shipper from '../pages/Admin/Shipper/Shipper';

const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/admin/links', exact: true, name: 'LinkList', component: LinkList },
    { path: '/admin/add-link', exact: true, name: 'AddLink', component: AddLink },
    { path: '/admin/edit-link/:id', exact: true, name: 'EditLink', component: EditLink },
    { path: '/admin/products', exact: true, name: 'ProductList', component: ProductList },
    { path: '/admin/add-product', exact: true, name: 'AddProduct', component: AddProduct },
    { path: '/admin/edit-product/:id', exact: true, name: 'EditProduct', component: EditProduct },
    { path: '/admin/product-trash', exact: true, name: 'ProductTrash', component: ProductTrash },
    { path: '/admin/categories-trash', exact: true, name: 'CategoryTrash', component: CategoryTrash },
    { path: '/admin/link-trash', exact: true, name: 'LinkTrash', component: LinkTrash },
    { path: '/admin/brand-trash', exact: true, name: 'BrandTrash', component: BrandTrash },
    { path: '/admin/categories', exact: true, name: 'CategoryList', component: CategoryList },
    { path: '/admin/add-category', exact: true, name: 'AddCategory', component: AddCategory },
    { path: '/admin/edit-category/:id', exact: true, name: 'AddCategory', component: EditCategory },
    { path: '/admin/add-brand', exact: true, name: 'AddBrand', component: AddBrand },
    { path: '/admin/edit-brand/:id', exact: true, name: 'EditBrand', component: EditBrand },
    { path: '/admin/brands', exact: true, name: 'BrandList', component: BrandList },
    { path: '/admin/orders', exact: true, name: 'Order', component: Order },
    { path: '/admin/view-orders/:order_id/:user_id', exact: true, name: 'OrderDetails', component: OrderDetails },
    { path: '/admin/comments', exact: true, name: 'CommentList', component: CommentList },
    { path: '/admin/contacts', exact: true, name: 'Contacts', component: Contacts },
    { path: '/admin/add-post', exact: true, name: 'AddPost', component: AddPost },
    { path: '/admin/posts', exact: true, name: 'PostList', component: PostList },
    { path: '/admin/edit-post/:id', exact: true, name: 'EditPost', component: EditPost },
    { path: '/admin/list-product/:scope', exact: true, name: 'ListProduct', component: ListProduct },
    { path: '/admin/shipper', exact: true, name: 'Shipper', component: Shipper },




]
export default routes;