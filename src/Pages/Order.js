import React, { useEffect, useState } from 'react'
import classes from '../sass/Order.module.scss'
import * as action from '../redux//action/EcommerceAction'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Modal from 'antd/lib/modal/Modal'
import { Rate } from 'antd';
export default function Order() {
    const orderArray = useSelector(state => state.ecommerceReducer.orderArray)

    console.log(orderArray);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [star, setStar] = useState({
        value: 3
    });
    const [totalItem, setTotalItem] = useState(0)
    const [totalStar, setTotalStar] = useState(0)
    // const [averageStar, setAverageStar] = useState(0)
    let [comment, setComment] = useState({
        text: ''
    })
    let [product, setProduct] = useState({
        _id: '',
        name: '',
        img: '',

    })

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getOrder())
    }, [dispatch])
    const showModal = (product) => {
        let total = product.product.reviews?.reduce((total, star) => {
            return total + star.starRating
        }, 0)
        setTotalStar(total)
        let totalItem = product.product.reviews.length + 1
        setTotalItem(totalItem)

        setProduct({
            _id: product.product._id,
            name: product.product.name,
            img: product.product.productPictures[0].img
        })

        setIsModalVisible(true);
    };

    // console.log(averageStar);
    const handleOk = () => {
        let finalTotal = totalStar + star.value
        let average = Math.ceil(finalTotal / totalItem)
        console.log({ finalTotal, totalItem });
        // setAverageStar(average)

        let review = {
            productId: product._id,
            reviewOfUser: comment.text,
            starRating: star.value,
            averageStar: average
        }
        dispatch(action.addComment(review))
        // setIsModalVisible(false);
    };


    const handleCancel = () => {

        setIsModalVisible(false);
    };
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    let handleChangeStar = (value) => {

        setStar({
            value: value
        })
    }
    let handleInputComment = (e) => {
        let { name, value } = e.target
        setComment({ ...comment, [name]: value })
    }
    let renderProductOrder = () => {
        if (orderArray) {
            return orderArray.map((order) => {
                return order.items?.map((item, index) => {
                    return <tr key={index} className={classes.productOrder}>
                        <td className={`px-2`}>{item._id}</td>

                        <td><p>{item.product?.name}</p></td>

                        <td><p>{order.paymentType}</p></td>
                        <td className={`px-2`}>
                            <button type="primary">
                                <NavLink to={`/order/orderstatus/${order._id}`}>View</NavLink>
                            </button>
                            <button className={`${classes.reviewProduct}`} onClick={() => { showModal(item) }} >
                                Review
                            </button>


                        </td>

                    </tr>
                })
            })
        }

    }
    let renderProductOrderPhone = () => {
        if (orderArray) {
            return orderArray.map((order) => {
                return order.items?.map((item, index) => {
                    return <div key={index} className={classes.productOrderPhone}>
                        <div className={`${classes.productDetail}`}>
                            <div className={`${classes.productContent} ml-4`}>
                                <h5><span className={`mr-2`}>Order Id : </span>{item._id}</h5>
                                <p><span className={`mr-2 font-weight-bold`}>Product Name : </span>{item.product?.name}</p>
                                <p><span className={`mr-2 font-weight-bold`}>Payment Type : </span>{order.paymentType}</p>
                            </div>
                        </div>

                        <div className={`${classes.viewProduct}`}>

                            <NavLink to={`/order/orderstatus/${order._id}`}>View</NavLink>
                            <button className={`${classes.reviewProduct}`} onClick={() => { showModal(item) }} >
                                Review
                            </button>

                        </div>
                        
                    </div>
                })
            })
        }
    }
    return (
        <div>
            <div className={`my-5 container  ${classes.orderPageContainer}`}>
                <h3>Ordered Products</h3>
                {
                    orderArray.length === 0 ?
                        <p>There is no order</p> :
                        <table className={`w-100 text-center  ${classes.tableProduct}`}>
                            <thead>
                                <tr>
                                    <th>Order Id</th>

                                    <th>Product Name</th>

                                    <th>Payment Type</th>
                                    <th className={`px-2`}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderProductOrder()}
                            </tbody>
                        </table>
                }
                <Modal title="Review" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <div className={`mb-3 ${classes.productReviewDetail}`}>
                        <img src={`${product.img}`}
                            alt={`Not found`}
                        />
                        <p>{product.name}</p>
                    </div>
                    <div className={`${classes.productRating}`}>
                        <div className={`${classes.ratingStar}`}>
                            <h5 className={`mb-3`}>Please rating your product</h5>
                            <Rate tooltips={desc} onChange={handleChangeStar} value={star.value} />
                            {star.value ? <span className="ant-rate-text">{desc[star.value - 1]}</span> : ''}
                        </div>

                    </div>
                    <div className={`${classes.productReview}`}>
                        <div className={`${classes.comment}`}>
                            <textarea className={`form-control ${classes.input}`}
                                name="text" value={comment.text} onChange={handleInputComment}
                                placeholder="Add your comment here..."></textarea>

                        </div>
                    </div>
                </Modal>

            </div>
            <div className={`container ${classes.orderPageContainerPhone}`}>
                <h3>Ordered Products</h3>
                {
                    orderArray.length === 0 ?
                        <p>There is no order</p> :
                        <div >
                            {renderProductOrderPhone()}
                        </div>
                }
            </div>

        </div>
    )
}
