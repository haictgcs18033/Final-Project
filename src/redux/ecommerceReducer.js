

const stateDefault = {
    // User
    userInfoSignup:{
        firstName:'',
        lastName:'',
        email:'',
        password:''
    },
    userDetail:{
        firstName:'',
        lastName:'',
        email:'',
        userImage:''
    },
    userImage:'',
  
    // Product
    productAll:[],
    productPaginated:{},
    productList: [],
    productBySlug:[],
    productSlugPaginate:{},
  
    productDetail:{

    },
    productDetailPage:{

    },
    // Cart
    cartArray:[],
    // Place Order
    userAddress:[],
    userInfo:{
      name:'',
      phoneNumber:'',
      address:'',
      city:'',
      alternatePhone:''
    },
    selectedAddress:{},
    // Order
    orderArray:[],
    // Order Status
    orderStatus:{},
    orderId:'',
    // User Detail
    loading:false
}
export const ecommerceReducer = (state = stateDefault, action) => {
    
    switch (action.type) {
        case 'GET_USER_REQUEST':{
            return {...state,loading:true}
        }
        case'END_USER_REQUEST':{
            return {...state,loading:false}
        }
        case 'USER_INPUT_SIGNUP':{
            return {...state,userInfoSignup:action.userInfoSignup}
        }
        case 'GET_PRODUCT_CUSTOMER': {
            return { ...state, productList: action.product }
        }
        case 'GET_ALL_PRODUCT':{
            return {...state,productAll:action.payload}
        }
        case 'GET_PRODUCT_PAGINATE':{
            return {...state,productPaginated:action.payload}
        }
        case 'GET_PRODUCT_BY_SLUG':{
            return {...state,productBySlug:action.payload}
        }
        case 'GET_PRODUCT_PAGINATE_BY_SLUG':{
            return{...state,productSlugPaginate:action.payload}
        }
        case 'GET_PRODUCT_DETAIL':{
             return {...state,productDetail:action.payload.page}
        }
        case 'GET_PRODUCT_DETAIL_PAGE':{
            return{...state,productDetailPage:action.payload.product}
        }
        case'GET_PRODUCT_CART':{
            return{...state,cartArray:action.cart.itemArray,loading:false}
        }
        case 'ADD_TO_CART':{
          console.log(action.product);
        
            let cartArrayUpdate=[...state.cartArray]
            
            let index=cartArrayUpdate.findIndex(product=>product._id===action.product._id)
            if(index===-1){
                cartArrayUpdate.push(action.product)
            }else{
                cartArrayUpdate[index].quantity+=1
                cartArrayUpdate[index].price+=cartArrayUpdate[index].price
            }
            console.log(cartArrayUpdate);
            return {...state,cartArray:cartArrayUpdate}
        }
        case 'INCREMENTAL_DECREMENTAL':{
            console.log(action.quantity);
            let cartArrayUpdate=[...state.cartArray]
            let index=cartArrayUpdate.findIndex(product=>product._id===action.productId)
            if(action.check){
                cartArrayUpdate[index].quantity+=1
            }else{
                if(cartArrayUpdate[index].quantity>1){
                    cartArrayUpdate[index].quantity-=1
                }
            }
            return {...state,cartArray:cartArrayUpdate}
        }
        case 'GET_USER_DETAIL':{
            return {...state,userDetail:action.userDetail}
        }
        case 'INPUT_UPDATE_USER':{
            return {...state,userDetail:action.value}
        }
        case 'GET_USER_ADDRESS':{
            return {...state,userAddress:action.payload.userAddress.address,loading:false}
        }
        case 'INPUT_PlACE_ORDER':{
            return{...state,userInfo:action.userInfo}
        }
        case'HANDLE_SELECT':{
          return {...state,userAddress:action.updateUserAddress}
        }
        case 'HANDLE_CANCEL_SELECT':{
            return {...state,userAddress:action.updateUserAddress}
        }
        case 'CONFIRM_ADDRESS':{
            return {...state,selectedAddress:action.address}
        }
        case 'SELECT_ADDRESS_AGAIN':{
            let selectedAddressUpdate={...state.selectedAddress}
            for(let item in selectedAddressUpdate){
                delete selectedAddressUpdate[item]
            }
            return {...state,selectedAddress:selectedAddressUpdate}
        }
        case 'RESET_CART':{
            let cartArrayUpdate=[...state.cartArray]
            cartArrayUpdate.length=0
            return {...state,cartArray:cartArrayUpdate}
        }
        // Order Array
        case 'GET_ORDER_ARRAY':{
            return {...state,orderArray:action.orderArray.order}
        }
        // Order Status
       
        case 'GET_ORDER_STATUS':{
            return {...state,orderStatus:action.orderStatus,loading:false}
        }
        default: {
            return { ...state }
        }

    }
}