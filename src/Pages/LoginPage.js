import React, { useState } from 'react'
import classes from '../sass/Login.module.scss'
// import logoBrand from '../asset/img/Brand.png'
import { NavLink } from 'react-router-dom'
import { loginHome } from '../redux/action/EcommerceAction'
import { useDispatch } from 'react-redux'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import axios from 'axios'
import swal from 'sweetalert'
export default function LoginPage(props) {
    const dispatch = useDispatch()
    let [user, setUser] = useState({
        email: '',
        password: ''
    })
    let [typeText, setTypeText] = useState(false)
    let handleInput = (e) => {
        let { value, name } = e.target
        setUser({ ...user, [name]: value })
    }
    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginHome(user, props))
    }
    // Google Login
    let responseGoogleSuccess = async (response) => {
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/user/googleLogin',
                method: 'POST',
                data: {
                    tokenId: response.tokenId
                }
            })
            localStorage.setItem('USER_LOGIN', JSON.stringify(result.data.user))
            localStorage.setItem('ACCESS_TOKEN', result.data.token)
            swal({
                title: `Login Successfully`,
                text: "",
                icon: "success",
            });
            props.history.push('/')
        } catch (error) {
            console.log(error.response?.data);
        }
    }
    let responseGoogleFailure = (response) => {
        console.log(response);
    }
    // Facebook Login
    let responseFacebook = async (response) => {
        console.log(response);
        try {
            let result = await axios({
                url: 'https://fes-backend-server.herokuapp.com/user/facebookLogin',
                method: 'POST',
                data: {
                    userID: response.userID,
                    accessToken: response.accessToken
                }
            })
            console.log(result.data);
            localStorage.setItem('USER_LOGIN', JSON.stringify(result.data.user))
            localStorage.setItem('ACCESS_TOKEN', result.data.token)
            swal({
                title: `Login Successfully`,
                text: "",
                icon: "success",
            });
            props.history.push('/')
        } catch (error) {
            console.log(error.response?.data);
        }
    }
    return (
        <form className={classes.loginContainer} onSubmit={handleSubmit}>
            <div className={classes.loginIntro}>
                <div className={classes.loginIntroContent}>
                    <h2>FES Login</h2>
                    <p>Get access to your Orders, our product and more</p>
                </div>
            </div>
            <div className={classes.loginForm}>
                {/* <div className={classes.imgContainer}>
                    <img src={logoBrand} alt='not found' />
                </div> */}
                <h3 className={`${classes.titleMobile}`}>FES</h3>
                <h3>Login into your account</h3>

                <div className={classes.navigateGroup}>
                    <NavLink to="/login" className={classes.loginUser}>Login</NavLink>
                    <NavLink to="/signup" className={classes.signup}>Signup</NavLink>
                </div>
                <div className={classes.formGroup}>
                    <div className={classes.emailContainer}>
                        <div className={classes.envelope}>
                            <i className={`fa fa-envelope `} />
                        </div>
                        <input className={classes.email} placeholder="Email Address" name="email"
                            value={user.email} onChange={handleInput} />
                    </div>

                    <div className={classes.passwordContainer}>
                        <div className={classes.lock}>
                            <i className="fa fa-lock" />
                        </div>
                        <input type={`${typeText ? 'text' : 'password'}`} className={classes.password} placeholder="Password" name="password"
                            value={user.password} onChange={handleInput} />
                        <i className={`fa fa-eye ${classes.eye}`} onClick={() => {
                            setTypeText(!typeText)
                        }} />
                    </div>
                    <div className={`${classes.groupButton}`}>
                        <button className={classes.button}>Login</button>
                        <NavLink to="/forget-password" className={classes.link}>Forgot password ?</NavLink>
                    </div>
                    <div className={`${classes.anotherMedia}`}>
                        <h5>Or login with</h5>
                        <div className={classes.socialMedia}>
                            <FacebookLogin
                                appId="351123113411927"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook} />
                            <GoogleLogin
                                clientId="1052309418279-37lkf36gbep0pi8sp9ke0a8uqgl8fogq.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseGoogleSuccess}
                                onFailure={responseGoogleFailure}
                                cookiePolicy={'single_host_origin'} />
                        </div>
                    </div>
                </div>
            </div>

        </form>
    )
}
