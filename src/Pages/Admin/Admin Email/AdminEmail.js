import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from '../Admin Email/AdminEmail.module.scss'
import UserTable from './UserTable'
import * as action from '../../../redux/action/AdminAction'
import moment from 'moment'
export default function AdminEmail() {
    const userArray = useSelector(state => state.adminReducer.userArray)
    const emailServer = useSelector(state => state.adminReducer.emailServer)

    let dispatch = useDispatch()
    // Search User
    const [searchTerm, setSearchTerm] = useState({
        text: ''
    })
    // mail content
    const [mailContent, setMailContent] = useState({
        title: '',
        description: ''
    })
    // Email Type
    const [emailType, setEmailType] = useState('')

    // Data mail all
    const [mailAll, setMailAll] = useState({
        title: '',
        description: '',
        type: '',
    })
    let [curPage, setCurpage] = useState(1)
    const userPerPage = 3
    useEffect(() => {
        dispatch(action.getAllEmail())
    }, [dispatch])
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
    // Serch User
    // Search User
    let handleSearchTerm = (e) => {
        let { name, value } = e.target
        if (searchTerm.text !== null) {
            setSearchTerm({ ...searchTerm, [name]: value })
            setCurpage(curPage = 1)
            setActiveClass({ ...activeClass, activeObject: 0 })
            dispatch(action.getUserPaginate(curPage, userPerPage, searchTerm.text))
        }
    }
    // Choose email send type
    let handleChangeType = (e) => {
        let { value } = e.target

        if (value === 'none') {
            setEmailType('none')
        } else if (value === 'all') {
            setEmailType('all')
            setMailAll({
                title: mailContent.title,
                description: mailContent.description,
                type: 'all'
            })
        } else if (value === 'specific') {
            setEmailType('specific')

        }
    }
    let handleSortNewest = () => {
        dispatch(action.getAllEmail('newest'))
    }
    let handleSortOldest = () => {
        dispatch(action.getAllEmail('oldest'))
    }
    let handleInputMail = (e) => {
        let { name, value } = e.target

        setMailContent({ ...mailContent, [name]: value })
    }
    let handleSendMailAll = () => {

        dispatch(action.sendMailAll(mailAll))
    }


    return (

        <div className={classes.emailContainer}>
            <div className={classes.emailTitle}>
                <h3>Email</h3>

            </div>
            <div className={classes.emailWrapper}>
                <div className={classes.emailArea}>
                    <div className={classes.emailContent}>
                        <div className={`form-group`}>
                            <label>Title</label>
                            <input className={`form-control`} name="title" value={mailContent.title} onChange={handleInputMail} />
                        </div>
                        <div className={`form-group`}>
                            <label>Description</label>
                            <textarea className={`form-control`} name="description" value={mailContent.description} onChange={handleInputMail}></textarea>
                        </div>
                        <div className={`form-group ${classes.selectGroup}`}>
                            <label>Send type</label>
                            <select className={`custom-select ${classes.customSelect}`} name="role" onChange={handleChangeType}>
                                <option value={`none`}>Choose send type</option>
                                <option value={`all`}>Sending mail all user</option>
                                <option value={`specific`}>Sending mail for specific user</option>
                            </select>
                            <i className="fa fa-angle-down" />
                        </div>
                        {
                            emailType === 'all' ?
                                <div className={`d-flex justify-content-end my-2`}>
                                    <button
                                        onClick={() => {
                                            handleSendMailAll()
                                        }}>Send mail</button>
                                </div> : ''
                        }

                    </div>
                    <div className={classes.sentEmail}>
                        <div className={classes.sentEmailTitle}>
                            <h3>Sent Email</h3>
                            <button className={`button dropdown-toggle ${classes.dropdownButton}`} type="button" id="dropdownMenuButton" data-toggle="dropdown">
                                Sort sent email
                            </button>
                            <div className={`dropdown-menu dropdown-menu-right ${classes.dropdownContent}`} aria-labelledby="dropdownMenuButton">

                                <p className="dropdown-item"
                                    onClick={() => {
                                        handleSortNewest()
                                    }}>Newest</p>
                                <p className="dropdown-item"
                                    onClick={() => {
                                        handleSortOldest()
                                    }}>Oldest</p>
                            </div>
                        </div>
                        <div className={classes.email}>
                            {
                                emailServer.map((email, index) => {
                                    return <div key={index} className={classes.emailObject}>
                                        <div className={`d-flex justify-content-between`}>
                                            <p className={`font-weight-bold`}>{email.title}</p>
                                            <p>{moment(email.createdAt).format('LL')}</p>
                                        </div>
                                        <p className={`mb-0`}>
                                            <span className={`mr-2 font-weight-bold`}>Description :</span>
                                            {email.description}
                                        </p>
                                    </div>
                                })
                            }


                        </div>
                    </div>
                </div>
                {
                    emailType === 'specific' ?
                        <div className={classes.tableUser}>
                            <div className={classes.tableUserTitle}>
                                <h3>Table User</h3>
                                <div className={`${classes.search}`}>
                                    <input className={`form-control`} value={searchTerm.text} name="text" placeholder="Search User"
                                        onChange={handleSearchTerm} />
                                    <i className="fa fa-search" />
                                </div>
                            </div>
                            <div className={classes.userTableWrapper} >
                                <UserTable
                                    pageNumber={pageNumber}
                                    curPage={curPage}
                                    searchTerm={searchTerm.text}
                                    activeClass={activeClass}
                                    handleSetActiveClass={handleSetActiveClass}
                                    handleSetActiveNextAndPrevious={handleSetActiveNextAndPrevious}
                                    handleActivePaginate={handleActivePaginate}
                                    handleNextPaginate={handleNextPaginate}
                                    handlePreviousPaginate={handlePreviousPaginate}
                                    userPerPage={userPerPage}
                                    mailContent={mailContent}
                                ></UserTable>
                            </div>

                        </div> :
                        ''
                }

            </div>
        </div>
    )
}
