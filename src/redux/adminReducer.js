

const stateDefault = {
    // User
    userArray: [],
    createUser: {
        firstName: '',
        lastName: '',
        email: '',
        role: 'customer'
    },


    paginateUser: {},
    // Category
    categoryList: [],
    category: {
        name: '',
        parentId: '',
        categoryImage: '',
       

    },
    // Product
    productList: [],
    paginateProduct: {},
    product: {
        name: '',
        price: '',
        quantity: '',
        description: '',
        category: '',
        productPictures: [],
        color: [],
        size: [],
        averageStar: 0
    },
  

    // Page
    page: {
        title: '',
        description: '',
        category: '',
        type: '',
        bannerImages: [],
        productImages: []
    },
    // Customer Order
    customerOrders: [],

    orderId: '',
    // Email
    emailServer: [],
    // Loading
    loading: false
}
let setNewCategory = (categoryList, category, parentId) => {
    let newCategoryArray = []
    if (parentId === undefined) {
        return [...categoryList, {
            _id: category._id,
            name: category.name,
            slug: category.slug,
            categoryImage: category.categoryImage,
            type: category.type,
            children: []
        }]
    }

    for (let cate of categoryList) {
        if (cate._id === parentId) {
            let newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                categoryImage: category.categoryImage,
                children: []

            }
            newCategoryArray.push({
                ...cate,
                children: cate.children.length > 0 ? [...cate.children, newCategory] : [newCategory]
            })
        } else {
            newCategoryArray.push({
                ...cate,
                children: cate.children ? setNewCategory(cate.children, category, parentId) : []
            })
        }
    }
}
export const adminReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'GET_ALL_USER': {
            return { ...state, userArray: action.users }
        }
        case 'GET_USER_PAGINATE': {
            return { ...state, paginateUser: action.userPaginate }
        }
        case 'GET_CATEGORY': {
            return { ...state, categoryList: action.category.category}
        }
        case 'INPUT': {
            return { ...state, category: action.category, product: action.product, page: action.page }
        }
        case 'CHOOSE_COLOR': {
            let productUpdate = { ...state.product }
            let index = productUpdate.color.findIndex((color) => color === action.color)
            if (index === -1) {
                productUpdate.color.push(action.color)
            }
            return { ...state, product: productUpdate }
        }
        case 'DELETE_COLOR': {
           
            let productUpdate = { ...state.product }
            let index = productUpdate.color.findIndex(color => color === action.data)
            if (index !== -1) {
                productUpdate.color.splice(index, 1)
            }
            return { ...state, product: productUpdate }
        }
        case 'DELETE_SIZE': {
            let productUpdate = { ...state.product }
            let index = productUpdate.size.findIndex((size) => size === action.data)
            if (index !== -1) {
                productUpdate.size.splice(index, 1)
            }
            return { ...state, product: productUpdate }
        }
        case 'CHOOSE_SIZE': {
          
            let productUpdate = { ...state.product }
            let index = productUpdate.size.findIndex((size) => size === action.size)
            if (index === -1) {
                productUpdate.size.push(action.size)
            }
            return { ...state, product: productUpdate }
        }
        case 'INPUT_USER': {
            return { ...state, createUser: action.createUser }
        }
        case 'GET_USER_REQUEST': {
            return { ...state, loading: true }
        }
        case 'END_USER_REQUEST': {
            return { ...state, loading: false }
        }
        case 'DELETE_FILE': {
        
            let productPicturesUpdate = {...state.product}
            let index = productPicturesUpdate.productPictures.findIndex(img => img.name === action.data)
            if (index !== -1) {
                productPicturesUpdate.productPictures.splice(index, 1)
            }
          
            return { ...state,product:productPicturesUpdate }
           
        }
        case 'ADD_CATEGORY': {
            let category = action.payload.category
            let updateCategory = setNewCategory(state.categoryList, category, category.parentId)
            return { ...state, categoryList: updateCategory}
        }
        case 'GET_PRODUCT': {
            return { ...state, productList: action.payload.productItems }
        }
        case 'GET_PRODUCT_PAGINATE': {
            return { ...state, paginateProduct: action.payload }
        }
        case 'EMPTY_ARRAY':{
            let productUpdate={...state.product}
            productUpdate.color.length=0;
            productUpdate.size.length=0;
            productUpdate.productPictures.length=0
            return {...state,product:productUpdate}
        }
        case 'RESET_FORM': {
            // Category
            let categoryValue = { ...state.category }
            for (let item in categoryValue) {
                categoryValue[item] = ''
            }
            // Product
            let productValue = { ...state.product }
            for (let prop in productValue) {
                if (prop !== "averageStar" && prop !== "color" && prop !== "size" && prop !== "productPictures" ) {
                    productValue[prop] = ""
                }
                
            }
       
            return { ...state, category: categoryValue, product: productValue }
        }
        case 'GET_CUSTOMER_ORDER': {
            return { ...state, customerOrders: action.customerOrders }
        }

        case 'GET_ALL_EMAIL': {
            return { ...state, emailServer: action.email }
        }

        default: {
            return { ...state }
        }

    }
}