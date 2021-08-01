import { Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../../../redux/action/AdminAction'
import classes from '../Admin Email/AdminEmail.module.scss'
export default function UserTable(props) {
    let { curPage,
        userPerPage,
        pageNumber,
        handleActivePaginate,
        handleNextPaginate,
        searchTerm,
        handlePreviousPaginate,
        handleSetActiveClass,
        activeClass,
        handleSetActiveNextAndPrevious,
        mailContent
    } = props
    const dispatch = useDispatch()
    const paginateUser = useSelector(state => state.adminReducer.paginateUser)
    const loading = useSelector(state => state.adminReducer.loading)
    useEffect(() => {
        dispatch(action.getUserPaginate(curPage, userPerPage, searchTerm))
    }, [dispatch, curPage, userPerPage, searchTerm])

    // Data specific email
    const [specificMail, setSpecificMail] = useState({
        title: '',
        description: '',
        type: '',
        emailUser: ''
    })
    useEffect(() => {
        // dung use effect without array for handling success situation on onClick event
      dispatch(action.sendSpecificEmail(specificMail))
    },[dispatch,specificMail])
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

    if (loading) {
        return <div className={`container-fluid ${classes.userContainer}`}>
            <div className={classes.userTitle}>
                <Skeleton active avatar paragraph={{ rows: 4 }} />
            </div>
        </div>
    }

   
    return (
        <div className={`${classes.userTableGroup}`}>
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
            <table className="table">
                <thead>
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
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
                            <td>
                                <button className={`mr-2 ${classes.update}`}
                                    onClick={async () => {
                                        await setSpecificMail(
                                            { 
                                                title:mailContent.title, 
                                                description:mailContent.description,
                                                type:'specific',
                                                emailUser: user.email ,
                                            });
                                    }}
                                >Send mail</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
