import { Route } from "react-router"
import classes from '../sass/AdminTemplate.module.scss'
import SidebarAdmin from "../Components/SidebarAdmin"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Button, Result } from "antd"

export const AdminTemplate = (props) => {
    const [toggle, setToggle] = useState(false)
    const [toggleDropdown, setDropDown] = useState(false)
    const signout = () => {
        localStorage.clear()
    }
    if (localStorage.getItem('USER_LOGIN')) {
        let userLogin = JSON.parse(localStorage.getItem('USER_LOGIN'))
        if (userLogin.role === 'admin') {
            let { Component, path } = props
            return (
                <div className={`container-fluid p-0 ${classes.adminTemplate}`}>
                    <SidebarAdmin></SidebarAdmin>
                    <div className={`container-fluid ${classes.navbar}`}>
                        <div className={classes.brand}>
                            <NavLink to="/admin">
                                <h3 className={`mb-0`}>FES ADMIN</h3>
                            </NavLink>

                        </div>
                        <div className={classes.adminRoute} onClick={() => {
                            setToggle(!toggle)
                            setDropDown(!toggleDropdown)
                        }}>
                            <p className={`mb-0 ${classes.adminName}`}>
                                <span className={`mr-2`}>{userLogin.fullName}</span>
                                <i className={`fa fa-angle-down ${toggleDropdown ? classes.arrowDropdown : classes.arrow}`} />
                            </p>
                            <div className={toggle ? classes.dropdown : classes.dropdownHide}>
                                <div className={classes.linkItem}>
                                    <NavLink to="/admin/login" className={classes.link}
                                        onClick={() => {
                                            signout()
                                        }}>Signout</NavLink>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={classes.templateContent}>
                        <Route path={path} render={(propsRoute) => {
                            return <Component {...propsRoute}></Component>
                        }} ></Route>
                    </div>
                </div>
            )

        }
        return <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={[
                <Button><NavLink to="/">Back Home</NavLink></Button>,
                <Button type="primary"><NavLink to="/admin/login">Login as Administrator</NavLink></Button>
            ]}
        />
    }
    return <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={[
            <Button><NavLink to="/">Back Home</NavLink></Button>,
            <Button type="primary"><NavLink to="/admin/login">Login as Administrator</NavLink></Button>
        ]}
    />

}