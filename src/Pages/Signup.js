import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as action from '../redux/action/EcommerceAction'
import styles from '../sass/Signup.module.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
export default function Signup() {
    // const userInfoSignup = useSelector(state => state.ecommerceReducer.userInfoSignup)
   
    // let {firstName,lastName,email,password}=userInfoSignup
    // let handleChangeInput=(e)=>{
    //     let{name,value}=e.target
    //     const newValues={...userInfoSignup}
    //     newValues[name]=value
    //     dispatch(action.handleInputSignup(newValues))
    // }
    // let handleSignupAccount = () => {
    //     // let dataUser={...userInfoSignup}
    //     // dispatch(action.signupUser(dataUser))
    // }
    let dispatch = useDispatch()
    // Validation
    let validation = Yup.object({
        firstName: Yup.string()
            .trim("Not white space")
            .strict()
            .max(15, "Less than 15 character")
            .required("First name is not empty"),
        lastName: Yup.string()
            .trim("Not white space")
            .strict()
            .max(15, "Less than 15 character")
            .required("Last name is not empty"),
        email: Yup.string()
            .trim("Not white space")
            .strict()
            .email("Invalid Email")
            .max(50, "Email must be less than 50 character")
            .required("Email is not empty"),
        password: Yup.string()
            .trim("Not white space")
            .strict()
            .max(15, "Maximum 15 character")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                "Minimum 8 characters, at least one letter , one number and no special character"
            )
            .required('Passwrod is not empty')
    })
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: validation,
        onSubmit: values => {
            console.log(values);
            dispatch(action.signupUser(values))
        }
    })
    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupIntro}>
                <div className={styles.loginIntroContent}>
                    <h2>FES Signup</h2>
                    <p>Please input your account to signup your first account in our system</p>
                </div>
            </div>
            <form className={styles.signupForm} onSubmit={formik.handleSubmit}>
                <h3 className={styles.titleMobile}>Signup for FES</h3>
                <h3>Input your information</h3>
                <div className={styles.navigateGroup}>
                    <NavLink to="/login" className={styles.login}>Login</NavLink>
                    <NavLink to="/signup" className={styles.signup}>Signup</NavLink>
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.fullName}>
                        <div className={styles.firstNameContainer}>
                            <label>First Name</label>
                            <input className={styles.firstName} name="firstName" value={formik.values.firstName} placeholder="First Name"
                                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.firstName && formik.touched.firstName ?
                                <div style={{ color: 'red', margin: '10px 0' }}>{formik.errors.firstName}</div> :
                                null
                            }
                        </div>

                        <div className={styles.lastNameContainer}>
                            <label>Last Name</label>
                            <input className={styles.lastName} name="lastName" value={formik.values.lastName} placeholder="Last Name"
                                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.lastName && formik.touched.lastName ?
                                <div style={{ color: 'red', margin: '10px 0' }}>{formik.errors.lastName}</div> :
                                null
                            }
                        </div>
                    </div>
                    <div className={styles.emailContainer}>
                        <p>Email</p>
                        <input  className={styles.email} type="text" name="email" value={formik.values.email} placeholder="Email Address"
                            onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.email && formik.touched.email ?
                            <div style={{ color: 'red', marginBottom: '10px' }}>{formik.errors.email}</div> :
                            null
                        }
                    </div>
                    <div className={styles.passwordContainer}>
                        <p>Password</p>
                        <input autoComplete="new-password" type="password" className={styles.password} name="password" value={formik.values.password} placeholder="Password"
                            onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.password && formik.touched.password ?
                            <div style={{ color: 'red', marginBottom: '10px' }}>{formik.errors.password}</div> :
                            null
                        }
                    </div>
                    <div className={`${styles.groupButton}`}>
                        <button className={styles.button} type="submit">Signup</button>
                    </div>
                </div>
            </form>

        </div>
    )
}
