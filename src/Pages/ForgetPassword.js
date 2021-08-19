
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import classes from '../sass/ForgetPassword.module.scss'
import { useDispatch } from 'react-redux'
import { forgetPassword } from '../redux/action/EcommerceAction'
export default function ForgetPassword() {
    // let [emailUser, setEmail] = useState({
    //     email: ''
    // })
    // let handleSubmit = async (e) => {
    //     e.preventDefault()
     
    // }
    // let handleInput = (e) => {
    //     let { value, name } = e.target
    //     setEmail({ ...emailUser, [name]: value })
    // }
    let dispatch=useDispatch()
    // Input and validation
    let validation = Yup.object({
        email: Yup.string()
            .trim('Not white space')
            .strict()
            .email('Invalid email')
            .required('Email is not empty')
    })
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: validation,
        onSubmit: values => {
            console.log(values);
            dispatch(forgetPassword(values))
        }
    })
    return (
        <form className={classes.forgetContainer} onSubmit={formik.handleSubmit}>
            <div className={classes.forgetIntro}>
                <div className={classes.loginIntroContent}>
                    <h2>FES Forget Password</h2>
                    <p>Please input your email before continuing</p>
                </div>
            </div>
            <div className={classes.forgetForm}>
                <div className={classes.formGroup} >
                <h3 className={`text-center mb-4`}>Input your email</h3>
                  
                    <div className={classes.emailContainer}>
                        <div className={classes.envelope}>
                            <i className={`fa fa-envelope `} />
                        </div>
                        <input className={classes.email} placeholder="Email Address" name="email"
                            value={formik.values.email} onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        
                    </div>
                    {formik.errors.email && formik.touched.email ?
                            <div style={{ color: 'red', marginTop: '10px ' }}>{formik.errors.email}</div> : null
                        }
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
