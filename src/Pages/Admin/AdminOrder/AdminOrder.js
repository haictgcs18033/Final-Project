import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../../../redux/action/AdminAction'
import classes from '../AdminOrder/AdminOrder.module.scss'
import { message, Progress, Skeleton } from 'antd';
import { Select } from 'antd';

import Modal from 'antd/lib/modal/Modal';
export default function AdminOrder() {
    const customerOrders = useSelector(state => state.adminReducer.customerOrders)
    const loading = useSelector(state => state.adminReducer.loading)
    const dispatch = useDispatch()
    const [modalOrderStatus, setModalOrderStatus] = useState(false);
    let [completeOrder,setCompleteOrder]=useState([])
    const [payload, setPayload] = useState({
        orderId: '',
        type: '',
        progress: '',
        paymentStatus: '',

    })
    let [searchTerm,setSearchTerm]=useState('')
    const [selectKey, setSelectKey] = useState('')
    useEffect(() => {
        dispatch(action.getCustomerOrder())
    }, [dispatch])
    
    const { Option } = Select;
    let handleChange = (value) => {
        if (value === "packed") {
            setPayload(
                payload.type = value,
                payload.progress = 50,
                payload.paymentStatus === 'pending'
            )
            setModalOrderStatus(true)
        }
        if (value === "shipped") {
            setPayload(payload.type = value, payload.progress = 75, payload.paymentStatus = 'pending')
            setModalOrderStatus(true)
        }
        if (value === "delivered") {
            setPayload(payload.type = value, payload.progress = 100, payload.paymentStatus = 'completed')
            setModalOrderStatus(true)
        }
    }
    if (loading) {
        return <div className={classes.load}>
            <Skeleton active avatar paragraph={{ rows: 4 }} />
        </div>

    }
    
   
    const handleOk = () => {
        message.success('Handling this order successfully');
        dispatch(action.handleOrderStatus(payload))
        setModalOrderStatus(false);
    };
    const handleCancel = () => {
        setSelectKey(Math.random().toString(10))
        setModalOrderStatus(false);
    };
    let handleChoose = (orderId) => {
        setPayload({ ...payload, orderId: orderId })
    }
    let handleNoOrder = () => {
        if (customerOrders.length === 0) {
            return <p className={classes.noOrder}>There is no order for handling</p>
        } else {
            let checkedArray = customerOrders?.every((item) => {
                return item?.progress === 100
            })
            if (checkedArray) {
                return <p className={classes.noOrder}>There is no order for handling</p>
            }
        }
      
    }
 
    let handleSearch =  (e) => {
        let { value } = e.target
        setSearchTerm(value)
     
    }
    let handleRenderCompleteOrder=()=>{
        let completeOrder=customerOrders.filter((order)=>order.progress===100)
        setCompleteOrder(completeOrder)
    }
    console.log(customerOrders);
    return (
        <div className={classes.orderContainer}>
            <div className={classes.orderTitle}>
                <h3>
                    Admin Order
                </h3>
            </div>
            <div className={classes.orderWrapper}>
                <div className={classes.sortAndSearch}>
                    <button className={`button dropdown-toggle ${classes.dropdownButton}`} type="button"
                        data-toggle="modal" data-target="#exampleModalCreate"
                        onClick={()=>{
                            handleRenderCompleteOrder()
                        }}
                       >
                        View Completed Order
                    </button>
                    <form className="modal fade"
                        id="exampleModalCreate"
                        role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true"
                    >
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Completed order</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className={`modal-body ${classes.modalCompleted}`}>
                                    <div className={`${classes.search}`}>
                                        <input  className={`form-control`} placeholder="Search completed order by id"
                                        onChange={handleSearch}/>
                                        <i className="fa fa-search" />
                                    </div>
                                    <div className={`${classes.orderGroup}`}>
                                        {
                                            
                                                completeOrder?.filter(order=>{
                                                    if(searchTerm===""){
                                                        return order
                                                    }else if(order._id.toLowerCase().includes(searchTerm.toLowerCase())){
                                                         return order
                                                    }
                                                   return false
                                                }).map((order, index) => {
                                                    return <div key={index} className={`bg-dark p-4 ${classes.selectContainerWrapper} mb-3`}
                                                    >
                                                        <div className={classes.selectContainer}>
                                                            <h3>Order Id : {order?._id}</h3>
                                                        </div>
                                                        {order?.items.map((item, index) => {
                                                            return <div key={index} className={classes.orderInfo}>
                                                                <p>Product Id : {item._id}</p>
                                                                <p>Product name : {item.product?.name}</p>
                                                                <p>Total price : {item.payPrice}</p>
                                                                <Progress strokeColor={{
                                                                    from: '#108ee9',
                                                                    to: '#87d068',
                                                                }}
                                                                    percent={order.progress}
                                                                    status="active" />
                                                            </div>
                                                        })}
                                                    
                                                    </div>
                                                })
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
               

                <div className={classes.productContainer}>
                    {handleNoOrder()}
                    {
                        customerOrders?.map((order, index) => {
                            if (order?.progress === 100) {
                                return ''
                            }
                            return <div key={index} className={`bg-dark p-4 ${classes.selectContainerWrapper}`}
                            >
                                <div className={classes.selectContainer}>
                                    <h3>Order Id : {order?._id}</h3>
                                   
                                    <Select key={selectKey} defaultValue="Order Status" className={classes.select} onChange={handleChange} onClick={() => { handleChoose(order._id) }}>
                                        {order?.orderStatus.map((status, index) => {
                                            return status.isCompleted === false ?
                                                <Option key={index} value={status.type} >{status.type}</Option> :
                                                <Option key={index} value={status.type} disabled={true}>{status.type}</Option>
                                        })}
                                    </Select>
                                </div>
                                {order?.items.map((item, index) => {
                                    return <div key={index} className={classes.orderInfo}>
                                        <p>Product Id : {item._id}</p>
                                        <p>Product name : {item.product?.name}</p>
                                        <p>Total price : {item.payPrice}</p>
                                        <Progress strokeColor={{
                                            from: '#108ee9',
                                            to: '#87d068',
                                        }}
                                            percent={order.progress}
                                            status="active" />
                                    </div>
                                })}
                                {/* {order.progress === 100 ? <button>Confirm</button> : ''} */}
                            </div>
                        })
                    }
                    <Modal title="Order Status" visible={modalOrderStatus} onOk={handleOk} onCancel={handleCancel}>
                        Are you sure want to continue . Nothing is comeback
                    </Modal>
                </div>
            </div>
        </div>
    )
}
