import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as action from '../redux/action/EcommerceAction' 
import styles from '../sass/Signup.module.scss'
export default function Signup() {
    const userInfoSignup = useSelector(state => state.ecommerceReducer.userInfoSignup)
    let dispatch=useDispatch()
    let {firstName,lastName,email,password}=userInfoSignup
    let handleChangeInput=(e)=>{
        let{name,value}=e.target
        const newValues={...userInfoSignup}
        newValues[name]=value
        dispatch(action.handleInputSignup(newValues))
    }
    let handleSignupAccount=()=>{
        let dataUser={...userInfoSignup}
        dispatch(action.signupUser(dataUser))
    }
    console.log(userInfoSignup);
    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupIntro}>
                <div className={styles.loginIntroContent}>
                    <h2>FES Signup</h2>
                    <p>Please input your account to signup your first account in our system</p>
                </div>
            </div>
            <div className={styles.signupForm}>
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
                            <input className={styles.firstName} name="firstName" value={firstName} placeholder="First Name" 
                            onChange={handleChangeInput}/>
                        </div>
                        <div className={styles.lastNameContainer}>
                            <label>Last Name</label>
                            <input className={styles.lastName} name="lastName" value={lastName} placeholder="Last Name" 
                            onChange={handleChangeInput}/>
                        </div>
                    </div>
                    <div className={styles.emailContainer}>
                        <p>Email</p>
                        <input className={styles.email} name="email" value={email} placeholder="Email Address" 
                        onChange={handleChangeInput}/>
                    </div>

                    <div className={styles.passwordContainer}>
                        <p>Password</p>
                        <input className={styles.password} name="password" value={password} placeholder="Password" 
                        onChange={handleChangeInput}/>

                    </div>
                    <div className={`${styles.groupButton}`}>
                        <button className={styles.button} onClick={()=>{handleSignupAccount()}}>Signup</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
