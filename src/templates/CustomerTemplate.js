import { Route } from "react-router"
import Footer from "../Components/Footer"
import Header from "../Components/Header"

import classes from '../sass/CustomerTemplate.module.scss'
export const CustomerTemplate = (props) => {
    let { Component, path } = props
    return <div className={classes.customerContainer}>
        <Route path={path} render={(propsRoute) => {
            return <div>
                <Header></Header>
                <Component {...propsRoute}></Component>
                <Footer></Footer>
            </div>
        }}></Route>
    </div>
}