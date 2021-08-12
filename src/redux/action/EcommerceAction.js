import { notification } from "antd"
import { WarningOutlined } from '@ant-design/icons';
import axios from "axios"
import swal from "sweetalert"
// Product
export const getProduct = () => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/product',
                method: 'GET',
            })
            dispatch({
                type: 'GET_PRODUCT_CUSTOMER',
                product: result.data
            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (err) {
            console.log(err.response?.data);
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }

    }
}
export const getAllProduct = () => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: `https://fes-backend-server.herokuapp.com/product/getAllProduct`,
                method: 'GET'
            })
            dispatch({
                type: 'GET_ALL_PRODUCT',
                payload: result.data
            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            alert(error.response?.data.message);
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const getProductPaginate = (page, limit, filterPrice, filterColor, filterSize, filterRating) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: `https://fes-backend-server.herokuapp.com/product/allProductPaginate?page=${page}&limit=${limit}
                ${filterPrice ? `&filterPrice=${filterPrice}` : ''}
                ${filterColor ? `&filterColor=${filterColor}` : ''}
                ${filterSize ? `&filterSize=${filterSize}` : ''}
                ${filterRating ? `&filterRating=${filterRating}` : ''}
                `,
                method: 'GET'
            })
            dispatch({
                type: 'GET_PRODUCT_PAGINATE',
                payload: result.data
            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const getAllProductBySlug = (slug, history) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: `https://fes-backend-server.herokuapp.com/product/allProductBySlug/${slug}`,
                method: 'GET'
            })
            dispatch({
                type: 'GET_PRODUCT_BY_SLUG',
                payload: result.data
            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            history.push('/')
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const getProductPaginateBySlug = (slug, page, limit, sort) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: `https://fes-backend-server.herokuapp.com/product/productItemPaginate/${slug}?page=${page}&limit=${limit}
                ${sort ? `&sortObject=${sort}` : ''}`,
                method: 'GET'
            })
            dispatch({
                type: 'GET_PRODUCT_PAGINATE_BY_SLUG',
                payload: result.data
            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const getProductDetail = (categoryId, page) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: `https://fes-backend-server.herokuapp.com/page/${categoryId}/${page}`,
                method: 'GET'
            })
            dispatch({
                type: 'GET_PRODUCT_DETAIL',
                payload: result.data
            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const getProductById = (productId) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: `https://fes-backend-server.herokuapp.com/product/productDetail/${productId}`,
                method: 'GET'
            })
            dispatch({
                type: 'GET_PRODUCT_DETAIL_PAGE',
                payload: result.data
            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const addComment = (comment) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            await axios({
                url: `https://fes-backend-server.herokuapp.com/product/productDetail/add-review`,
                method: 'POST',
                data: comment,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            swal({
                title: `Add review successfully`,
                text: "",
                icon: "success",
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
// User
export const loginHome = (user, props) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/user/signin',
                method: 'POST',
                data: user,
            })
            localStorage.setItem('USER_LOGIN', JSON.stringify(result.data.user))
            localStorage.setItem('ACCESS_TOKEN', result.data.token)
            swal({
                title: `Login Successfully`,
                text: "",
                icon: "success",
            });
            props.history.push('/')
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const handleInputSignup = (newValues) => {
    return async dispatch => {
        dispatch({
            type: 'USER_INPUT_SIGNUP',
            userInfoSignup: newValues
        })
    }
}
export const signupUser = (user) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            await axios({
                url: 'https://fes-backend-server.herokuapp.com/user/signup',
                method: 'POST',
                data: user
            })
            swal({
                title: `Signup Successfully`,
                text: "",
                icon: "success",
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const forgetPassword = (emailUser) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            await axios({
                url: 'https://fes-backend-server.herokuapp.com/user/forget-password',
                method: 'POST',
                data: emailUser
            })
            swal({
                title: `Send email successfully`,
                text: "",
                icon: "success",
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const resetPassword = (passwordReset, token) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            await axios({
                url: `https://fes-backend-server.herokuapp.com/user/reset-password/${token}`,
                method: "POST",
                data: passwordReset
            })
            swal({
                title: `Change password successfully`,
                text: "",
                icon: "success",
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })

        }
    }
}
export const loginAdmin = (admin, props) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/admin/signin',
                method: 'POST',
                data: admin
            })
            localStorage.setItem('USER_LOGIN', JSON.stringify(result.data.user))
            localStorage.setItem('ACCESS_TOKEN', result.data.token)
            swal({
                title: `Login successfully`,
                text: "",
                icon: "success",
            });
            props.history.push('/admin')
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const getUserDetail = () => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/user/getUserDetail',
                method: 'POST',
                headers: { 'Authorization': "Bearer " + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch({
                type: 'GET_USER_DETAIL',
                userDetail: result.data
            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })

        }
    }
}
export const infoUpdateUser = (newValues) => {
    return async dispatch => {
        dispatch({
            type: 'INPUT_UPDATE_USER',
            value: newValues
        })
    }
}
export const updateUserData = (userUpdate, history) => {
    let formData = new FormData()
    for (let item in userUpdate) {
        formData.append(item, userUpdate[item])
    }

    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            await axios({
                url: 'https://fes-backend-server.herokuapp.com/user/updateUserDetail',
                method: 'POST',
                data: formData,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch(getUserDetail())
            // history.push('/login')
            // localStorage.clear()
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const changeUserPassword = (password) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            await axios({
                url: 'https://fes-backend-server.herokuapp.com/user/changePassword',
                method: 'POST',
                data: password,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            swal({
                title: `Change password successfully`,
                text: "",
                icon: "success",
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
// Cart
export const getCartItems = () => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        if (localStorage.getItem('USER_LOGIN')) {

            try {

                let result = await axios({
                    url: 'https://fes-backend-server.herokuapp.com/cart',
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
                })

                dispatch({
                    type: 'GET_PRODUCT_CART',
                    cart: result.data
                })

                dispatch({
                    type: 'END_USER_REQUEST'
                })
            } catch (error) {
                notification.open({
                    message: 'Error',
                    description: `${error.response?.data.message}`,
                    icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
                });
                dispatch({
                    type: 'END_USER_REQUEST'
                })
                // dispatch({
                //     type:'RESET_CART'
                // })
            }
        }

    }

}
export const addProduct = (id, quantity, price, limitedPrice, color, size) => {
    const item = {
        cartItems: {
            product: id,
            quantity: quantity,
            price: price,
            limitedPrice: limitedPrice,
            color: color,
            size: size
        }

    }

    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/cart/user/add-to-cart',
                method: 'POST',
                data: item,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            console.log(result.data);
            dispatch(getCartItems())

        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }


    }
}
export const decreaseItem = (id, quantity, price, limitedPrice, color, size) => {
    const item = {
        cartItems: {
            product: id,
            quantity: quantity,
            price: price,
            limitedPrice: limitedPrice,
            color: color,
            size: size
        }
    }
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            await axios({
                url: 'https://fes-backend-server.herokuapp.com/cart/user/decremental-cart',
                method: 'POST',
                data: item,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })

            dispatch(getCartItems())
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const removeItemFromCart = (id) => {
    const product = {
        productId: id
    }
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            await axios({
                url: "https://fes-backend-server.herokuapp.com/cart/delete",
                method: 'POST',
                data: product,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            swal({
                title: `Remove successfully`,
                text: "",
                icon: "success",
            });
            dispatch(getCartItems())
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
// Place Order
export const getAddress = () => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/address',
                method: 'GET',
                headers: { 'Authorization': "Bearer " + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch({
                type: 'GET_USER_ADDRESS',
                payload: result.data
            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }


    }
}
export const handleInputPlaceOrder = (newValues) => {
    return async dispatch => {
        dispatch({
            type: 'INPUT_PlACE_ORDER',
            userInfo: newValues
        })
    }
}
export const handleCreateAddress = (userData) => {
    let dataToApi = {
        payload: {
            address: userData
        }
    }
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            await axios({
                url: "https://fes-backend-server.herokuapp.com/address/add-address",
                method: 'POST',
                data: dataToApi,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch(getAddress())
            swal({
                title: `Add successfully`,
                text: "",
                icon: "success",
            });
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const handleUpdateAddress = (userData) => {
    let dataToApi = {
        payload: {
            address: userData
        }
    }
    console.log(dataToApi);
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            await axios({
                url: "https://fes-backend-server.herokuapp.com/address/update-address",
                method: 'POST',
                data: dataToApi,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch(getAddress())
            swal({
                title: `Update successfully`,
                text: "",
                icon: "success",
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const handleDeleteAddress = (id) => {

    let dataToApi = {
        addressId: id
    }
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            await axios({
                url: "https://fes-backend-server.herokuapp.com/address/delete-address",
                method: 'POST',
                data: dataToApi,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch(getAddress())
            swal({
                title: `Delete successfully`,
                text: "",
                icon: "success",
            });
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
export const handleOrderProduct = (payload) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            await axios({
                url: 'https://fes-backend-server.herokuapp.com/order/add-order',
                method: 'POST',
                data: payload,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch(getCartItems())
            dispatch({
                type: 'RESET_CART'
            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }

    }
}
export const handlePaymentCard = (payload, history) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            await axios({
                url: 'https://fes-backend-server.herokuapp.com/order/paymentCard',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') },
                data: payload
            })
            dispatch(getCartItems())
            dispatch({
                type: 'RESET_CART'
            })
            history.push('/successOrder')

        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }

    }
}
// Order page
export const getOrder = () => {

    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: "https://fes-backend-server.herokuapp.com/order",
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch({
                type: 'GET_ORDER_ARRAY',
                orderArray: result.data

            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
// Order Status Page
export const getOrderStatus = (orderId) => {
    const payload = {
        orderId: orderId
    }
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/order/get-one-order',
                method: 'POST',
                data: payload,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })

            dispatch({
                type: 'GET_ORDER_STATUS',
                orderStatus: result.data.order,

            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            notification.open({
                message: 'Error',
                description: `${error.response?.data.message}`,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            dispatch({
                type: 'END_USER_REQUEST'
            })
        }
    }
}
