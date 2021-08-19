
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { useParams } from 'react-router-dom'
import classes from '../sass/ResetPassword.module.scss'
import { resetPassword } from '../redux/action/EcommerceAction'
import { useDispatch } from 'react-redux'
export default function ResetPassword() {
    let { token } = useParams()
    // let [passwordReset, setPasswordReset] = useState({
    //     newPassword: '',
    //     confirmPassword: ''
    // })
    // let handleSubmit = async (e) => {
    //     e.preventDefault()

   

    // }
    // let handleInput = (e) => {
    //     let { name, value } = e.target
    //     setPasswordReset({ ...passwordReset, [name]: value })
    // }
    const dispatch = useDispatch()
    // Input and validation
    let validation = Yup.object({
        newPassword: Yup.string()
            .trim("Not white space")
            .strict()
            .max(15, "Maximum 15 character")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                "Minimum 8 characters, at least one letter , one number and no special character"
            )
            .required('Passwrod is not empty'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], "Password is not matched")
            .required('You need to confirm your password')
    })
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: validation,
        onSubmit: (values) => {
           dispatch(resetPassword(values,token))
        }
    })

    return (
        <form className={classes.resetContainer} onSubmit={formik.handleSubmit}>
            <div className={classes.resetIntro}>
                <div className={classes.resetIntroContent}>
                    <h2>FES Reset Password</h2>
                    <p>Please input and confirm your new password</p>
                </div>
            </div>
            <div className={classes.resetForm}>
               
                <div className={classes.formGroup}>
                <h3 className={`text-center`}>Change Password</h3>
                    <div className={classes.emailContainer}>
                        <div className={`form-group`}>
                            <label>New Password</label>
                            <input type="password" className={classes.input} placeholder="New password" name="newPassword"
                                value={formik.values.newPassword} onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            {formik.errors.newPassword && formik.touched.newPassword ?
                                <div style={{ color: 'red', margin: '10px 0' }}>{formik.errors.newPassword}</div> : null
                            }
                        </div>
                        <div className={`form-group`}>
                            <label>Confirm New Password</label>
                            <input  type="password"  className={classes.input} placeholder="Confirm password" name="confirmPassword"
                                value={formik.values.confirmPassword} onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword ?
                                <div style={{ color: 'red', margin: '10px 0' }}>{formik.errors.confirmPassword}</div> : null
                            }
                        </div>
                    </div>
                    <div className={classes.groupButton}>
                        <button className={classes.button} type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </div>

        </form>
    )
}
