
import React, { useEffect } from 'react'
import classes from '../Admin/AdminDashboard.module.scss'
import * as action from '../../redux/action/AdminAction'
import { useDispatch, useSelector } from 'react-redux'
import { PolarArea } from 'react-chartjs-2';
import { Badge, Skeleton } from 'antd';
export default function AdminDashboard() {
    const userArray = useSelector(state => state.adminReducer.userArray)
    const categoryList = useSelector(state => state.adminReducer.categoryList)
    const productList = useSelector(state => state.adminReducer.productList)
    const customerOrders = useSelector(state => state.adminReducer.customerOrders)
    let loading = useSelector(state => state.adminReducer.loading)

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getAllUser())
        dispatch(action.getCatgory())
        dispatch(action.getProduct())
        dispatch(action.getCustomerOrder())

    }, [dispatch])

    let allCategory = []
    let renderAllCategory = (categoryList) => {
        for (let item of categoryList) {
            allCategory.push(item)
            if (item.children.length > 0) {
                renderAllCategory(item.children)
            }
        }
        return allCategory.length
    }
    if (loading) {
        return <div style={{height:'100vh',paddingLeft:'130px',paddingTop:'30px'}}>
            <Skeleton active avatar paragraph={{ rows: 4 }} />
        </div>

    }
    // Chart

    let renderCashOrder = (customerOrders) => {
        let cashOrder = []
        let cardOrder = []
        for (let item of customerOrders) {
            if (item.paymentType === "cash") {
                cashOrder.push(item)
            }
            if (item.paymentType === "card") {
                cardOrder.push(item)
            }

        }
        const data = {
            labels: [
                'Cash',
                'Cart',
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [cashOrder.length, cardOrder.length],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',

                ]
            }]
        };
        return data
    }
    console.log(productList);

    return (
        <div className={classes.adminDashboard}>
            <div className={classes.adminManagement}>
                <div className={classes.totalUser}>
                    <div className={classes.content}>
                        <div>
                            <p>Total User</p>
                            <h5>{userArray.length}</h5>
                        </div>
                    </div>
                    <div className={classes.symbol}>
                        <div>
                            <i className={`fa fa-user `} />
                        </div>
                    </div>
                </div>
                <div className={classes.totalProduct}>
                    <div className={classes.content}>
                        <div>
                            <p>Total Product</p>
                            <h5>{productList.length}</h5>
                        </div>
                    </div>
                    <div className={classes.symbol}>
                        <div>
                            <i className="fa fa-box " />
                        </div>
                    </div>
                </div>
                <div className={classes.flexBreak}></div>
                <div className={classes.totalCategory}>
                    <div className={classes.content}>
                        <div>
                            <p>Total Category</p>
                            <h5>{renderAllCategory(categoryList)}</h5>
                        </div>

                    </div>
                    <div className={classes.symbol}>
                        <div>
                            <i className="fa fa-list-alt " />
                        </div>
                    </div>
                </div>
                <div className={classes.totalOrder}>
                    <div className={classes.content}>
                        <div>
                            <p>Total Order</p>
                            <h5>{customerOrders.length}</h5>
                        </div>
                    </div>
                    <div className={classes.symbol}>
                        <div>
                            <i className="fa fa-sticky-note " />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.adminUserDaily}>
                <div className={classes.userContact}>
                    <h4>Contact User</h4>
                </div>
                <div className={classes.flexBreak}></div>
                <div className={classes.dailyTask}>
                    <h4>Daily Task</h4>
                    <div className={classes.taskContainer}>
                        <ul className={classes.taskList}>
                            <li>
                                <i className={classes.taskIconUser}></i>
                                <h5>User Management</h5>
                            </li>
                            <li>
                                <i className={classes.taskIconCategory}></i>
                                <h5>Category Management</h5>
                            </li>
                            <li>
                                <i className={classes.taskIconProduct}></i>
                                <h5>Product Management</h5>
                            </li>
                            <li>
                                <i className={classes.taskIconOrder}></i>
                                <h5>Order Management</h5>
                            </li>
                            <li>
                                <i className={classes.taskIconEmail}></i>
                                <h5>Email Management</h5>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className={classes.adminChart}>
                <div className={classes.chart}>
                    <h4>User's order trending</h4>
                    <div>
                        <PolarArea data={renderCashOrder(customerOrders)} />
                    </div>

                </div>
                <div className={classes.flexBreak}></div>
                <div className={classes.productInStock}>
                    <h4>Product In Stock</h4>
                    <div className={classes.productTable} >
                        {
                            productList?.map((product, index) => {
                                return <Badge.Ribbon text="Stock" color="green">
                                    <div key={index} className={classes.card}>
                                        <img src={`${product.productPictures[0].img}`} alt="Not found" />
                                        <p>{product.name}</p>
                                    </div>
                                </Badge.Ribbon>

                            })
                        }


                    </div>
                </div>

            </div>
        </div>
    )
}
