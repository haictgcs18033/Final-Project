import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AdminOrder from "../Pages/Admin/AdminOrder/AdminOrder";
import AdminCategory from "../Pages/Admin/AdminCategory/AdminCategory";
import AdminUser from "../Pages/Admin/AdminUser/AdminUser";
import AdminLogin from "../Pages/AdminLogin";
import Custormer from "../Pages/Customer/Custormer";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import NotFound from "../Pages/NotFound";
import Signup from "../Pages/Signup";
import AdminProduct from "../Pages/Admin/AdminProduct/AdminProduct";
import ProductPage from "../Pages/ProductOfCategory/ProductPage";
import ProductDetailPage from "../Pages/ProductDetailPage";
import Cart from "../Pages/Cart";
import PlaceOrder from "../Pages/PlaceOrder";
import Order from "../Pages/Order";
import OrderStatus from "../Pages/OrderStatus";

import AdminEmail from "../Pages/Admin/Admin Email/AdminEmail";
import AllProduct from "../Pages/ProductList/AllProduct";
import UserProfile from "../Pages/UserDetail/UserProfile";
import SuccessOrder from "../Pages/SuccessOrder";
import ForgetPassword from "../Pages/ForgetPassword";
import ResetPassword from "../Pages/ResetPassword";


export const CustomerRoute = [
    {
        path: '/',
        component: HomePage,
        exact: true
    },
   
    {
        path: '/productItem/:slug/:categoryName',
        component: ProductPage,
        exact:false
    },
    {
        path:'/allProduct',
        component:AllProduct,
        exact:false
    },
    
    {
        path: '/customer/homepage',
        component: Custormer,
        exact: false,
    },
    {
        path: '/login',
        component: LoginPage,
        exact: true
    },
    {
        path: '/forget-password',
        component: ForgetPassword,
        exact: false
    },
    {
        path: '/reset-password/:token',
        component: ResetPassword,
        exact: false
    },
  
    {
        path: '/userDetail',
        component: UserProfile,
        exact: false
    },
    
    {
        path: '/detail/:slug/:productId',
        component: ProductDetailPage,
        exact: false
    },
  
    {
        path: '/cart',
        component: Cart,
        exact: false
    },
    {
        path: '/signup',
        component: Signup,
        exact: false
    },
    {
        path: '/placeOrder',
        component: PlaceOrder,
        exact: false
    },
    {
        path: '/order',
        component: Order,
        exact: true
    },
    {
        path:'/successOrder',
        component:SuccessOrder,
        exact:false
    },

    {
        path: '/order/orderstatus/:orderId',
        component: OrderStatus,
        exact: false
    },
    {
        path: '*',
        component: NotFound,
        exact: false

    }

]
export const AdminLoginRoute = [
    {
        path: '/admin/login',
        component: AdminLogin,
        exact: true
    },
]
export const AdminRoute = [
    {
        path: '/admin',
        component: AdminDashboard,
        exact: true
    },
    {
        path: '/admin/user',
        component: AdminUser,
        exact: false
    },
    {
        path: '/admin/category',
        component: AdminCategory,
        exact: false,
    },
    {
        path: '/admin/email',
        component: AdminEmail,
        exac: false
    },
    {
        path: '/admin/order',
        component: AdminOrder,
        exact: false
    },
    {
        path: '/admin/product',
        component: AdminProduct,
        exact: false
    }

]

