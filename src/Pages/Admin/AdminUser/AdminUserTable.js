import React, { useEffect, useState } from 'react'
import classes from '../AdminUser/AdminUser.module.scss'
import * as action from '../../../redux/action/AdminAction'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton } from 'antd'
const AdminUserTable = React.memo(
    (props) => {
        let { curPage,
            userPerPage,
            pageNumber,
            handleActivePaginate,
            handleNextPaginate,
            searchTerm,
            sortObject,
            handlePreviousPaginate,
            handleSetActiveClass,
            activeClass,
            handleSetActiveNextAndPrevious } = props

        const dispatch = useDispatch()
        const paginateUser = useSelector(state => state.adminReducer.paginateUser)
        const loading = useSelector(state => state.adminReducer.loading)
        useEffect(() => {
            dispatch(action.getUserPaginate(curPage, userPerPage, searchTerm, sortObject))
        }, [dispatch, curPage, userPerPage,searchTerm,sortObject])
        // Handle active class  
        const handleActiveClass = (index) => {
            handleSetActiveClass(index)
            let number = pageNumber[index] + 1
            handleActivePaginate(number)
        }
        const handleNextPage = () => {
            // pageNext=1
            let pageNext = activeClass.activeObject + 1
            handleSetActiveNextAndPrevious(pageNext)
            let number = pageNext + 1
            handleNextPaginate(number)


        }

        const handleBackPage = () => {
            let pagePrevious = activeClass.activeObject - 1
            handleSetActiveNextAndPrevious(pagePrevious)
            let number = pagePrevious + 1
            handlePreviousPaginate(number)
        }
        const handleChangeActive = (index) => {
            if (activeClass.activeObject === pageNumber[index]) {
                return classes.activeClassName
            } else {
                return ''
            }
        }

        // Update User

        const [updateUser, setUpdateUser] = useState({
            userId: '',
            firstName: '',
            lastName: '',
            email: '',
            role: ''
        })
        // Delete User
        const [deleteUser, setDeleteUser] = useState({
            fullName: '',
            userId: ''
        })
        // UpdateUser
        let handleChangeInputUpdate = (e) => {
            let { name, value } = e.target
            setUpdateUser({ ...updateUser, [name]: value })
        }
        let updateUserAdmin = (userUpdate) => {
            dispatch(action.handleUpdateUser(userUpdate, curPage, userPerPage))
        }
        // Delete User
        let handleDeleteUser = (userId) => {
            dispatch(action.deleteUser(userId, curPage, userPerPage))
        }
        if (loading) {
            return <div className={`container-fluid ${classes.userContainer}`}>
                <div className={classes.userTitle}>
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                </div>
            </div>
        }
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">#</th> */}
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Create At</th>
                            <th scope="col">Setting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginateUser.paginate?.map((user, index) => {
                            let fullNameUser = user.firstName + ' ' + user.lastName
                            return <tr key={index}>
                                {/* <th scope="row">{index+1}</th> */}
                                <td>{fullNameUser}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{moment(user.createdAt).format('LL')}</td>
                                <td>
                                    <button className={`mr-2 ${classes.update}`}
                                        data-toggle="modal" data-target="#exampleModalUpdate"
                                        onClick={() => {
                                            setUpdateUser({
                                                userId: user._id,
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                email: user.email,
                                                role: user.role
                                            })
                                        }}>Update</button>
                                    <button className={`mr-2 ${classes.delete}`}
                                        data-toggle="modal" data-target="#exampleModalDelete"
                                        onClick={() => {
                                            setDeleteUser(
                                                {
                                                    fullName: fullNameUser,
                                                    userId: user._id
                                                }
                                            )
                                        }}
                                    >Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className="modal fade"
                    id="exampleModalUpdate"
                    role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input className={`form-control`} name="firstName" value={updateUser.firstName} onChange={handleChangeInputUpdate} />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input className={`form-control`} name="lastName" value={updateUser.lastName} onChange={handleChangeInputUpdate} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input className={`form-control`} name="email" value={updateUser.email} onChange={handleChangeInputUpdate} />
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <select className="custom-select" name="role" value={updateUser.role} onChange={handleChangeInputUpdate}>
                                        <option value={`customer`}>Customer</option>
                                        <option value={`admin`}>Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={() => { updateUserAdmin(updateUser) }} >Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade"
                    id="exampleModalDelete"
                    role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Do you want to delete {deleteUser.fullName} ? <b>Nothing can be recovered</b>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={() => { handleDeleteUser(deleteUser.userId) }} >Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${classes.paginateGroup}`}>
                    {
                        paginateUser.previous ?
                            <button className={`${classes.prev}`}
                                onClick={() => {
                                    handleBackPage()
                                }}
                            >
                                <i className="fa fa-angle-left" />
                            </button> :
                            ''
                    }

                    {
                        pageNumber.map((elements, index) => {
                            return <button key={index} className={`button ${handleChangeActive(index)}`}
                                onClick={() => { handleActiveClass(index) }}>{index + 1}</button>
                        })
                    }
                    {
                        paginateUser.next ?
                            <button className={`${classes.next}`} onClick={() => {
                                handleNextPage()
                            }}>
                                <i className="fa fa-angle-right" />
                            </button> :
                            ''
                    }

                </div>
            </div >
        )
    }
)

export default AdminUserTable
