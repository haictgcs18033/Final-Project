import React, { useState } from "react";
import classes from "../sass/Login.module.scss";
// import logoBrand from '../asset/img/Brand.png'
import { NavLink, Redirect } from "react-router-dom";
import { loginHome } from "../redux/action/EcommerceAction";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function LoginPage(props) {
  const dispatch = useDispatch();
  let [typeText, setTypeText] = useState(false);
  // Google Login
  let responseGoogleSuccess = async (response) => {
    try {
      let result = await axios({
        url: "https://fes-backend-server.herokuapp.com/user/googleLogin",
        method: "POST",
        data: {
          tokenId: response.tokenId,
        },
      });
      localStorage.setItem("USER_LOGIN", JSON.stringify(result.data.user));
      localStorage.setItem("ACCESS_TOKEN", result.data.token);
      swal({
        title: `Login Successfully`,
        text: "",
        icon: "success",
      });
      props.history.push("/");
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  let responseGoogleFailure = (response) => {
    console.log(response);
  };
  // Facebook Login
  let responseFacebook = async (response) => {
    try {
      let result = await axios({
        url: "https://fes-backend-server.herokuapp.com/user/facebookLogin",
        method: "POST",
        data: {
          userID: response.userID,
          accessToken: response.accessToken,
        },
      });
      console.log(result.data);
      localStorage.setItem("USER_LOGIN", JSON.stringify(result.data.user));
      localStorage.setItem("ACCESS_TOKEN", result.data.token);
      swal({
        title: `Login Successfully`,
        text: "",
        icon: "success",
      });
      props.history.push("/");
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  // Validation
  let validate = Yup.object({
    email: Yup.string()
      .trim("Not white space")
      .strict()
      .email("Invalid email")
      .required("Email is not empty"),
    password: Yup.string()
      .trim("Not white space")
      .strict()
      .required("Password is not empty"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      dispatch(loginHome(values, props));
    },
  });
  if (localStorage.getItem("USER_LOGIN")) {
    return <Redirect to="/" />;
  }
  return (
    <form className={classes.loginContainer} onSubmit={formik.handleSubmit}>
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
          <NavLink to="/login" className={classes.loginUser}>
            Login
          </NavLink>
          <NavLink to="/signup" className={classes.signup}>
            Signup
          </NavLink>
        </div>
        <div className={classes.formGroup}>
          <div className={classes.emailContainer}>
            <div className={classes.envelope}>
              <i className={`fa fa-envelope `} />
            </div>
            <input
              className={classes.email}
              placeholder="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {formik.errors.email}
            </div>
          ) : null}
          <div className={classes.passwordContainer}>
            <div className={classes.lock}>
              <i className="fa fa-lock" />
            </div>
            <input
              type={`${typeText ? "text" : "password"}`}
              className={classes.password}
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i
              className={`fa fa-eye ${classes.eye}`}
              onClick={() => {
                setTypeText(!typeText);
              }}
            />
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div style={{ color: "red", margin: "10px 0" }}>
              {formik.errors.password}
            </div>
          ) : null}
          <div className={`${classes.groupButton}`}>
            <button className={classes.button} type="submit">
              Login
            </button>
            <NavLink to="/forget-password" className={classes.link}>
              Forgot password ?
            </NavLink>
          </div>
          <div className={`${classes.anotherMedia}`}>
            <h5>Or login with</h5>
            <div className={classes.socialMedia}>
              <FacebookLogin
                appId="351123113411927"
                isMobile={false}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    className={classes.facebookButton}
                    type="button"
                  >
                    <span>
                      <i class="fab fa-facebook-f mr-3"></i>
                    </span>
                    <span>Login Facebook</span>
                  </button>
                )}
              />
              <GoogleLogin
                clientId="1052309418279-37lkf36gbep0pi8sp9ke0a8uqgl8fogq.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    className={classes.googleButton}
                    type="button"
                  >
                    <span>
                      <i class="fab fa-google mr-3"></i>
                    </span>
                    <span>Login Google</span>
                  </button>
                )}
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
