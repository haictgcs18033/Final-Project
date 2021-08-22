import { Route } from "react-router"
import classes from '../sass/AdminTemplate.module.scss'
import SidebarAdmin from "../Components/SidebarAdmin"
import {  useState } from "react"
import { NavLink } from "react-router-dom"
import { Button, Result } from "antd"
import { Drawer } from 'antd'

export const AdminTemplate = (props) => {
  
    const [toggle, setToggle] = useState(false)
    const [toggleDropdown, setDropDown] = useState(false)
    let [visible, setVisible] = useState(false)
    
  
    const signout = () => {
        localStorage.clear()
    }
    // Drawer Mobile
    let handleOpenDrawer = () => {
        setVisible(true)
    }
    let onClose = () => {
        setVisible(false)
    }
    if (localStorage.getItem('USER_LOGIN')) {
        let userLogin = JSON.parse(localStorage.getItem('USER_LOGIN'))
        if (userLogin.role === 'admin') {
            let { Component, path } = props
            return (
                <div className={`container-fluid p-0 ${classes.adminTemplate}`}>
                    <SidebarAdmin></SidebarAdmin>
                    <div className={`container-fluid ${classes.navbar}`}>
                        <Drawer
                            title="Product Filter"
                            placement={'left'}
                            closable={false}
                            onClose={onClose}
                            visible={visible}
                            bodyStyle={{ padding: '0', background: 'white' }}
                            headerStyle={{ background: '#2370f4', border: '1px solid #2370f4', color: 'white' }}
                        >
                            <div className={classes.navigateGroup}>
                                <div className={classes.user}>
                                    <NavLink to="/admin/user">
                                        <span>
                                            <i className={`fa fa-user mr-3`} />
                                        </span>
                                        <span className={classes.content}> </span>
                                        User
                                    </NavLink>
                                </div>
                                <div className={classes.category}>
                                    <NavLink to="/admin/category">
                                        <span>
                                            <i className="fa fa-list-alt mr-3" />
                                        </span>
                                        <span className={classes.content}>   Category</span>

                                    </NavLink>
                                </div>
                                <div className={classes.product}>
                                    <NavLink to="/admin/product">
                                        <span>
                                            <i className="fa fa-box mr-3" />
                                        </span>
                                        <span className={classes.content}>  Product </span>

                                    </NavLink>
                                </div>
                                <div className={classes.order}>
                                    <NavLink to="/admin/order">
                                        <span>
                                            <i className="fa fa-sticky-note mr-3" />
                                        </span>
                                        <span className={classes.content}>  Order</span>

                                    </NavLink>
                                </div>
                                <div className={classes.order}>
                                    <NavLink to="/admin/email">
                                        <span>
                                            <i className="fa fa-envelope mr-3" />
                                        </span>
                                        <span className={classes.content}>Email</span>

                                    </NavLink>
                                </div>
                            </div>
                        </Drawer>
                        <div className={classes.brand}>
                            <button
                                onClick={() => {
                                    handleOpenDrawer()
                                }}>
                                <i class="fas fa-bars"></i>
                            </button>
                            <NavLink to="/admin">
                                <h3 className={`mb-0`}>FES ADMIN</h3>
                            </NavLink>

                        </div>
                        <div className={classes.adminRoute} onClick={() => {
                            setToggle(!toggle)
                            setDropDown(!toggleDropdown)
                        }}>
                            <p className={`mb-0 ${classes.adminName}`}>
                                <span className={`mr-2`}>Hello Admin</span>
                                <i className={`fa fa-angle-down ${toggleDropdown ? classes.arrowDropdown : classes.arrow}`} />
                            </p>
                            <div className={toggle ? classes.dropdown : classes.dropdownHide}>
                                <div className={classes.linkItem}>
                                    <NavLink to="/admin/account" className={classes.link}
                                       >Account</NavLink>
                                </div>

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