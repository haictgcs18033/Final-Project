import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import classes from '../sass/ResetPassword.module.scss'
export default function ResetPassword() {
    let { token } = useParams()
    let [ passwordReset, setPasswordReset ] = useState({
        newPassword: '',
        confirmPassword:''
    })
    let handleSubmit = async(e) => {
        e.preventDefault()
        if(passwordReset.newPassword!==passwordReset.confirmPassword){
            alert('You need to ensure the confirm password must match with your new password')
        }else{
            try{
                await axios({
                    url:`https://fes-backend-server.herokuapp.com/user/reset-password/${token}`,
                    method:"POST",
                    data:passwordReset
                })
                alert('Change password successfully')
             }catch(error){
                 console.log(error.response?.data);
             }
        }
    }
    let handleInput = (e) => {
     let {name,value}=e.target
     setPasswordReset({...passwordReset,[name]:value})
    }
   
    return (
        <form className={classes.loginContainer} onSubmit={handleSubmit}>
            <div className={classes.loginIntro}>
                <div className={classes.loginIntroContent}>
                    <h2>FES Reset Password</h2>
                    <p>Please input and confirm your new password</p>
                </div>
            </div>
            <div className={classes.loginForm}>
                {/* <h3 className={`${classes.titleMobile}`}>FES</h3> */}
                <div className={classes.formGroup}>

                    <div className={classes.emailContainer}>
                        <div className={`form-group`}>
                            <label>New Password</label>
                            <input className={classes.input} placeholder="New password" name="newPassword"
                                value={passwordReset.newPassword} onChange={handleInput} />
                        </div>
                        <div className={`form-group`}>
                            <label>Confirm New Password</label>
                            <input className={classes.input} placeholder="Confirm password" name="confirmPassword"
                              value={passwordReset.confirmPassword} onChange={handleInput} />
                        </div>
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
