import { Route } from "react-router"
import { Redirect } from "react-router-dom"
import Footer from "../Components/Footer"
import Header from "../Components/Header"

import classes from '../sass/CustomerTemplate.module.scss'
export const CustomerTemplate = (props) => {
    let { Component, path } = props
  
    if (localStorage.getItem('USER_LOGIN')) {

        let userLogin = JSON.parse(localStorage.getItem('USER_LOGIN'))
        if(userLogin.role==="admin"){
           return <Redirect to="/admin"/>
        }
     
    }
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