import React, { useEffect, useState } from 'react'
import classes from '../AdminAccount/AdminAccount.module.scss'
import * as action from '../../../redux/action/AdminAction'
import userImageNone from '../../../asset/img/userImage.png'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup';
export default function AdminAccount() {
    let adminDetail = useSelector(state => state.adminReducer.adminDetail)
    let userImage = useSelector(state => state.adminReducer.userImage)
    let { firstName, lastName } = adminDetail
    let [error, setError] = useState({
        firstName: '',
        lastName: " ",
    })
    let initialError = {
        firstName: '',
        lastName: ''
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getAdminDetail())
    }, [dispatch])
    let validation = () => {
        let firstNameMessage = ''
        let lastNameMessage = ''
        // First Name
        if (!adminDetail.firstName) {
            firstNameMessage = "First name is not empty"
        }
        if (adminDetail.firstName.startsWith(" ") || adminDetail.firstName.endsWith(" ")) {
            firstNameMessage = "Not white space"
        }
        if (adminDetail.firstName.length > 15) {
            firstNameMessage = "Less than 15 character"
        }
        // Last Name
        if (!adminDetail.lastName) {
            lastNameMessage = "Last name is not empty"
        }
        if (adminDetail.lastName.startsWith(" ") || adminDetail.lastName.endsWith(" ")) {
            lastNameMessage = "Not white space"
        }
        if (adminDetail.lastName.length > 15) {
            lastNameMessage = "Less than 15 character"
        }
        if (firstNameMessage || lastNameMessage) {
            setError({ firstName: firstNameMessage, lastName: lastNameMessage })
            return false
        }
        return true
    }
    let handleSubmit = (e) => {
        e.preventDefault()
        let isValid = validation()
        if (isValid) {
            let dataToApi = { ...adminDetail }
            dispatch(action.updateAdminData(dataToApi))
            setError(initialError)
        }
    }

    let handleInput = (e) => {
        let { value, name } = e.target
        let newValues = { ...adminDetail }
        newValues[name] = value
        if (name === "userImage") {
            newValues[name] = e.target.files[0]
        }
        dispatch({
            type: 'INPUT_UPDATE_ADMIN',
            value: newValues
        })
    }
    // Change Password Admin
    let validationChangePassword = Yup.object({
        currentPassword: Yup.string()
            .trim('Not white space')
            .strict()
            // .max(15, "Maximum 15 character")
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
        validationSchema: validationChangePassword,
        onSubmit: (values) => {
            dispatch(action.changeAdminPassword(values))
        }
    })
  
    return (
        <div className={classes.accountContainer}>
            <form onSubmit={handleSubmit} >
                <h3>Account Information</h3>
                <div className={classes.accountDetail}>
                    <div className={`${classes.accountForm}`} >
                        <div className={`form-group`}>
                            <label>User Image</label>
                            <div className={classes.imageUpload}>
                                <label >
                                    {
                                        userImage ?
                                            <img src={`${userImage}`} alt={`Not found`} /> :
                                            <img src={userImageNone} alt={`Not found`} />
                                    }
                                </label>
                                <input type="file" name="userImage" onChange={handleInput} />
                            </div>
                        </div>
                        <div className={`form-group`}>
                            <label>First Name</label>
                            <input className={`form-control ${classes.formInput}`} name="firstName" value={firstName}
                                onChange={handleInput} />
                            {error.firstName ? <p style={{ color: 'red', margin: '10px 0' }}>{error.firstName}</p> : ''}
                        </div>
                        <div className={`form-group `}>
                            <label>Last Name</label>
                            <input className={`form-control ${classes.formInput}`} name="lastName" value={lastName}
                                onChange={handleInput} />
                            {error.lastName ? <p style={{ color: 'red', margin: '10px 0' }}>{error.lastName}</p> : ''}
                        </div>


                        <button type={`primary`}> Update Information</button>
                    </div>

                </div>

            </form>
            <div className={classes.flexBreak}></div>
            <div className={classes.changePasswordGroup}>
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
        </div>
    )
}
