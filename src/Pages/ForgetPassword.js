import axios from 'axios'
import React, { useState } from 'react'
import classes from '../sass/ForgetPassword.module.scss'
export default function ForgetPassword() {
    let [emailUser,setEmail]=useState({
        email:''
    })
    let handleSubmit = async(e) => {
       e.preventDefault()
        try {
           await axios({
               url:'https://fes-backend-server.herokuapp.com/user/forget-password',
               method:'POST',
               data:emailUser
           }) 
        } catch (error) {
            console.log(error.response?.data);
        }
    }
    let handleInput = (e) => {
      let {value,name}=e.target
      setEmail({...emailUser,[name]:value})
    }
    console.log(emailUser)
    return (
        <form className={classes.loginContainer} onSubmit={handleSubmit}>
            <div className={classes.loginIntro}>
                <div className={classes.loginIntroContent}>
                    <h2>FES Forget Password</h2>
                    <p>Please input your email before continuing</p>
                </div>
            </div>
            <div className={classes.loginForm}>

                {/* <h3 className={`${classes.titleMobile}`}>FES</h3> */}


                <div className={classes.formGroup}>
                    <label>User Email</label>
                    <div className={classes.emailContainer}>
                        <div className={classes.envelope}>
                            <i className={`fa fa-envelope `} />
                        </div>
                        <input className={classes.email} placeholder="Email Address" name="email"
                           value={emailUser.email} onChange={handleInput} />
                    </div>
                    <div className={classes.groupButton}>
                        <button className={classes.button}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>

        </form>
    )
}
