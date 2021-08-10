import axios from "axios"
export const handleInputAdmin = (value) => {
    return async dispatch => {
        dispatch({
            type: 'INPUT',
            category: value,
            product: value,
            page: value
        })
    }
}

// User
export const handleInputAdminUser = (value) => {
    return async dispatch => {
        dispatch({
            type: 'INPUT_USER',
            createUser: value,
        })
    }
}
export const getAllUser = () => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/admin/getAllUser',
                method: 'GET',
                headers: { 'Authorization': "Bearer " + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
            dispatch({
                type: 'GET_ALL_USER',
                users: result.data
            })

        } catch (error) {
            console.log(error.response?.data);
        }
    }
}
export const getUserPaginate = (page, limit, searchTerm, sortType) => {
    console.log(sortType);
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: `https://fes-backend-server.herokuapp.com/admin/getUserPaginate?page=${page}&limit=${limit}
                ${searchTerm ? `&searchTerm=${searchTerm}` : ''}
                ${sortType ? `&sortObject=${sortType}` : ''}`,
                method: 'GET',
                headers: { 'Authorization': "Bearer " + localStorage.getItem('ACCESS_TOKEN') }
            })
            console.log(result.data);
            dispatch({
                type: 'GET_USER_PAGINATE',
                userPaginate: result.data
            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}
export const createUser = (user, page, limit) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/admin/addUser',
                method: 'POST',
                data: user,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch({
                type: 'END_USER_REQUEST'
            })
            dispatch(getUserPaginate(page, limit))
            dispatch(getAllUser())
            console.log(result.data);
        } catch (error) {
            console.log(error.response?.data.message);
        }
    }
}
export const handleUpdateUser = (userUpdate, page, limit) => {
    return async dispatch => {
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/admin/updateUser',
                method: 'POST',
                data: userUpdate,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            console.log(result.data);
            dispatch({
                type: 'END_USER_REQUEST'
            })
            dispatch(getUserPaginate(page, limit))
            dispatch(getAllUser())
        } catch (err) {
            console.log(err.response?.data);
        }
    }
}
export const deleteUser = (userId, page, limit) => {
    let dataToApi = {
        userId: userId
    }
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/admin/deleteUser',
                method: 'POST',
                data: dataToApi,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            console.log(result.data);
            dispatch({
                type: 'END_USER_REQUEST'
            })
            dispatch(getUserPaginate(page, limit))
            dispatch(getAllUser())
        } catch (err) {
            console.log(err.response?.data);
        }
    }
}
// Email
export const getAllEmail = (sortObject) => {

    return async dispatch => {
        try {
            dispatch({
                type: 'GET_USER_REQUEST'
            })
            let result = await axios({
                url: `https://fes-backend-server.herokuapp.com/email/getAllEmail${sortObject ? `?sortObject=${sortObject}` : ''}`,
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch({
                type: 'GET_ALL_EMAIL',
                email: result.data
            })

        } catch (err) {
            console.log(err.response?.data);
        }
    }
}
export const sendSpecificEmail = (specificObject) => {
    return async dispatch => {
        try {
            dispatch({
                type: 'GET_USER_REQUEST'
            })
             await axios({
                url: 'https://fes-backend-server.herokuapp.com/email/addMail',
                method: 'POST',
                data:specificObject,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch(getAllEmail())
           dispatch({
               type:'END_USER_REQUEST'
           })
             
        } catch (err) {
            console.log(err.response?.data);
        }
    }
}
export const sendMailAll = (mailAll) => {
    return async dispatch => {
        try {
            dispatch({
                type: 'GET_USER_REQUEST'
            })
             await axios({
                url: 'https://fes-backend-server.herokuapp.com/email/addMail',
                method: 'POST',
                data:mailAll,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch(getAllEmail())
           dispatch({
               type:'END_USER_REQUEST'
           })
             
        } catch (err) {
            console.log(err.response?.data);
        }
    }
}
// Category
export const getCatgory = () => {
    return async dispatch => {
        // dispatch({
        //     type:'GET_USER_REQUEST'
        // })
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/category',
                method: 'GET',

            })
            dispatch({
                type: 'GET_CATEGORY',
                category: result.data
            })

        } catch (err) {
            console.log(err.response?.data);
        }
    }
}
export const createCategory = (formInput) => {
    const formData = new FormData()
    for (let item in formInput) {
        formData.append(item, formInput[item])
    }
    return async dispatch => {
        // dispatch({
        //     type:'GET_USER_REQUEST'
        // })
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/category/add',
                method: 'POST',
                data: formData,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            // console.log(result.data);
            dispatch({
                type: 'ADD_CATEGORY',
                payload: result.data
            })
            dispatch(getCatgory())
        } catch (err) {
            console.log(err.response?.data);
        }
    }
}


export const UpdateCategory = (checkedCategory, expandedCategory) => {
    console.log(checkedCategory, expandedCategory);
    const form = new FormData();
    checkedCategory && checkedCategory.forEach((item) => {
        form.append('_id', item.value);
        form.append('name', item.name);
        form.append('parentId', item.parentId ? item.parentId : '')
        form.append('type', item.type)
    })
    expandedCategory && expandedCategory.forEach((item) => {
        form.append('_id', item.value);
        form.append('name', item.name);
        form.append('parentId', item.parentId ? item.parentId : '')
        form.append('type', item.type)
    })
    return async dispatch => {
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/category/update',
                method: 'POST',
                data: form,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            console.log(result.data);
            dispatch(getCatgory())
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}
export const deleteCategory = (items) => {
    console.log(items);
    return async dispatch => {
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/category/delete',
                method: 'POST',
                data: {
                    ids: items
                },
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            console.log(result);
            dispatch(getCatgory())
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}
// Product
export const getProduct = () => {
    return async dispatch => {

        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/initialData',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            // console.log(result.data);
            dispatch({
                type: 'GET_PRODUCT',
                payload: result.data
            })
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}
export const getProductPaginate = (page, limit, searchTerm, sortObject) => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: `https://fes-backend-server.herokuapp.com/product/getProductPaginate?page=${page}&limit=${limit}
                ${searchTerm ? `&searchTerm=${searchTerm}` : ''}
                ${sortObject ? `&sortObject=${sortObject}` : ''}`,
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
          
            dispatch({
                type: 'GET_PRODUCT_PAGINATE',
                payload: result.data
            })
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}
export const createProduct = (productInfo,page,limit) => {
 
    let { name, price, quantity, description, category, productPictures ,color,size,averageStar} = productInfo
    let formData = new FormData()
    //   Cach cho nhieu hinh trong form
    formData.append('name', name)
    formData.append('price', price)
    formData.append('quantity', quantity)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('color',color)
    formData.append('size',size)
    formData.append('averageStar',averageStar)
    for (let img of productPictures) {
        formData.append('productPicture', img)
    }

    return async dispatch => {
        dispatch({
            type:'GET_USER_REQUEST'
        })
        try {
            
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/product/add',
                method: 'POST',
                data: formData,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            console.log(result.data);
            alert('Them thanh cong')
            dispatch({
                type: 'RESET_FORM'
            })
            dispatch({
                type:'EMPTY_ARRAY'
            })
            dispatch(getProductPaginate(page, limit))
            dispatch(getProduct())
            dispatch({
                type:'END_USER_REQUEST'
            })
        } catch (err) {
            console.log(err.response?.data);
        }
    }
}
export const updateProduct = (productUpdate, page, limit) => {
    let { productId, name, price, quantity, description, category, productPictures ,color,size} = productUpdate
    console.log(productPictures);
    let formData = new FormData()
    //   Cach cho nhieu hinh trong form
    formData.append('productId', productId)
    formData.append('name', name)
    formData.append('price', price)
    formData.append('quantity', quantity)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('color',color)
    formData.append('size',size)
    for (let img of productPictures) {
        formData.append('productPicture', img)
    }
     for(let value of formData){
         console.log(value);
     }
    return async dispatch => {
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/product/productUpdate',
                method: 'POST',
                data: formData,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            console.log(result.data);
            alert('Cap nhat thanh cong')
            dispatch(getProductPaginate(page, limit))
            dispatch(getProduct())
        } catch (err) {
            console.log(err.response?.data);
        }
    }
}
export const deleteProduct = (id, page, limit) => {
    let dataToApi = {
        productId: id
    }
    return async dispatch => {
        try {
            await axios({
                url: "https://fes-backend-server.herokuapp.com/product/productDelete",
                method: 'POST',
                data: dataToApi,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch(getProductPaginate(page, limit))
            dispatch(getProduct())
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}
// page
export const createPage = (pageData) => {
    console.log(pageData);
    const form = new FormData()
    form.append('title', pageData.title)
    form.append('description', pageData.description)
    form.append('category', pageData.category)
    form.append('type', pageData.type)
    for (let item of pageData.bannerImages) {
        form.append('bannerImages', item)
    }
    for (let item of pageData.productImages) {
        form.append('productImages', item)
    }
    return async dispatch => {
        try {
            let result = await axios({
                url: "https://fes-backend-server.herokuapp.com/page/createPage",
                method: 'POST',
                data: form,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            console.log(result.data);
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}
// Customer Order
export const getCustomerOrder = () => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER_REQUEST'
        })
        try {
            let result = await axios({
                url: "https://fes-backend-server.herokuapp.com/admin/getOrder",
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch({
                type: 'GET_CUSTOMER_ORDER',
                customerOrders: result.data.orders,

            })

        } catch (err) {
            console.log(err.response?.data);
        }
    }
}
export const handleOrderStatus = (payload) => {
    return async dispatch => {
        try {
            await axios({
                url: 'https://fes-backend-server.herokuapp.com/admin/orderStatus',
                method: 'POST',
                data: payload,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') }
            })
            dispatch(getCustomerOrder())
        } catch (err) {
            console.log(err.response?.data);
        }
    }
}