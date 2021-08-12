import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'
import * as action from '../redux/action/EcommerceAction'
import classes from '../sass/Cart.module.scss'
import { notification, Skeleton } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
export default function Cart() {
    const dispatch = useDispatch()
    const cartArray = useSelector(state => state.ecommerceReducer.cartArray)
    const loading = useSelector(state => state.ecommerceReducer.loading)
    // }, [dispatch])

    console.log(cartArray);
    useEffect(() => {
        dispatch(action.getCartItems())
    }, [dispatch])
    console.log(cartArray);
    if (loading) {
        return <Skeleton avatar active paragraph={{ rows: 4 }} />
    }
    let increaseQuantity = (id, quantity, price, limitedPrice,color,size) => {
        dispatch(action.addProduct(id, quantity, price, limitedPrice,color,size))
    }
    let decreaseQuantity = (id, quantity, price, limitedPrice,color,size) => {
        dispatch(action.decreaseItem(id, quantity, price, limitedPrice,color,size))
    }
    let renderCartItems = () => {
        if (cartArray.length === 0) {
            return <p>No Item Found</p>
        }
        if (cartArray) {
            return cartArray.map((item, index) => {
                return <tr key={index} className={classes.product}>
                    <td className={classes.productImage}>
                        <img src={`${item.product?.productPictures[0].img}`} alt="Not found" />
                    </td>
                    <td>
                        <p>{item.product?.name}</p>
                    </td>
                    <td>
                        <p>{item.product?.price}</p>
                    </td>
                    <td className={`${classes.functionQuantity}`}>
                        <div className={`d-flex justify-content-between align-items-center`}>
                            <button className={``}
                                onClick={() => {
                                    decreaseQuantity(item.product._id, 1, item.price, item.limitedPrice,item.color,item.size)
                                }}>
                                <i className="fas fa-minus" />
                            </button>
                            <p className={`mb-0`}>{item.quantity}</p>
                            <button className={``}
                                onClick={() => {
                                    increaseQuantity(item.product._id, 1, item.price, item.limitedPrice,item.color,item.size)
                                }}>
                                <i className="fas fa-plus" />
                            </button>
                        </div>
                    </td>
                    <td><p className={`ml-3`}>{item.price}</p></td>
                    <td className={`${classes.deleteProduct}`} >
                        <button onClick={() => {
                            removeItem(item._id)
                        }}>Delete Item</button>
                    </td>

                </tr>
            })
        }
    }
    let renderCartItemsMobile = () => {
        if (cartArray.length === 0) {
            return <p>No Item Found</p>
        }
        if (cartArray.length > 0) {
            return cartArray.map((item, index) => {
                return <div key={index} className={`${classes.tableProductMobile}`}>
                    <div className={`${classes.productImage}`}>
                        <img src={`${item.product?.productPictures[0].img}`} alt="Not found" />
                    </div>
                    <div className={`${classes.productContent}`}>
                        <div className={`${classes.productName}`}>
                            <p>{item.product?.name}</p>
                            <button className={`${classes.deleteBtn}`} onClick={() => {
                                removeItem(item._id)
                            }}>
                                <i className="fas fa-trash-alt" />
                            </button>
                        </div>
                        <div className={`${classes.productPrice}`}>
                            <p>Price</p>
                            <span>{item.product?.price}</span>
                        </div>
                        <div className={classes.productQuantity}>
                            <p>Quantity</p>
                            <div className={`d-flex justify-content-between align-items-center`}>
                                <button className={``}
                                    onClick={() => {
                                        decreaseQuantity(item.product._id, 1, item.price, item.limitedPrice,item.color,item.size)
                                    }}>
                                    <i className="fas fa-minus" />
                                </button>
                                <span className={`mb-0 mx-2`}>{item.quantity}</span>
                                <button className={``}
                                    onClick={() => {
                                        increaseQuantity(item.product._id, 1, item.price, item.limitedPrice,item.color,item.size)
                                    }}>
                                    <i className="fas fa-plus" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            })
        }
    }
    let removeItem = (id) => {
        dispatch(action.removeItemFromCart(id))
    }
    let renderCardPrice = () => {
        if (cartArray.length === 0) {
            return <p>No Item Found</p>
        }
        if (cartArray) {
            return cartArray.map((item, index) => {
                return <div className="d-flex justify-content-between" key={index}>
                    <div className={`content`}>
                        <p>{item.product?.name}</p>
                    </div>
                    <div className="price">
                        <p>{item.price}</p>
                    </div>
                </div>
            })
        }
    }
    if (localStorage.getItem('USER_LOGIN')) {
        return (
            <div >
                <div className={`container my-5 ${classes.cartContainer}`}>
                    <h3>Cart</h3>
                    <div className={`${classes.tableProductMobileWrapper}`}>
                        {renderCartItemsMobile()}
                    </div>
                    <div className={` ${classes.cartLayout}`}>

                        <table className={`card  ${classes.tableProduct}`}>
                            <thead className={`card-header `}>
                                <tr >
                                    <th></th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className={`card-body ${classes.productList}`}>
                                {
                                    renderCartItems()
                                }

                            </tbody>
                        </table>
                        <div className={`${classes.price}`}>
                            <div className={`card text-left ${classes.totalPrice}`}>
                                <h5 className="card-header ">Total Price</h5>
                                <div className={`card-body ${classes.totalPriceContent}`}>
                                    {renderCardPrice()}
                                    <div className={`d-flex font-weight-bold justify-content-between`}
                                        style={{ color: '#642ab5', fontSize: '20px' }}>
                                        <p>Total price</p>
                                        {
                                            cartArray.reduce((tongtien, product) => {
                                                let result = tongtien + product.price
                                                return result
                                            }, 0)
                                        }
                                    </div>

                                </div>
                                <div className={`card-footer ${classes.placeOrder}`}>
                                    <NavLink to="/placeOrder">Place Order</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${classes.priceMobile}`}>
                        <div className={`card text-left ${classes.totalPrice}`}>
                            <h5 className="card-header ">Cart totals</h5>
                            <div className={`card-body ${classes.totalPriceContent}`}>
                                {renderCardPrice()}
                                <div className={`d-flex font-weight-bold justify-content-between`}
                                    style={{ color: '#642ab5', fontSize: '20px' }}>
                                    <p>Total</p>
                                    {
                                        cartArray.reduce((tongtien, product) => {
                                            let result = tongtien + product.price
                                            return result
                                        }, 0)
                                    }
                                </div>

                            </div>
                            {/* <div className={`card-footer ${classes.placeOrder}`}>
                                    <NavLink to="/placeOrder">Place Order</NavLink>
                                </div> */}
                        </div>
                    </div>
                    <div className={`card-footer ${classes.placeOrderMobile}`}>
                        <NavLink to="/placeOrder">Place Order</NavLink>
                    </div>
                </div>

            </div>
        )

    } else {
        notification.open({
            message: 'Error',
            description: `Please Login Again`,
            icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
        });
        return <Redirect to="/login" />
    }

}
