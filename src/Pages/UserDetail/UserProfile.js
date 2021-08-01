import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from '../../sass/UserProfile.module.scss'
import * as action from '../../redux/action/EcommerceAction'
import userImageNone from '../../asset/img/userImage.png'
import Modal from 'antd/lib/modal/Modal'
import { useHistory } from 'react-router-dom'
import { Button, notification } from 'antd';
import { WarningOutlined } from '@ant-design/icons';


export default function UserProfile() {
    let history = useHistory()
    const userDetail = useSelector((state) => state.ecommerceReducer.userDetail)
    let userAddress = useSelector(state => state.ecommerceReducer.userAddress)
    let { firstName, lastName, email, profilePicture } = userDetail
    let userInfo = useSelector(state => state.ecommerceReducer.userInfo)
    let { name, phoneNumber, address, city, alternatePhone } = userInfo

    let [accountDetail, setAccountDetail] = useState(false)
    let [changePassword, setChange] = useState(false)
    let [passwordUpdate, setPasswordUpdate] = useState({
        currentPassword: '',
        newPassword: '',
        passwordConfirm: '',
    })

    let { currentPassword, newPassword, passwordConfirm } = passwordUpdate
    let [addressLayout, setAddressLayout] = useState(false)
    // Add address
    const [modalCreate, setModalCreate] = useState(false);
    // Edit Address
    const [modalEdit, setModalEdit] = useState(false);
    let [editInfo, setEditInfo] = useState({
        _id: '',
        name: '',
        phoneNumber: '',
        address: '',
        city: '',
        alternatePhone: '',
    })

    // Delete Address
    let [idAddress, setIdAddress] = useState('')
    const [modalDelete, setModalDelete] = useState(false);
    let [updateButton, setUpdateButton] = useState(false)

    const dispatch = useDispatch()
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
    const [isModalVisible, setIsModalVisible] = useState(false);
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
        setUpdateButton(true)
        let { value, name } = e.target
        let newValues = { ...userDetail }
        newValues[name] = value
        if (name === "userImage") {
            newValues[name] = e.target.files[0]
        }
        dispatch(action.infoUpdateUser(newValues))
    }
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        let userUpdate = { ...userDetail }
        dispatch(action.updateUserData(userUpdate, history))
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    let renderAccountDetail = () => {
        return <div >
            <h3>Account</h3>
            <div className={classes.accountDetail}>
                <div className={`${classes.accountForm}`}>
                    <div className={`form-group`}>
                        <label>User Image</label>
                        <div className={classes.imageUpload}>
                            <label >
                                {
                                    profilePicture ?
                                        <img src={`${profilePicture}`} alt={`Not found`} /> :
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
                    </div>
                    <div className={`form-group `}>
                        <label>Last Name</label>
                        <input className={`form-control ${classes.formInput}`} name="lastName" value={lastName} onChange={handleInput} />
                    </div>
                    <div className={`form-group`}>
                        <label>Email</label>
                        <input className={`form-control ${classes.formInput}`} name="email" value={email} onChange={handleInput} />
                    </div>
                    {
                        !updateButton ?
                            '' :
                            <Button type="primary" onClick={showModal}>
                                Update Information
                            </Button>
                    }

                </div>

            </div>

        </div>
    }
    let handleInputChangePassword = (e) => {
        let { name, value } = e.target
        setPasswordUpdate({ ...passwordUpdate, [name]: value })
    }
    let handleChangePassword = () => {
        if (newPassword !== passwordConfirm) {
            notification.open({
                message: 'Error',
                description:
                    'You have to make sure the confirm passord match with your new password',
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
        }
        else {
            let newUserPassword = { ...passwordUpdate }
            dispatch(action.changeUserPassword(newUserPassword))
        }
    }
    let renderChangePassword = () => {
        return <div >
            <h3>Change Password</h3>
            <div className={classes.changePassword}>
                <div className={`form-group`}>
                    <label>Current Password</label>
                    <input autoComplete="new-password"
                        type="password" className={`form-control`} name="currentPassword" value={currentPassword} onChange={handleInputChangePassword} />
                </div>
                <div className={`form-group`}>
                    <label>New Password</label>
                    <input type="password" className={`form-control`} name="newPassword" value={newPassword} onChange={handleInputChangePassword} />
                </div>
                <div className={`form-group`}>
                    <label>Confirm Password</label>
                    <input type="password" className={`form-control`} name="passwordConfirm" value={passwordConfirm} onChange={handleInputChangePassword} />
                </div>
                <div className={`d-flex justify-content-end`}>
                    <button onClick={() => {
                        handleChangePassword()
                    }}>Change Password</button>
                </div>
            </div>

        </div>
    }
    //  Address
    let renderAddress = () => {
        return <div className={classes.addressContainer}>
            <div className={classes.userAddressTitle}>
                <h3>User Address</h3>
                <button onClick={() => showModalCreate()}>Add address</button>
            </div>

            <div className={classes.address}>
                {
                    userAddress?.map((address, index) => {
                        return <div key={index} className={` mb-3  ${classes.addressItem} `}>
                            <div className={classes.infor}>
                                <p>
                                    <span className={`font-weight-bold`}>Name : </span>
                                    {address.name}
                                </p>
                                <p>
                                    <span className={`font-weight-bold`}>Phone Number : </span>
                                    {address.phoneNumber}
                                </p>
                                <p>
                                    <span className={`font-weight-bold`}>Address : </span>
                                    {address.address}
                                </p>
                                <p>
                                    <span className={`font-weight-bold`}>City : </span>
                                    {address.city}
                                </p>
                                <p>
                                    <span className={`font-weight-bold`}>Alternative Phone : </span>
                                    {address.alternatePhone}
                                </p>
                            </div>
                            <div className={`${classes.flexBreak}`}></div>
                            <div className={classes.functionAddress}>
                                <Button type="secondary" className={` mr-2 ${classes.deleteAddress}`}
                                    onClick={() => showModalDelete(address._id)}>
                                    Delete
                                </Button>
                                <button className={`mr-2 ${classes.editAddress}`} onClick={() => showModalEdit(address)}>
                                    Edit
                                </button>

                            </div>
                        </div>
                    })
                }
               
                
              
            </div>
        </div>
    }
    // Modal Create
    let handleInputAdd = (e) => {
        let { value, name } = e.target
        let newValues = { ...userInfo }
        newValues[name] = value
        dispatch(action.handleInputPlaceOrder(newValues))
    }
    let handleAddAddress = (e) => {
        e.preventDefault()
        let userData = { ...userInfo }
        dispatch(action.handleCreateAddress(userData))
        setModalCreate(false);
    }
    const showModalCreate = () => {
        setModalCreate(true);
    };


    const handleCancelCreate = () => {
        setModalCreate(false);
    };
    // Modal Edit
    const showModalEdit = (address) => {
        console.log(address);
        setModalEdit(true);
        setEditInfo({
            _id: address._id,
            name: address.name,
            phoneNumber: address.phoneNumber,
            address: address.address,
            city: address.city,
            alternatePhone: address.alternatePhone,
        })

    };
    const handleEditAddress = (e) => {
        e.preventDefault()
        dispatch(action.handleUpdateAddress(editInfo))
        setModalEdit(false);
    };

    const handleCancelEdit = () => {
        setModalEdit(false);
    };
    const handleInputEdit = (e) => {
        let { name, value } = e.target
        setEditInfo({ ...editInfo, [name]: value })
    }
    // Modal delete
    const showModalDelete = (id) => {
        setIdAddress(id)
        setModalDelete(true)
    }
    const handleDeleteAddress = (idAddress) => {
        dispatch(action.handleDeleteAddress(idAddress))
        setModalDelete(false)
    }
    const handleCancelDelete = () => {
        setModalDelete(false)
    }
    // Mobile
    let openDetailMobile=()=>{
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
                    <Modal title="Notice" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p>You have to login again for updating your information</p>
                    </Modal>
                    {changePassword ? renderChangePassword() : ''}
                    {addressLayout ? renderAddress() : ''}
                    <Modal title="Add Address" visible={modalCreate} onOk={handleAddAddress} onCancel={handleCancelCreate}>
                    <form onSubmit={handleAddAddress}>
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" name="name" value={name}
                                onChange={handleInputAdd} />
                        </div>
                        <div className="form-group" >
                            <label>Phone Number</label>
                            <input className="form-control" name="phoneNumber" value={phoneNumber}
                                onChange={handleInputAdd} />
                        </div>
                        <div className="form-group" >
                            <label>Address</label>
                            <input className="form-control" name="address" value={address}
                                onChange={handleInputAdd} />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input className="form-control" name="city" value={city}
                                onChange={handleInputAdd} />
                        </div>
                        <div className="form-group">
                            <label>Alternative Phone</label>
                            <input className="form-control" name="alternatePhone" value={alternatePhone}
                                onChange={handleInputAdd} />
                        </div>
                    </form>

                </Modal>
                <Modal title="Update Address" visible={modalEdit} onOk={handleEditAddress} onCancel={handleCancelEdit}>
                    <form onSubmit={handleEditAddress}>
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" name="name" value={editInfo.name}
                                onChange={handleInputEdit} />
                        </div>
                        <div className="form-group" >
                            <label>Phone Number</label>
                            <input className="form-control" name="phoneNumber" value={editInfo.phoneNumber}
                                onChange={handleInputEdit} />
                        </div>
                        <div className="form-group" >
                            <label>Address</label>
                            <input className="form-control" name="address" value={editInfo.address}
                                onChange={handleInputEdit} />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input className="form-control" name="city" value={editInfo.city}
                                onChange={handleInputEdit} />
                        </div>
                        <div className="form-group">
                            <label>Alternative Phone</label>
                            <input className="form-control" name="alternatePhone" value={editInfo.alternatePhone}
                                onChange={handleInputEdit} />
                        </div>
                    </form>
                </Modal>
                <Modal title="Delete address" visible={modalDelete} onOk={() => { handleDeleteAddress(idAddress) }} onCancel={handleCancelDelete}>
                    Are you sure want to delete this address ?
                </Modal>
                </div>
            </div>
            <div className={`container userProfileMobile ${classes.userProfileMobile}`}>
                <div>
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"
                            onClick={()=>{
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
                            <h3>Change Password</h3>
                            <div className={classes.changePassword}>
                                <div className={`form-group`}>
                                    <label>Current Password</label>
                                    <input autoComplete="new-password"
                                        type="password" className={`form-control`} name="currentPassword" value={currentPassword} onChange={handleInputChangePassword} />
                                </div>
                                <div className={`form-group`}>
                                    <label>New Password</label>
                                    <input type="password" className={`form-control`} name="newPassword" value={newPassword} onChange={handleInputChangePassword} />
                                </div>
                                <div className={`form-group`}>
                                    <label>Confirm Password</label>
                                    <input type="password" className={`form-control`} name="passwordConfirm" value={passwordConfirm} onChange={handleInputChangePassword} />
                                </div>
                                <div className={`d-flex justify-content-end`}>
                                    <button onClick={() => {
                                        handleChangePassword()
                                    }}>Change Password</button>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                            {addressLayout ? renderAddress() : ''}
                        </div>
                    </div>
                </div>

            </div>
        </div>



    )
}
