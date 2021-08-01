import { Result } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import classes from '../sass/PlaceOrder.module.scss'
export default function SuccessOrder() {
    let history=useHistory()
    let handleBackHome = () => {
        history.push('/')
    }
    let handleGoToOrder = () => {
        history.push('/order')
    }
    return (
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
    )
}
