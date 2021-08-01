import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import classes from '../sass/SidebarAdmin.module.scss'
export default function SidebarAdmin() {
 
    const [toggle, setToggle] = useState(false)
    let renderSidebarSmall = () => {
        return <>
            <div className={classes.user}>
                <NavLink to="/admin/user">
                    <span>
                        <i className={`fa fa-user mr-2`} />
                    </span>
                </NavLink>
            </div>
            <div className={classes.category}>
                <NavLink to="/admin/category">
                    <span>
                   <i className="fa fa-list-alt" />
                    </span>
                </NavLink>
            </div>
            <div className={classes.product}>
                <NavLink to="/admin/product">
                    <span>
                        <i className="fa fa-box" />
                    </span>
                </NavLink>
            </div>
            
            <div className={classes.order}>
                <NavLink to="/admin/order">
                    <span>
                        <i className="fa fa-sticky-note" />
                    </span>
                </NavLink>
            </div>
            <div className={classes.page}>
                <NavLink to="/admin/email">
                    <span>
                    <i className="fa fa-envelope" />
                    </span>
                </NavLink>
            </div>


        </>
    }
    let renderSidebar = () => {
        return <>
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
        </>

    }
    return (
        <div className={toggle ? classes.sidebarContainer : classes.sidebarContainerSmall}>
            <div className="text-right">
                <button className={` ${classes.toggleButton}`}
                    onClick={() => {
                        setToggle(!toggle)
                    }}>
                    <i className={`fa fa-angle-right ${toggle ? classes.arrowLeft : classes.arrowRight}`} />

                </button>
            </div>

            <div className={classes.sidebarItem}>
                {toggle ? renderSidebar() : renderSidebarSmall()}
            </div>

        </div>
    )
}

