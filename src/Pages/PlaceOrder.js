import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from '../sass/PlaceOrder.module.scss'
import * as action from '../redux/action/EcommerceAction'
import { Redirect } from 'react-router'
import { Button, Checkbox, Skeleton, Result, Spin, Radio, Space } from 'antd';
import Modal from 'antd/lib/modal/Modal'
import { useHistory } from 'react-router-dom'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentCard from './PaymentCard'
import { useFormik } from 'formik'
import * as Yup from 'yup'
// Stripe
const publicKeyStripe = 'pk_test_51J3dHQHJeKAJERAdZNHtez4Gva9DQe0FuFeEEPozUyYGTvfQsQNT1tQK6Djl9AS5039Bwzm52YmEyUyMkotkX8mm00Ew5BhdAN'
const stripe = loadStripe(publicKeyStripe);
export default function PlaceOrder() {
    let loading = useSelector(state => state.ecommerceReducer.loading)
    let userAddress = useSelector(state => state.ecommerceReducer.userAddress)
    let selectedAddress = useSelector(state => state.ecommerceReducer.selectedAddress)
    const cartArray = useSelector(state => state.ecommerceReducer.cartArray)
    // History
    let history = useHistory()

    // console.log(selectedAddress);
    // let userInfo = useSelector(state => state.ecommerceReducer.userInfo)
    // console.log(userAddress);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [products, setProducts] = useState(false)
    const [payment, setPayment] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)

    // Cash
    let [cash, setCash] = useState(false)
    // Card Input
    let [cardInput, setCardInput] = useState(false)

    // console.log(userAddress);

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getAddress())
    }, [dispatch])
    useEffect(() => {
        dispatch({
            type: 'SELECT_ADDRESS_AGAIN'
        })
    }, [dispatch])

    let handleChooseAddress = (e) => {
        let { value } = e.target
        // console.log(value);
        // console.log(checked);
        let userAddressUpdate = []
        for (let item of userAddress) {
            if (item._id === value._id) {
                userAddressUpdate.push({ ...item, select: "choose" })
            } else {
                userAddressUpdate.push({ ...item, select: "notchoose" })
            }
        }
        // console.log(userAddressUpdate);
        dispatch({
            type: 'HANDLE_SELECT',
            updateUserAddress: userAddressUpdate
        })


    }
    //    Modal add address
    // let handleInput = (e) => {
    //     let { value, name } = e.target
    //     let newValues = { ...userInfo }
    //     newValues[name] = value
    //     dispatch(action.handleInputPlaceOrder(newValues))
    // }
    // let handleAddAddress = (e) => {
    //     e.preventDefault()
    //     let userData = { ...userInfo }
    //     console.log(userData);
    //     // dispatch(action.handleCreateAddress(userData))
    //     // setIsModalVisible(false);
    // }
    // Modal Create
    let validation = Yup.object({
        name: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, "Less than 50 character")
            .required('User name is not empty'),
        phoneNumber: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, 'Less than 50 character')
            .matches(/^[0-9]*$/, "Please input only number")
            .required('Phone number is not empty'),
        address: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, "Less than 50 character")
            .required('Address is not empty'),
        city: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, "Less than 50 character")
            .required('City is not empty'),
        alternatePhone: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, 'Less than 50 character')
            .matches(/^[0-9]*$/, "Please input only number")
            .required('Alternative phone number is not empty'),
    })
    let formik = useFormik({
        initialValues: {
            name: '',
            phoneNumber: '',
            address: '',
            city: '',
            alternatePhone: ''
        },
        validationSchema: validation,
        onSubmit: (values) => {

            setIsModalVisible(false);
            dispatch(action.handleCreateAddress(values))
        }
    })
    const showModal = () => {
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };


    //   Render Selected Address
    const renderSelectedAddress = () => {

        return <div className={classes.selectedAddress}>
            <h5>Selected Address</h5>
            <p>{selectedAddress.name}</p>
            <p>{selectedAddress.address}</p>
            <p>{selectedAddress.phoneNumber}</p>
            <p>{selectedAddress.city}</p>
            <p>{selectedAddress.alternatePhone}</p>
            <button onClick={() => {
                selectAddressAgain();
                setProducts(false)
            }}>Cancel</button>
        </div>
    }
    let selectAddressAgain = () => {
        dispatch({
            type: 'SELECT_ADDRESS_AGAIN'
        })

    }
    // Product List
    let renderProductList = () => {
        if (cartArray.length === 0) {
            return <p>No product order</p>
        }
        if (cartArray && payment === false) {
            return cartArray.map((item, index) => {
                return <div key={index} className={classes.productItem}>
                    <div className={classes.productImg}>
                        <img src={`${item.product.productPictures[0].img}`} alt="Not found" />
                    </div>
                    <div className={classes.productItemDetail}>
                        <h5>{item.product.name}</h5>
                        <p>
                            <span className="font-weight-bold">Description : </span>
                            <span>{item.product.description}</span>
                        </p>
                        <p>
                            <span className="font-weight-bold">Quantity : </span>
                            <span>{item.quantity}</span>
                        </p>
                        <p>
                            <span className="font-weight-bold">Color : </span>
                            <span>{item.color}</span>
                        </p>
                        <p>
                            <span className="font-weight-bold">Size : </span>
                            <span>{item.size}</span>
                        </p>
                        <div className={`d-flex my-2 ${classes.quantity}`}>
                            <button
                                onClick={() => {
                                    decreaseQuantity(item.product._id, 1, item.price, item.limitedPrice, item.color, item.size)
                                }}>
                                <i className="fas fa-minus" />
                            </button>
                            <p className={`mx-4`}>{item.quantity}</p>
                            <button
                                onClick={() => {
                                    increaseQuantity(item.product._id, 1, item.price, item.limitedPrice, item.color, item.size)
                                }}>
                                <i className="fas fa-plus" />
                            </button>
                        </div>
                    </div>
                </div>
            })
        } else if (payment) {
            return <div>
                <p>Order Success</p>
                <p>There are {`${cartArray.length}`} products ordered</p>
            </div>
        }
    }
    let increaseQuantity = (id, quantity, price, limitedPrice,color,size) => {
        dispatch(action.addProduct(id, quantity, price, limitedPrice,color,size))
    }
    let decreaseQuantity = (id, quantity, price, limitedPrice,color,size) => {
        dispatch(action.decreaseItem(id, quantity, price, limitedPrice,color,size))
    }
    let confirmProduct = () => {
        setPayment(true)
    }
    // Payment Type
    let handleChangePaymentType = (e) => {
        let { value } = e.target
        if (value === 'card') {
            setCardInput(true)
            setCash(false)
        }
        else if (value === "cash") {
            setCash(true)
            setCardInput(false)
        }
        else {
            setCardInput(false)
            setCash(false)
        }

    }
    if (loading) {
        return <div style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 20px' }}>
            <Skeleton avatar active paragraph={{ rows: 10 }} />
        </div>
    }

    if (localStorage.getItem('USER_LOGIN')) {
        let userLogin = JSON.parse(localStorage.getItem('USER_LOGIN'))
        let renderLayout = () => {
            if (userAddress) {
                return userAddress?.map((address, index) => {

                    if (!address.select) {
                        return <div key={index} className={classes.notCheckValue}>
                            <Checkbox
                                value={address}
                                onChange={handleChooseAddress} className={classes.addressUser}
                            >
                                <div className={classes.infor}>

                                    <p>
                                        {address.name}
                                    </p>
                                    <p>{address.phoneNumber}</p>
                                    <p>{address.address}</p>
                                    <p>{address.city}</p>
                                    <p>{address.alternatePhone}</p>

                                </div>

                            </Checkbox>


                        </div>
                    } else {
                        return <div key={index} className={address.select === "choose" ? classes.checkValue : classes.notCheckValue}>
                            <div className={classes.addressInfo}>
                                <Checkbox
                                    checked={address.select === "choose" ? true : false}
                                    // disabled={address.select === "choose" ? true: false}
                                    value={address}
                                    onChange={handleChooseAddress} className={address.select === "choose" ? classes.chooseAddress : classes.addressUser}
                                >
                                    <div className={classes.infor}>

                                        <p>
                                            {address.name}
                                        </p>
                                        <p>{address.phoneNumber}</p>
                                        <p>{address.address}</p>
                                        <p>{address.city}</p>
                                        <p>{address.alternatePhone}</p>

                                    </div>

                                </Checkbox>
                                <div className={`${classes.breakdownFlex}`}></div>
                                {
                                    address.select === "choose" ?
                                        <div className={classes.functionAddress}>


                                            <button className={`${classes.deliver}`} onClick={() => {
                                                handleDeliver(address)
                                            }}>Deliver</button>
                                        </div> :
                                        ''
                                }


                            </div>


                        </div>

                    }



                })
            } else if (userAddress.length === 0) {
                return <p>Please provide your address</p>
            }
        }
        let handleDeliver = (address) => {
            dispatch({
                type: 'CONFIRM_ADDRESS',
                address: address
            })
            setProducts(true)
            dispatch(action.getCartItems())

        }

        let handleOrderSuccess = () => {
            let addressId = selectedAddress._id
            let totalPrice = cartArray.reduce((totalPrice, product) => {
                return totalPrice + product.price
            }, 0)
            let arrayItems = []
            for (let item of cartArray) {
                arrayItems.push(
                    {
                        product: item.product._id,
                        payPrice: item.limitedPrice,
                        purchaseQuantity: item.quantity
                    }
                )
            }
            let payload = {
                addressId: addressId,
                totalPrice: totalPrice,
                items: arrayItems,
                paymentStatus: 'pending',
                progress: "25",
                paymentType: 'cash'
            }
            console.log(payload);
            dispatch(action.handleOrderProduct(payload))
            setOrderSuccess(true)
        }
        let handleBackHome = () => {
            history.push('/')
        }
        let handleGoToOrder = () => {
            history.push('/order')
        }
        return (
            <div>
                {
                    orderSuccess ?
                        <div className={classes.placeOrderContainer}>
                            <Result
                                status="success"
                                title="Successfully Purchased"
                                subTitle="Thank you very much . You can check your order status by clicking check order button"
                                extra={[
                                    <button className={classes.backToHome} key="console"
                                        onClick={
                                            handleBackHome
                                        }>
                                        Home
                                    </button>,
                                    <button className={classes.buyAgain}
                                        onClick={handleGoToOrder}>Check Order</button>
                                ]}
                            />
                        </div>
                        :
                        <div className={classes.placeOrderContainer}>
                            <div className={classes.userAccount}>
                                <div className={classes.successStep}>
                                    <h3>
                                        <i className="fas fa-check-circle" />
                                    </h3>
                                </div>
                                <div className={classes.detail}>
                                    <h4>User</h4>
                                    <p>{userLogin.email}</p>
                                </div>
                            </div>
                            <div className={classes.address}>
                                {
                                    products ?
                                        <div className={classes.successStep}>
                                            <h3> <i className="fas fa-check-circle" /></h3>
                                        </div> :
                                        <div className={classes.step}>
                                            <h3><Spin size="large" /></h3>
                                        </div>
                                }

                                <div className={classes.detail}>
                                    <div className={classes.addAddress}>
                                        <h4>Address</h4>
                                        <Button type="primary" onClick={showModal}>
                                            Add Address
                                        </Button>
                                        <Modal title="Add Address" visible={isModalVisible} onOk={formik.handleSubmit} onCancel={handleCancel}>
                                            <form >
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input className="form-control" name="name" value={formik.values.name}
                                                        onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                    {formik.errors.name && formik.touched.name ?
                                                        <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formik.errors.name}</p> :
                                                        null
                                                    }
                                                </div>
                                                <div className="form-group" >
                                                    <label>Phone Number</label>
                                                    <input className="form-control" name="phoneNumber" value={formik.values.phoneNumber}
                                                        onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                    {formik.errors.phoneNumber && formik.touched.phoneNumber ?
                                                        <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formik.errors.phoneNumber}</p> :
                                                        null
                                                    }
                                                </div>
                                                <div className="form-group" >
                                                    <label>Address</label>
                                                    <input className="form-control" name="address" value={formik.values.address}
                                                        onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                    {formik.errors.address && formik.touched.address ?
                                                        <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formik.errors.address}</p> :
                                                        null
                                                    }
                                                </div>
                                                <div className="form-group">
                                                    <label>City</label>
                                                    <input className="form-control" name="city" value={formik.values.city}
                                                        onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                    {formik.errors.city && formik.touched.city ?
                                                        <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formik.errors.city}</p> :
                                                        null
                                                    }
                                                </div>
                                                <div className="form-group">
                                                    <label>Alternative Phone</label>
                                                    <input className="form-control" name="alternatePhone" value={formik.values.alternatePhone}
                                                        onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                    {formik.errors.alternatePhone && formik.touched.alternatePhone ?
                                                        <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formik.errors.alternatePhone}</p> :
                                                        null
                                                    }
                                                </div>
                                            </form>

                                        </Modal>

                                    </div>

                                    {
                                        Object.keys(selectedAddress).length === 0 ?
                                            <div className={`${classes.addressContainer}`}>
                                                {renderLayout()}
                                            </div>
                                            :
                                            <div className={`${classes.addressContainer}`}>
                                                {renderSelectedAddress()}
                                            </div>


                                    }


                                </div>
                            </div>
                            <div className={classes.productList}>
                                {
                                    payment && products ?
                                        <div className={classes.successStep}>
                                            <h3> <i className="fas fa-check-circle" /></h3>
                                        </div> :
                                        <div className={classes.step}>
                                            <h3><Spin size="large" /></h3>
                                        </div>
                                }

                                <div className={classes.detail}>
                                    {
                                        products ?
                                            <div className={`d-flex justify-content-between ${classes.productListConfirm}`}>
                                                <h4>Product Lists</h4>
                                                <div>
                                                    {
                                                        payment ? <button
                                                            onClick={() => {
                                                                setPayment(false)
                                                            }}>Cancel</button> :
                                                            <button onClick={() => {
                                                                confirmProduct()
                                                            }}>Confirm</button>
                                                    }
                                                </div>
                                            </div>
                                            :
                                            <h4>Product Lists</h4>
                                    }

                                    {
                                        products ?
                                            <div>
                                                <div className={classes.productListContainer}>
                                                    {renderProductList()}
                                                </div>
                                            </div> : <p>There are not any product</p>
                                    }
                                </div>
                            </div>
                            <div className={classes.payment}>
                                <div className={classes.step}>
                                    <h3><Spin size="large" /></h3>
                                </div>
                                <div className={classes.detail}>
                                    {
                                        payment ?
                                            <div className={`d-flex justify-content-between ${classes.paymentConfirm}`}>
                                                <h4>Payment</h4>

                                            </div> :
                                            <h4>Payment</h4>
                                    }
                                    {
                                        payment ?
                                            <div>
                                                <div className={classes.radioGroup}>
                                                    <Radio.Group onChange={handleChangePaymentType}>
                                                        <Space direction="vertical">
                                                            <Radio value={'cash'}>Cash on deliver</Radio>
                                                            <Radio value={'card'}>Cash by your card</Radio>
                                                        </Space>
                                                    </Radio.Group>
                                                </div>
                                                {
                                                    cash ? <div className={`${classes.confirmButton} d-flex justify-content-end`}>
                                                        <button onClick={() => {
                                                            handleOrderSuccess()
                                                        }}>Confirm</button>
                                                    </div> : ''

                                                }


                                                {
                                                    cardInput ?
                                                        <Elements stripe={stripe} >
                                                            <PaymentCard address={selectedAddress._id}
                                                                cartArray={cartArray}
                                                            />
                                                        </Elements >
                                                        :
                                                        ''
                                                }
                                            </div> :
                                            ''
                                    }
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    } else {
        alert("You need to login First")
        return <Redirect to="/login" />
    }

}
