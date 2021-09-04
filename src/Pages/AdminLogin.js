import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import classes from '../sass/LoginAdmin.module.scss'
import * as action from '../redux/action/EcommerceAction'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
export default function AdminLogin(props) {
    const dispatch = useDispatch()
   
    let [typeText, setTypeText] = useState(false)
    
    // Validation
    let validate = Yup.object({
        email: Yup.string()
            .trim('Not white space')
            .strict()
            .email('Invalid email')
            .required('Email is not empty'),
        password: Yup.string()
            .trim('Not white space')
            .strict()
            .required("Password is not empty")
    })
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validate,
        onSubmit: values => {
            console.log(values);
            dispatch(action.loginAdmin(values, props))
        },
    });

    return (
        <div className={classes.loginAdminContainers}>
            <form className={classes.loginContainer} onSubmit={formik.handleSubmit}>
                <div className={classes.loginWrapper}>
                    <h3 className="text-center">FES</h3>
                    <p>Welcome back !</p>
                    <div className={`form-group ${classes.formGroup}`}>
                        <label>Email</label>
                        <input className={`form-control`} name='email'
                            value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                      
                    </div>
                    {formik.errors.email && formik.touched.email ? <div style={{ color: "red", marginBottom: '10px' }}>{formik.errors.email}</div> : null}
                    <div className={`form-group`}>
                        <label>Password</label>
                        <div className={classes.password}>
                            <input type={`${typeText ? 'text' : 'password'}`} name="password"
                                value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <i className={`fa fa-eye ${classes.eye}`} onClick={() => {
                                setTypeText(!typeText)
                            }} />
                            
                        </div>
                        {formik.errors.password && formik.touched.password ? <div style={{ color: "red", marginTop: '10px' }}>{formik.errors.password}</div> : null}

                    </div>
                    <div className={classes.link}>
                        <NavLink to="/">Don't have account ?</NavLink>
                        <NavLink to="/forget-password">Forget Password ?</NavLink>
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
