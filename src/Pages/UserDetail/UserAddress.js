import React, { useState } from 'react'
import classes from '../../sass/UserProfile.module.scss'
import * as action from '../../redux/action/EcommerceAction'
import { useDispatch } from 'react-redux'
import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup'
export default function UserAddress(props) {
    let { userAddress } = props
    // Add address
    const [modalCreate, setModalCreate] = useState(false);
    // Edit address
    const [modalEdit, setModalEdit] = useState(false);
    // Delete Address
    let [idAddress, setIdAddress] = useState('')
    const [modalDelete, setModalDelete] = useState(false);
    let dispatch = useDispatch()
    // Modal Create
    let validation = Yup.object({
        name: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, "Less than 50 character")
            .required('User name is not empty'),
        phoneNumber: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, 'Less than 50 character')
            .matches(/^[0-9]*$/, "Please input only number")
            .required('Phone number is not empty'),
        address: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, "Less than 50 character")
            .required('Address is not empty'),
        city: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, "Less than 50 character")
            .required('City is not empty'),
        alternatePhone: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, 'Less than 50 character')
            .matches(/^[0-9]*$/, "Please input only number")
            .required('Alternative phone number is not empty'),
    })
    let formik = useFormik({
        initialValues: {
            name: '',
            phoneNumber: '',
            address: '',
            city: '',
            alternatePhone: ''
        },
        validationSchema: validation,
        onSubmit: (values) => {
         
            setModalCreate(false);
            dispatch(action.handleCreateAddress(values))
        }
    })
    const showModalCreate = () => {
        setModalCreate(true);
    };
    const handleCancelCreate = () => {
        setModalCreate(false);
    };


    // Modal Edit
    let validationUpdate = Yup.object({
        name: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, "Less than 50 character")
            .required('User name is not empty'),
        phoneNumber: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, 'Less than 50 character')
            .matches(/^[0-9]*$/, "Please input only number")
            .required('Phone number is not empty'),
        address: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, "Less than 50 character")
            .required('Address is not empty'),
        city: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, "Less than 50 character")
            .required('City is not empty'),
        alternatePhone: Yup.string()
            .trim('Not white space')
            .strict()
            .max(50, 'Less than 50 character')
            .matches(/^[0-9]*$/, "Please input only number")
            .required('Alternative phone number is not empty'),
    })
    let formikUpdate = useFormik({
        initialValues: {
            _id: '',
            name: '',
            phoneNumber: '',
            address: '',
            city: '',
            alternatePhone: ''
        },
        validationSchema: validationUpdate,
        onSubmit: (values) => {
            dispatch(action.handleUpdateAddress(values))
            setModalEdit(false);
        }
    })
    const showModalEdit = (address) => {
      
        formikUpdate.values._id = address._id
        formikUpdate.values.name = address.name
        formikUpdate.values.phoneNumber = address.phoneNumber
        formikUpdate.values.address = address.address
        formikUpdate.values.city = address.city
        formikUpdate.values.alternatePhone = address.alternatePhone
        setModalEdit(true);
    };


    const handleCancelEdit = () => {
        setModalEdit(false);
    };
  
    // Modal Delete
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
    return (
        <div className={classes.addressContainer}>
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
                <Modal title="Add Address" visible={modalCreate} onOk={formik.handleSubmit} onCancel={handleCancelCreate}>
                    <div>
                        <div className="form-group">
                            <label>User Name</label>
                            <input className="form-control" name="name" value={formik.values.name}
                                onChange={formik.handleChange} />
                            {formik.errors.name && formik.touched.name ?
                                <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formik.errors.name}</p> :
                                null
                            }
                        </div>
                        <div className="form-group" >
                            <label>Phone Number</label>
                            <input className="form-control" name="phoneNumber" value={formik.values.phoneNumber}
                                onChange={formik.handleChange} />
                            {formik.errors.phoneNumber && formik.touched.phoneNumber ?
                                <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formik.errors.phoneNumber}</p> :
                                null
                            }
                        </div>
                        <div className="form-group" >
                            <label>Address</label>
                            <input className="form-control" name="address" value={formik.values.address}
                                onChange={formik.handleChange} />
                            {formik.errors.address && formik.touched.address ?
                                <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formik.errors.address}</p> :
                                null
                            }
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input className="form-control" name="city" value={formik.values.city}
                                onChange={formik.handleChange} />
                            {formik.errors.city && formik.touched.city ?
                                <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formik.errors.city}</p> :
                                null
                            }
                        </div>
                        <div className="form-group">
                            <label>Alternative Phone</label>
                            <input className="form-control" name="alternatePhone" value={formik.values.alternatePhone}
                                onChange={formik.handleChange} />
                            {formik.errors.alternatePhone && formik.touched.alternatePhone ?
                                <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formik.errors.alternatePhone}</p> :
                                null
                            }
                        </div>
                    </div>
                </Modal>
                <Modal title="Update Address" visible={modalEdit} onOk={formikUpdate.handleSubmit} onCancel={handleCancelEdit}>
                    <form >
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" name="name" value={formikUpdate.values.name}
                                onChange={formikUpdate.handleChange} onBlur={formikUpdate.handleBlur} />
                            {formikUpdate.errors.name && formikUpdate.touched.name ?
                                <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formikUpdate.errors.name}</p> :
                                null
                            }
                        </div>
                        <div className="form-group" >
                            <label>Phone Number</label>
                            <input className="form-control" name="phoneNumber" value={formikUpdate.values.phoneNumber}
                                onChange={formikUpdate.handleChange} onBlur={formikUpdate.handleBlur} />
                            {formikUpdate.errors.phoneNumber && formikUpdate.touched.phoneNumber ?
                                <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formikUpdate.errors.phoneNumber}</p> :
                                null
                            }
                        </div>
                        <div className="form-group" >
                            <label>Address</label>
                            <input className="form-control" name="address" value={formikUpdate.values.address}
                                onChange={formikUpdate.handleChange} onBlur={formikUpdate.handleBlur} />
                            {formikUpdate.errors.address && formikUpdate.touched.address ?
                                <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formikUpdate.errors.address}</p> :
                                null
                            }
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input className="form-control" name="city" value={formikUpdate.values.city}
                                onChange={formikUpdate.handleChange} onBlur={formikUpdate.handleBlur} />
                            {formikUpdate.errors.city && formikUpdate.touched.city ?
                                <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formikUpdate.errors.city}</p> :
                                null
                            }
                        </div>
                        <div className="form-group">
                            <label>Alternative Phone</label>
                            <input className="form-control" name="alternatePhone" value={formikUpdate.values.alternatePhone}
                                onChange={formikUpdate.handleChange} onBlur={formikUpdate.handleBlur} />
                            {formikUpdate.errors.alternatePhone && formikUpdate.touched.alternatePhone ?
                                <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{formikUpdate.errors.alternatePhone}</p> :
                                null
                            }
                        </div>
                    </form>
                </Modal>
                <Modal title="Delete address" visible={modalDelete} onOk={() => { handleDeleteAddress(idAddress) }} onCancel={handleCancelDelete}>
                    Are you sure want to delete this address ?
                </Modal>
            </div>
        </div>
    )
}
