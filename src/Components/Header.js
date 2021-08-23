
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getCatgory } from '../redux/action/AdminAction'
import classes from '../sass/Header.module.scss'
import { Menu, Dropdown, Affix, Drawer, Badge } from 'antd';
// import 'antd/dist/antd.css';
import Intro from './Intro'
import { getAllProduct, getCartItems } from '../redux/action/EcommerceAction'


export default function Header() {
    // let categoryList = useSelector(state => state.adminReducer.categoryList)
    let productList = useSelector(state => state.ecommerceReducer.productList)
    let cartArray = useSelector(state => state.ecommerceReducer.cartArray)
    // const [dropdown, setDropdown] = useState(false)
    const [visible, setVisible] = useState(false);
    let dispatch = useDispatch()
    // Search
    const [textSearch, setTextSearch] = useState('')
    const [suggestion, setSuggestion] = useState([])
    const [top] = useState();
    useEffect(() => {
        dispatch(getCatgory())
    }, [dispatch])
    useEffect(() => {
        dispatch(getAllProduct())
    }, [dispatch])

    useEffect(() => {
        dispatch(getCartItems())
    }, [dispatch])
    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll)
    // }, [])
    // let handleScroll = () => {
    //     if (window.pageYOffset > 100) {
    //         setIsSticky(true)
    //     } else {
    //         setIsSticky(false)
    //     }
    // }
    let user = JSON.parse(localStorage.getItem('USER_LOGIN'))
    // let renderCategory = (categoryList) => {
    //     return categoryList.map((categories, index) => {
    //         return <li key={index} className={classes.childCategory}>

    //             <NavLink to={`/productItem/${categories.slug}/${categories._id}/${categories.type}`} >{categories.name}</NavLink>
    //             {categories.children.length > 0 ?
    //                 <ul className={classes.childContainer}>
    //                     {
    //                         renderCategory(categories.children)
    //                     }
    //                 </ul> : ''
    //             }
    //         </li>

    //     })
    // }
    const menu = (
        <Menu className={`text-center`}>
            <Menu.Item key="0">
                <NavLink to="/order" >Order</NavLink>
            </Menu.Item>
            <Menu.Item key="1">
                <NavLink to="/userDetail" >Account Detail</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
                <NavLink to="/login" onClick={() => { userLogout() }}>Logout</NavLink>
            </Menu.Item>
        </Menu>
    );

    let renderLogin = () => {
        if (localStorage.getItem("USER_LOGIN")) {
            // let userLogin = JSON.parse(localStorage.getItem('USER_LOGIN'))
            return <Dropdown overlay={menu} trigger={['click']}>
                <p className={`ant-dropdown-link nav-link ${classes.helloUser}`} onClick={e => e.preventDefault()}>
                    Hello Customer
                </p>
            </Dropdown>

        } else {
            return <NavLink className={` nav-link ${classes.login}`} to="/login">Login<span className="sr-only">(current)</span></NavLink>

        }
    }
    let renderLoginMobile = () => {
        if (localStorage.getItem("USER_LOGIN")) {

            return <p className={`ant-dropdown-link nav-link ${classes.helloUserMobile}`} onClick={e => e.preventDefault()}>
                <i className="fas fa-user mr-2" />
                Welcome back !
            </p>
        } else {
            return <NavLink className={` nav-link ${classes.login}`} to="/login">Login<span className="sr-only">(current)</span></NavLink>

        }
    }
    let userLogout = () => {
        dispatch({
            type: 'RESET_CART'
        })
        localStorage.clear()
    }
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    // Search Product
    let handleSearchProduct = (e) => {
        setTextSearch(e.target.value)
        let matchValue = []
        if (textSearch.length > 0) {
            matchValue = productList.filter(product => {
                const regex = new RegExp(`${textSearch}`, 'gi')
                return product.name.match(regex)
            })
        }
        setSuggestion(matchValue)
    }

    return (
        <div >
            <Intro></Intro>
            <Affix offsetTop={top}>
                <div className={` ${classes.headerContainer}`} >
                    <div className={`${classes.functionMobile}`}>
                        <button onClick={showDrawer}>
                            <i className="fas fa-bars" />
                        </button>
                        <Drawer
                            title={`${user ? `Login as  ${user.email}` : ''}`}
                            width={300}
                            placement="left"
                            closable={true}
                            closeIcon={
                                <i className="fas fa-times" />
                            }
                            onClose={onClose}
                            visible={visible}
                        >
                            <div className={classes.functionContainer}>
                                {user ? <div>
                                    <div className={classes.link}>
                                        <NavLink to="/order" className={`sidebarFunction`}>Order</NavLink>
                                    </div>
                                    <div className={classes.link}>
                                        <NavLink to="/userDetail" >Account Detail</NavLink>
                                    </div>
                                    <div className={classes.link}>
                                        <NavLink to="/login" onClick={() => { userLogout() }}>Logout</NavLink>
                                    </div>
                                </div>

                                    :
                                    <p style={
                                        { textAlign: 'center', marginTop: '150px', fontWeight: 'bold', fontSize: '20px' }
                                    }>
                                        Please Login First
                                    </p>
                                }

                            </div>


                        </Drawer>
                        <NavLink className={` ${classes.logobrandMobile}`} to='/'>FES</NavLink>
                    </div>
                    <NavLink className={`navbar-brand ${classes.logobrand}`} to='/'>FES</NavLink>
                    <div className={`${classes.navbarChoice}`}>
                        <div className={` ${classes.searchGroup}`}>
                            <div className={`${classes.search}`}>
                                <input placeholder="Search for product" value={textSearch}
                                    onChange={handleSearchProduct} />
                                <i className={`fa fa-search ${classes.searchIcon}`} />
                                <div className={`${classes.searchResult}`}>
                                    <div className={classes.searchSuggestion}>
                                        {suggestion.length > 0 && textSearch.length > 0 ? suggestion.map((suggest, index) => {
                                            return <NavLink key={index} to={`/detail/${suggest.slug}/${suggest._id}`}>{suggest.name}</NavLink>
                                        }) : ''

                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`d-flex ${classes.headerFunction}`}>
                        {/* <div className={`${classes.category}`}>
                            <p className={`nav-link mb-0 ${classes.dropdown}`}
                                onClick={() => {
                                    setDropdown(!dropdown)
                                }}>
                                <span className={`mr-2`}>Category</span>
                                <span><i className={`fa fa-angle-down ${dropdown ? classes.arrowUp : classes.arrowDown}`} /></span>
                            </p>
                            <div className={dropdown ? classes.categoriesContainer : classes.categoriesContainerHide}>
                                <ul className={classes.categories}>
                                    {
                                        renderCategory(categoryList)
                                    }
                                </ul>
                            </div>
                        </div> */}
                        {
                            renderLogin()
                        }
                        <div>
                            <NavLink className={`nav-link ml-2 ${classes.cart}`} to="/cart">
                                <span className="mr-2">
                                    <i className="fa fa-shopping-cart" />
                                </span>
                                Cart({cartArray.length})
                            </NavLink>
                        </div>
                    </div>
                    <div className={`d-flex ${classes.headerFunctionMobile}`}>
                        {renderLoginMobile()}
                        <NavLink className={`nav-link ml-2 ${classes.cart}`} to="/cart">
                            <Badge count={cartArray.length} style={{ backgroundColor: '#52c41a', boxShadow: 'none' }}>
                                <i className="fas fa-shopping-cart" />
                            </Badge>

                        </NavLink>
                    </div>
                    <div className={classes.flexBreak}></div>
                    <div className={` ${classes.searchGroupMobile}`}>
                        <div className={`${classes.search}`}>
                            <input placeholder="Search for product and category" />
                            <i className={`fa fa-search ${classes.searchIcon}`} />
                        </div>
                    </div>
                </div>
            </Affix>


        </div>
    )
}
