
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import * as action from '../redux/action/EcommerceAction'
import classes from '../sass/OrderStatus.module.scss'
import moment from 'moment'
import 'antd/dist/antd.css';
import { Timeline, Tooltip, Skeleton } from 'antd';
export default function OrderStatus() {
    let { orderId } = useParams()
    let loading = useSelector(state => state.ecommerceReducer.loading)

    const orderStatus = useSelector(state => state.ecommerceReducer.orderStatus)
    const dispatch = useDispatch()

    console.log(orderStatus);
    useEffect(() => {
        dispatch(action.getOrderStatus(orderId))
    }, [dispatch, orderId])
    let renderAddress = () => {
        if (orderStatus) {
            return <div>
                <h3>Your Address</h3>
                <div className={`${classes.addressInfo}`}>
                    <div className={`${classes.addressPosition}`}>
                        <p>
                            <span className={`font-weight-bold`}>Name : </span>
                            {orderStatus.address?.name}
                        </p>
                        <p>
                            <span className={`font-weight-bold`}>Phone : </span>
                            {orderStatus.address?.phoneNumber}
                        </p>
                        <p>
                            <span className={`font-weight-bold`}>City : </span>
                            {orderStatus.address?.city}
                        </p>
                        <p>
                            <span className={`font-weight-bold`}>Alternative Phone : </span>
                            {orderStatus.address?.alternatePhone}
                        </p>
                    </div>
                </div>
            </div>
        }
    }
    let renderOrderStatus = () => {
        if (orderStatus) {
            return orderStatus.items?.map((product, index) => {
                return <tr key={index}>
                    <td><img src={`${product.product.productPictures[0].img}`} alt="Not found" /></td>
                    <td>{product.product.name}</td>
                    <td>{product.payPrice}</td>
                    <td>{product.purchaseQuantity}</td>
                    <td>
                        <span>{moment(orderStatus.updateAt).format('L')} - </span>
                        <span>{moment(orderStatus.updateAt).format('LT')}</span>
                    </td>

                </tr>

            })
        }
    }
    let renderOrderStatusMobile = () => {
        if (orderStatus) {
            return orderStatus.items?.map((product, index) => {
                return <div className={`my-2 mx-2 ${classes.product}`} key={index}>
                    <div className={`${classes.imageProduct}`}>
                        <img src={`${product.product.productPictures[0].img}`} alt="Not found" />
                    </div>
                    <div className={`${classes.productDetail}`}>
                        <p>
                            <span className={`font-weight-bold`}>Name : </span>
                            {product.product.name}
                        </p>
                        <p>
                            <span className={`font-weight-bold`}>Price : </span>
                            {product.payPrice}
                        </p>
                        <p>
                            <span className={`font-weight-bold`}>Quantity : </span>
                            {product.purchaseQuantity}
                        </p>
                        <p>
                            <span className={`font-weight-bold`}>Order Date : </span><br />
                            <span>{moment(orderStatus.updateAt).format('L')} - </span>
                            <span>{moment(orderStatus.updateAt).format('LT')}</span>
                        </p>
                    </div>
                </div>
            })
        }
    }
    if (loading) {
        return <div style={{height:'582px',display:'flex',justifyContent:'center',alignItems:'center',margin:'0 20px'}}>
            <Skeleton avatar active paragraph={{ rows: 10 }} />
        </div>

    }
    return (

        <div className={`container ${classes.orderStatusWrapper}`}>
            <h2 className={classes.titleOrderStatus}>Order Status</h2>
            <div className={classes.orderStatusMobile}>
                <div className={`${classes.address}`}>
                    <div className="card text-left" style={{ border: 'none' }}>
                        <div className={`card-header ${classes.cardHeader}`}>
                            <h4>Your Address</h4>
                        </div>
                        <div className={`card-body ${classes.cardBody}`}>
                            <div className={`${classes.addressInfo}`}>
                                <div className={`${classes.addressPosition}`}>
                                    <p>
                                        <span className={`font-weight-bold`}>Name : </span>
                                        {orderStatus.address?.name}
                                    </p>
                                    <p>
                                        <span className={`font-weight-bold`}>Phone : </span>
                                        {orderStatus.address?.phoneNumber}
                                    </p>
                                    <p>
                                        <span className={`font-weight-bold`}>City : </span>
                                        {orderStatus.address?.city}
                                    </p>
                                    <p>
                                        <span className={`font-weight-bold`}>Alternative Phone : </span>
                                        {orderStatus.address?.alternatePhone}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${classes.productList}`}>
                    <div className="card text-left" style={{ border: 'none' }}>
                        <div className={`card-header ${classes.cardHeader}`}>
                            <h4>Your Products</h4>
                        </div>
                        <div className={`card-body ${classes.cardBody}`}>
                            <div className={`${classes.orderProduct}`}>
                                <div className={classes.tableProduct}>
                                    {renderOrderStatusMobile()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${classes.status}`}>
                    <div className="card text-left" style={{ border: 'none' }}>
                        <div className={`card-header ${classes.cardHeader}`}>
                            <h4>Status</h4>
                        </div>
                        <div className={`card-body ${classes.cardBody}`}>
                            <div className={`${classes.orderTimeLine}`}>
                                <Timeline pending={orderStatus.progress === 100 ? false : "Pending"}>
                                    {orderStatus.orderStatus?.map((status, index) => {
                                        return status.isCompleted ?
                                            <Timeline.Item key={index} color="green">
                                                <p>
                                                    {status.type}

                                                </p>
                                                <p>  Complete at : {moment(status.date).format('LLLL')}</p>
                                            </Timeline.Item>
                                            :
                                            <Timeline.Item key={index} color="red">
                                                <p>
                                                    {status.type}

                                                </p>
                                                <p> Not yet</p>
                                            </Timeline.Item>
                                    })}
                                </Timeline>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className={`${classes.orderStatusTablet} orderStatusTablet`}>
                <div>
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                                Address
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">
                                Product
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-status-tab" data-toggle="pill" href="#pills-status" role="tab" aria-controls="pills-contact" aria-selected="false">
                                Status
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <div className={`${classes.addressContainer}`}>
                                <p>
                                    <span className={`font-weight-bold`}>Name : </span>
                                    {orderStatus.address?.name}
                                </p>
                                <p>
                                    <span className={`font-weight-bold`}>Phone : </span>
                                    {orderStatus.address?.phoneNumber}
                                </p>
                                <p>
                                    <span className={`font-weight-bold`}>City : </span>
                                    {orderStatus.address?.city}
                                </p>
                                <p>
                                    <span className={`font-weight-bold`}>Alternative Phone : </span>
                                    {orderStatus.address?.alternatePhone}
                                </p>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                            <div className={`${classes.productContainer}`}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product Picture</th>
                                            <th>Name</th>
                                            <th>Pay Price</th>
                                            <th>Quantity</th>
                                            <th>Order Date</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderOrderStatus()}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-status" role="tabpanel" aria-labelledby="pills-contact-tab">
                            <div className={`${classes.statusContainer}`}>
                                <div className={`${classes.orderTimeLine}`}>
                                    <Timeline pending={orderStatus.progress === 100 ? false : "Pending"}>
                                        {orderStatus.orderStatus?.map((status, index) => {
                                            return status.isCompleted ?
                                                <Timeline.Item key={index} color="green">
                                                    <p>
                                                        {status.type}

                                                    </p>
                                                    <p>  Complete at : {moment(status.date).format('LLLL')}</p>
                                                </Timeline.Item>
                                                :
                                                <Timeline.Item key={index} color="red">
                                                    <p>
                                                        {status.type}

                                                    </p>
                                                    <p> Not yet</p>
                                                </Timeline.Item>
                                        })}
                                    </Timeline>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`container p-0 ${classes.orderStatusContainer}`}>
                <div className={` ${classes.address}`}>
                    {renderAddress()}
                </div>
                <div className={`${classes.orderProduct}`}>
                    <h3>Product </h3>
                    <div className={classes.tableProduct}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Picture</th>
                                    <th>Name</th>
                                    <th>Pay Price</th>
                                    <th>Quantity</th>
                                    <th>Order Date</th>

                                </tr>
                            </thead>
                            <tbody>
                                {renderOrderStatus()}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={` ${classes.orderStatus}`}>
                    <h3>Status</h3>
                    <div className={`${classes.orderTimeLine}`}>
                        <Timeline pending={orderStatus.progress === 100 ? false : "Pending"}>
                            {orderStatus.orderStatus?.map((status, index) => {
                                return status.isCompleted ?
                                    <Timeline.Item key={index} color="green">
                                        <Tooltip placement="top" color={"#642ab5"}
                                            title={moment(status.date).format('LLLL')}>
                                            <p>
                                                {status.type}
                                            </p>
                                        </Tooltip>
                                    </Timeline.Item>
                                    :
                                    <Timeline.Item key={index} color="red">
                                        <Tooltip placement="top" color={"#642ab5"}
                                            title={`Not yet`}>
                                            <p>{status.type}</p>
                                        </Tooltip>
                                    </Timeline.Item>
                            })}
                        </Timeline>
                    </div>

                </div>

            </div>

        </div>
    )
}
