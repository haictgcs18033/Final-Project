import React from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { notification } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import classes from '../sass/PlaceOrder.module.scss'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handlePaymentCard } from '../redux/action/EcommerceAction';
export default function PaymentCard(props) {
    let history=useHistory()
     const dispatch = useDispatch()
    let { address, cartArray } = props
    let totalPrice = cartArray.reduce((totalPrice, product) => {
        return totalPrice + product.price
    }, 0)
    let arrayProduct = []
    for (let item of cartArray) {
        arrayProduct.push(item.product.name)
    }
    let arrayProductToStripe = arrayProduct.toString()

    let elements = useElements()
    const stripe = useStripe()
    let userLogin = JSON.parse(localStorage.getItem('USER_LOGIN'))
    console.log(userLogin);
    let handleSubmit = async (e) => {
        e.preventDefault()
        const cardData = elements.getElement(CardElement)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardData
        })
        console.log({ paymentMethod, cardData });
        if (error) {
            notification.open({
                message: 'Error',
                description: error.message,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
        }
        else {
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
            let today =new Date()
            let date =today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            let time = today.getHours() + ":" + today.getMinutes() ;
            let payload = {
                addressId: address,
                totalPrice: totalPrice,
                items: arrayItems,
                paymentStatus: 'pending',
                progress: "25",
                paymentType: 'card',
                date:date,
                time:time,
                amount: totalPrice,
                paymentMethodId: paymentMethod.id,
                emailUser: userLogin.email,
                product: arrayProductToStripe
            }
            dispatch(handlePaymentCard(payload,history))
           

        }
    }
   
   
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset className={classes.userCard}>
                    <div >
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '15px',
                                        color: '#FFF',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#FF0000',
                                    },
                                },
                            }}
                        ></CardElement>
                    </div>
                </fieldset>
                <div className={`${classes.confirmButton} d-flex justify-content-end`}>
                    <button>Confirm</button>
                </div>

            </form>
        </div>
    )
}
