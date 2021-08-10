import React from 'react'
import { useDispatch } from 'react-redux';
import classes from '../../sass/UserProfile.module.scss'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import * as action from '../../redux/action/EcommerceAction'

export default function ChangePassword(props) {
    let dispatch = useDispatch()
   
    // Input and validation
    let validation = Yup.object({
        currentPassword: Yup.string()
            .trim('Not white space')
            .strict()
            .max(15, "Maximum 15 character")
            .required('Please input your current password'),
        newPassword: Yup.string()
            .trim("Not white space")
            .strict()
            .max(15, "Maximum 15 character")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                "Minimum 8 characters, at least one letter , one number and no special character"
            )
            .required('Please input your new password'),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], "Password is not matched")
            .required('You need to confirm your password')
    })

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            passwordConfirm: '',
        },
        validationSchema: validation,
        onSubmit: (values) => {
            dispatch(action.changeUserPassword(values))
        }
    })

    return (
        <div>
            <h3>Change Password</h3>
            <form className={classes.changePassword} onSubmit={formik.handleSubmit}>
                <div className={`form-group`}>
                    <label>Current Password</label>
                    <input autoComplete="new-password" type="password"
                        className={`form-control`} name="currentPassword" value={formik.values.currentPassword}
                        onChange={formik.handleChange} />
                    {formik.errors.currentPassword && formik.touched.currentPassword ?
                        <div style={{ color: 'red', margin: '10px 0' }}>{formik.errors.currentPassword}</div> :
                        null
                    }
                </div>
                <div className={`form-group`}>
                    <label>New Password</label>
                    <input type="password" className={`form-control`} name="newPassword" value={formik.values.newPassword}
                        onChange={formik.handleChange} />
                    {formik.errors.newPassword && formik.touched.newPassword ?
                        <div style={{ color: 'red', margin: '10px 0' }}>{formik.errors.newPassword}</div> :
                        null
                    }
                </div>
                <div className={`form-group`}>
                    <label>Confirm Password</label>
                    <input type="password" className={`form-control`} name="passwordConfirm" value={formik.values.passwordConfirm}
                        onChange={formik.handleChange} />
                    {formik.errors.passwordConfirm && formik.touched.passwordConfirm ?
                        <div style={{ color: 'red', margin: '10px 0' }}>{formik.errors.passwordConfirm}</div> :
                        null
                    }
                </div>
                <div className={`d-flex justify-content-end`}>
                    <button type="submit">Change Password</button>
                </div>
            </form>
        </div>
    )
}
