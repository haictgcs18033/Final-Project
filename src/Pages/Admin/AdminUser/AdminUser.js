import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from '../AdminUser/AdminUser.module.scss'
import * as action from '../../../redux/action/AdminAction'
import AdminUserTable from './AdminUserTable'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function AdminUser() {
    const userArray = useSelector(state => state.adminReducer.userArray)
    // const createUser = useSelector(state => state.adminReducer.createUser)
    // let { firstName, lastName, email } = createUser
    let [curPage, setCurpage] = useState(1)
    const userPerPage = 3


    // Search User
    const [searchTerm, setSearchTerm] = useState({
        text: ''
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getAllUser())
    }, [dispatch])



    const totalUser = userArray.length
    let pageNumber = []
    for (let index = 0; index < Math.ceil(totalUser / userPerPage); index++) {
        pageNumber.push(index)
    }
    const [activeClass, setActiveClass] = useState({
        activeObject: 0,
    });
    const [sortObject, setSortObject] = useState('')
    let handleSetActiveClass = (index) => {
        setActiveClass({ ...activeClass, activeObject: pageNumber[index] })

    }

    let handleSetActiveNextAndPrevious = (number) => {
        setActiveClass({ ...activeClass, activeObject: number })
    }
    let handleActivePaginate = (number) => {
        setCurpage(curPage = number)
    }
    let handleNextPaginate = (number) => {
        setCurpage(curPage = number)
    }
    let handlePreviousPaginate = (number) => {
        setCurpage(curPage = number)
    }
    // Create User
    // Input and validation
    let validation = Yup.object({
        firstName: Yup.string()
            .trim('Not white space')
            .strict()
            .max(15, 'Less than 15 character')
            .required('First Name is not empty'),
        lastName: Yup.string()
            .trim('Not white space')
            .strict()
            .max(15, 'Less than 15 character')
            .required('Last Name is not empty'),
        email: Yup.string()
            .trim('Not white space')
            .strict()
            .email('Invalid email')
            .max(50, 'Less than 50 character')
            .required('Email is not empty')
    })
    let formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            role: 'customer'
        },
        validationSchema:validation,
        onSubmit: values => {
             dispatch(action.createUser(values, curPage, userPerPage))
        }
    })
    // let handleChangeInputCreate = (e) => {
    //     let { name, value } = e.target
    //     const newsValue = { ...createUser }
    //     newsValue[name] = value
    //     dispatch(action.handleInputAdminUser(newsValue))
    // }

    // let handleCreate = () => {
    //     let userData = { ...createUser }
    //     // dispatch(action.createUser(userData, curPage, userPerPage))
    // }

    // Search User
    let handleSearchTerm = (e) => {
        let { name, value } = e.target
        if (searchTerm.text !== null) {
            setSearchTerm({ ...searchTerm, [name]: value })
            setCurpage(curPage = 1)
            setActiveClass({ ...activeClass, activeObject: 0 })
            dispatch(action.getUserPaginate(curPage, userPerPage, searchTerm.text,))
        }
    }
    // Sort User

    let handleSortAscending = (sortType) => {
        setCurpage(curPage = 1)
        setActiveClass({ ...activeClass, activeObject: 0 })
        setSortObject('ascending')
        if (sortObject === 'ascending') {
            dispatch(action.getUserPaginate(curPage, userPerPage, searchTerm.text, sortType))
        }
    }
    let handleSortDecending = (sortType) => {
        setCurpage(curPage = 1)
        setActiveClass({ ...activeClass, activeObject: 0 })
        setSortObject('decending')
        if (sortObject === 'decending') {
            dispatch(action.getUserPaginate(curPage, userPerPage, searchTerm.text, sortType))
        }

    }
    let handleSortNewest = (sortType) => {
        setCurpage(curPage = 1)
        setActiveClass({ ...activeClass, activeObject: 0 })
        setSortObject('newest')
        if (sortObject === 'newest') {
            dispatch(action.getUserPaginate(curPage, userPerPage, searchTerm.text, sortType))
        }
    }
    let handleSortOldest = (sortType) => {
        setCurpage(curPage = 1)
        setActiveClass({ ...activeClass, activeObject: 0 })
        setSortObject('oldest')
        if (sortObject === 'oldest') {
            dispatch(action.getUserPaginate(curPage, userPerPage, searchTerm.text, sortType))
        }
    }

    return (
        <div className={`container-fluid ${classes.userContainer}`}>
            <div className={classes.userTitle}>
                <h3>User</h3>
                <button data-toggle="modal" data-target="#exampleModalCreate"
                >Create User</button>
            </div>
            <div className="container-fluid">
                <form className="modal fade"
                    id="exampleModalCreate"
                    role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input className={`form-control`} name="firstName" value={formik.values.firstName}
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.errors.firstName && formik.touched.firstName ?
                                        <div style={{ color: 'red', margin: "10px 0" }}>{formik.errors.firstName}</div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input className={`form-control`} name="lastName" value={formik.values.lastName}
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.errors.lastName && formik.touched.lastName ?
                                        <div style={{ color: 'red', margin: "10px 0" }}>{formik.errors.lastName}</div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input className={`form-control`} name="email" value={formik.values.email}
                                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.email && formik.touched.email ?
                                        <div style={{ color: 'red', margin: "10px 0" }}>{formik.errors.email}</div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <select className="custom-select" name="role"
                                        onChange={formik.handleChange} >
                                        <option value={`customer`}>Customer</option>
                                        <option value={`admin`}>Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary"
                                // onClick={() => { handleCreate() }} 
                                // data-dismiss="modal"
                                >Save changes</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className={classes.userTableWrapper}>
                <div className={classes.sortAndSearch}>
                    <div className={classes.sort}>
                        <button className={`button dropdown-toggle ${classes.dropdownButton}`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort User
                        </button>
                        <div className={`dropdown-menu  ${classes.dropdownContent}`} aria-labelledby="dropdownMenuButton">
                            <p className="dropdown-item"
                                onClick={() => {
                                    handleSortAscending(sortObject)
                                }}>Ascending</p>
                            <p className="dropdown-item"
                                onClick={() => {
                                    handleSortDecending(sortObject)
                                }}>Descending</p>
                            <p className="dropdown-item"
                                onClick={() => {
                                    handleSortNewest(sortObject)
                                }}>Newest</p>
                            <p className="dropdown-item"
                                onClick={() => {
                                    handleSortOldest(sortObject)
                                }}>Oldest</p>
                        </div>
                    </div>
                    <div className={classes.search}>
                        <div className={`form-group mb-0 ${classes.formSearch}`}>
                            <input className={`form-control`} name="text" value={searchTerm.text} placeholder="Search user by email"
                                onChange={handleSearchTerm} />
                            <i className={`fa fa-search`} />
                        </div>
                    </div>
                </div>
                <div className={classes.tableUser}>
                    <AdminUserTable
                        pageNumber={pageNumber}
                        curPage={curPage}
                        searchTerm={searchTerm.text}
                        sortObject={sortObject}
                        activeClass={activeClass}
                        handleSetActiveClass={handleSetActiveClass}
                        handleSetActiveNextAndPrevious={handleSetActiveNextAndPrevious}
                        handleActivePaginate={handleActivePaginate}
                        handleNextPaginate={handleNextPaginate}
                        handlePreviousPaginate={handlePreviousPaginate}
                        userPerPage={userPerPage}></AdminUserTable>
                </div>
            </div>

        </div>
    )
}
