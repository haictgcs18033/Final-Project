import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import classes from '../sass/LoginAdmin.module.scss'
import * as action from '../redux/action/EcommerceAction'
export default function AdminLogin(props) {
    const dispatch = useDispatch()
    let [admin, setAdmin] = useState({
        email: '',
        password: ''
    })
    let [typeText, setTypeText] = useState(false)
    let handleInput = (e) => {
        let { name, value } = e.target
        setAdmin({ ...admin, [name]: value })
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(action.loginAdmin(admin, props))
    }



    return (
        <div className={classes.loginAdminContainers}>
            <form className={classes.loginContainer} onSubmit={handleSubmit}>
                <div className={classes.loginWrapper}>
                    <h3 className="text-center">FES</h3>
                    <p>Welcome back !</p>
                    <div className={`form-group ${classes.formGroup}`}>
                        <label>Email</label>
                        <input className={`form-control`} name='email'
                            value={admin.email} onChange={handleInput} />
                    </div>
                    <div className={`form-group`}>
                        <label>Password</label>
                        <div className={classes.password}>
                            <input type={`${typeText ? 'text' : 'password'}`} name="password"
                                value={admin.password} onChange={handleInput} />
                            <i className={`fa fa-eye ${classes.eye}`} onClick={() => {
                                setTypeText(!typeText)
                            }} />
                        </div>

                    </div>
                    <button className={classes.button}>
                        Login
                    </button>
                </div>

            </form>
            <div className={classes.flexBreak}></div>
            <div className={classes.animateBackground}>
                <div className={classes.backgroundCover}></div>
                <div className={classes.adminLoginContent}>
                    <h3>FES Admin</h3>
                    <p>Please provide your information for us to know who you are</p>
                </div>
                <section>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </section>
            </div>
        </div>

    )
}
