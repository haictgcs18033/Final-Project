import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from '../../sass/UserProfile.module.scss'
import * as action from '../../redux/action/EcommerceAction'
import userImageNone from '../../asset/img/userImage.png'
import ChangePassword from './ChangePassword'
import UserAddress from './UserAddress'




export default function UserProfile() {

    const userDetail = useSelector((state) => state.ecommerceReducer.userDetail)
    const userImage = useSelector((state) => state.ecommerceReducer.userImage)
    let userAddress = useSelector(state => state.ecommerceReducer.userAddress)
    let { firstName, lastName, email } = userDetail
    let [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })
    let initialError = {
        firstName: '',
        lastName: '',
        email: ''
    }
    let [accountDetail, setAccountDetail] = useState(false)
    let [changePassword, setChange] = useState(false)
    let [addressLayout, setAddressLayout] = useState(false)
    // Delete Address  
    // let [updateButton, setUpdateButton] = useState(false)

    const dispatch = useDispatch()
    console.log();
    useEffect(() => {
        setAccountDetail(true)

    }, []) // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        dispatch(action.getUserDetail())
    }, [dispatch])
    useEffect(() => {
        dispatch(action.getAddress())
    }, [dispatch])

    const [activeClass, setActiveClass] = useState({
        activeObject: 0
    })

    let arrayLink = [
        {
            id: 1,
            name: 'My Account'
        },
        {
            id: 2,
            name: 'Change Password'
        },
        {
            id: 3,
            name: 'Address'
        }
    ]
    let handleActiveClass = (index) => {
        if (activeClass.activeObject === index) {
            return classes.activeClass
        }
    }
    let handleChooseActive = (index) => {
        setActiveClass({
            activeObject: index
        })
        if (index === 0) {
            setAccountDetail(true)
            setChange(false)
            setAddressLayout(false)
        }
        if (index === 1) {
            setAccountDetail(false)
            setChange(true)
            setAddressLayout(false)
        }
        if (index === 2) {
            setAccountDetail(false)
            setChange(false)
            setAddressLayout(true)
        }
    }


    let handleInput = (e) => {
        let { value, name } = e.target
        let newValues = { ...userDetail }
        newValues[name] = value

        if (name === "userImage") {
            newValues[name] = e.target.files[0]
        }
        dispatch(action.infoUpdateUser(newValues))
    }
    let validation = () => {
        let emailMessage = ''
        let firstNameMessage = ''
        let lastNameMessage = ''
        // First Name
        if (!userDetail.firstName) {
            firstNameMessage = "First name is not empty"
        }
        if (userDetail.firstName.startsWith(" ") || userDetail.firstName.endsWith(" ")) {
            firstNameMessage = "Not white space"
        }
        if (userDetail.firstName.length > 15) {
            firstNameMessage = "Less than 15 character"
        }
        // Last Name
        if (!userDetail.lastName) {
            lastNameMessage = "Last name is not empty"
        }
        if (userDetail.lastName.startsWith(" ") || userDetail.lastName.endsWith(" ")) {
            lastNameMessage = "Not white space"
        }
        if (userDetail.lastName.length > 15) {
            lastNameMessage = "Less than 15 character"
        }
        // Email
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;//eslint-disable-line
        if (!re.test(userDetail.email)) {
            emailMessage = 'Invalid email'
        }
        if (userDetail.email.startsWith(" ") || userDetail.email.endsWith(" ")) {
            emailMessage = "Not white space"
        }
        if (!userDetail.email) {
            emailMessage = 'Email is not empty'
        }
        if (emailMessage || firstNameMessage || lastNameMessage) {
            setError({ firstName: firstNameMessage, email: emailMessage, lastName: lastNameMessage })
            return false
        }
        return true
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        let isValid = validation()
        if (isValid) {
            let userUpdate = { ...userDetail }
            dispatch(action.updateUserData(userUpdate))
            setError(initialError)
        }
    }
    let renderAccountDetail = () => {
        return <form onSubmit={handleSubmit} >
            <h3>Account</h3>
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
                    <div className={`form-group`}>
                        <label>Email</label>
                        <input className={`form-control ${classes.formInput}`} name="email" value={email}
                            onChange={handleInput} />
                        {error.email ? <p style={{ color: 'red', margin: '10px 0' }}>{error.email}</p> : ''}
                    </div>

                    <button type={`primary`}> Update Information</button>
                </div>

            </div>

        </form>
    }



    // Mobile
    let openDetailMobile = () => {
        setAccountDetail(true)
        setChange(false)
        setAddressLayout(false)
    }
    let openAddressMobile = () => {
        setAccountDetail(false)
        setChange(false)
        setAddressLayout(true)
    }
    return (
        <div>
            <div className={`container ${classes.userProfileContainer}`}>
                <div className={classes.userFunction}>
                    {
                        arrayLink.map((link, index) => {
                            return <div key={index}
                                className={`${classes.navLink} ${handleActiveClass(index)}`}
                                onClick={() => { handleChooseActive(index) }}
                            >{link.name}</div>

                        })
                    }
                </div>
                <div className={`${classes.userLayout}`}>
                    {accountDetail ? renderAccountDetail() : ''}

                    {changePassword ? <ChangePassword /> : ''}
                    {addressLayout ? <UserAddress userAddress={userAddress} /> : ''}
                </div>
            </div>
            <div className={`container userProfileMobile ${classes.userProfileMobile}`}>
                <div>
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"
                                onClick={() => {
                                    openDetailMobile()
                                }}>My Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false"
                            >Change Password</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false"
                                onClick={() => {
                                    openAddressMobile()
                                }}>Address</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            {accountDetail ? renderAccountDetail() : ''}
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <ChangePassword />
                        </div>
                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                            {addressLayout ? <UserAddress userAddress={userAddress} /> : ''}
                        </div>
                    </div>
                </div>

            </div>
        </div>



    )
}
