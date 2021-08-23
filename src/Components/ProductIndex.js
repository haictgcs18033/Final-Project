import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from '../sass/ProductIndex.module.scss'
import * as action from '../redux/action/EcommerceAction'
import { NavLink } from 'react-router-dom'
export default function ProductIndex() {
    const productList = useSelector(state => state.ecommerceReducer.productList)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getProduct())
    }, [dispatch])
    // console.log(productList);
    return (
        <div>
            <div data-aos="zoom-in-up" className={`container p-0 ${classes.productIndexContainer}`}>
                <div className={` ${classes.newProduct}`}>
                    <h3>New Product</h3>
                    <div className={`${classes.productContainer}`}>
                        {
                            productList.slice(0, 5).map((product, index) => {
                                return <NavLink to={`/detail/${product.slug}/${product._id}`} key={index} className={`${classes.product}`}>
                                    <div className={classes.imgProduct}>
                                        <img src={`${product.productPictures[0].img}`} alt="Not found" />
                                    </div>
                                    <div className={classes.productContent}>
                                        <h5>{product.name}</h5>
                                        <p className="badge badge-success">5</p>
                                        <p>{product.price}</p>
                                    </div>
                                </NavLink>
                            })
                        }
                    </div>

                </div>
                <div className={`${classes.flexBreak}`}></div>
                <div className={` ${classes.onSale}`}>
                    <h3>On Sale</h3>
                    <div className={`${classes.productContainer}`}>
                        {
                            productList.slice(0, 5).map((product, index) => {
                                return <NavLink to={`/detail/${product.slug}/${product._id}`} key={index} className={`${classes.product}`}>
                                    <div className={classes.imgProduct}>
                                        <img src={`${product.productPictures[0].img}`} alt="Not found" />
                                    </div>
                                    <div className={classes.productContent}>
                                        <h5>{product.name}</h5>
                                        <p className="badge badge-success">5</p>
                                        <p>{product.price}</p>
                                    </div>
                                </NavLink>
                            })
                        }
                    </div>
                </div>
                <div className={`${classes.flexBreak}`}></div>
                <div className={` ${classes.topView}`}>
                    <h3> Top View</h3>
                    <div className={`${classes.productContainer}`}>
                        {
                            productList.slice(0, 5).map((product, index) => {
                                return <NavLink to={`/detail/${product.slug}/${product._id}`} key={index} className={`${classes.product}`}>
                                    <div className={classes.imgProduct}>
                                        <img src={`${product.productPictures[0].img}`} alt="Not found" />
                                    </div>
                                    <div className={classes.productContent}>
                                        <h5>{product.name}</h5>
                                        <p className="badge badge-success">5</p>
                                        <p>{product.price}</p>
                                    </div>
                                </NavLink>
                            })
                        }
                    </div>
                </div>
                <div className={`${classes.flexBreak}`}></div>
                <div className={` ${classes.freeShip}`}>
                    <h3>Free Ship</h3>
                    <div className={`${classes.productContainer}`}>
                        {
                            productList.slice(0, 5).map((product, index) => {
                                return <NavLink to={`/detail/${product.slug}/${product._id}`} key={index} className={`${classes.product}`}>
                                    <div className={classes.imgProduct}>
                                        <img src={`${product.productPictures[0].img}`} alt="Not found" />
                                    </div>
                                    <div className={classes.productContent}>
                                        <h5>{product.name}</h5>
                                        <p className="badge badge-success">5</p>
                                        <p>{product.price}</p>
                                    </div>
                                </NavLink>
                            })
                        }
                    </div>
                </div>
                <div className={`${classes.flexBreak}`}></div>
            </div>
        </div>

    )
}
