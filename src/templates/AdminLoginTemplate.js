import { Route } from "react-router"


import classes from '../sass/CustomerTemplate.module.scss'
export const AdminLoginTemplate = (props) => {
    let { Component, path } = props
    return <div className={classes.customerContainer}>
        <Route path={path} render={(propsRoute) => {
            return <div>
                <Component {...propsRoute}></Component>
            </div>
        }}></Route>
    </div>
}