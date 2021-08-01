import { Skeleton } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as action from '../../redux/action/EcommerceAction'
import classes from '../../sass/AllProduct.module.scss'
export default function ProductList(props) {
    let { curPage,
        productPerPage,
        pageNumber,
        handleActivePaginate,
        handleNextPaginate,
        // sortObject,
        filterColor,
        filterPrice,
        filterSize,
        filterRating,
        handlePreviousPaginate,
        handleSetActiveClass,
        activeClass,
        handleSetActiveNextAndPrevious } = props
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getProductPaginate(curPage, productPerPage, filterPrice, filterColor, filterSize, filterRating))
    }, [dispatch, curPage, productPerPage, filterPrice, filterColor, filterSize, filterRating])
    let productPaginated = useSelector(state => state.ecommerceReducer.productPaginated)
    const loading = useSelector(state => state.ecommerceReducer.loading)
    console.log(productPaginated);
    if (loading) {
        return <div className={`container-fluid mt-5 `}>
            <div >
                <Skeleton active avatar paragraph={{ rows: 4 }} />
            </div>
        </div>
    }
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
    return (
        <div className={`${classes.productListContainer}`}>
            <div className={`${classes.productList}`}>
                <div className={`row mx-0`}>
                    {
                        productPaginated.paginate?.length === 0 || !productPaginated.paginate?
                            <div className={`${classes.itemWarning}`}>
                                <i className="fas fa-exclamation"></i>
                                <p>
                                    There are not any item
                                </p>

                            </div>
                            :
                            productPaginated.paginate?.map((product, index) => {
                                return <div key={index} className={`col-4 mb-3`}>
                                    <div className={`card text-left ${classes.productCard}`}>
                                        <div className={classes.cardImage}>
                                            <img className="card-img-top" src={`${product.productPictures[0].img}`} alt="Notfound" />
                                            <div className={`${classes.viewProduct}`}>
                                                <button>
                                                    <NavLink to={`/detail/${product.slug}/${product._id}`}>
                                                        View product
                                                    </NavLink>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={`card-body ${classes.cardBody}`}>
                                            <h4 className="card-title">{product.name}</h4>
                                            <p >
                                                <span className={`badge badge-warning py-2 px-2 mr-2`}
                                                    style={{ color: 'white' }}>
                                                    {product.averageStar}  <i className="fas fa-star" />
                                                </span>
                                                <span>({product.reviews.length})</span>
                                            </p>
                                            <p className="card-text">
                                                <span className={`font-weight-bold`}>Price : </span>
                                                {product.price} $
                                            </p>
                                            <p className={`font-weight-bold`}>Color</p>
                                            <div className={`d-flex`}>

                                                {product.color.length > 0 ?
                                                    product.color.map((color, index) => {
                                                        if (color === "red") {
                                                            return <div className={classes.redColor} key={index}></div>
                                                        }
                                                        else if (color === "green") {
                                                            return <div className={classes.greenColor} key={index}></div>
                                                        }
                                                        else {
                                                            return <div className={classes.blueColor} key={index}></div>
                                                        }

                                                    }) : ''
                                                }
                                            </div>
                                            <p className={`font-weight-bold`}>Size</p>
                                            <div className={`d-flex`}>
                                                {product.size.length > 0 ?
                                                    product.size.map((size, index) => {
                                                        return <p className={`${classes.size}`} key={index}>{size}</p>
                                                    }) : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            })
                    }

                </div>
            </div>
            <div className={`${classes.paginateContainer}`}>
                <div className={`${classes.paginateGroup}`}>
                    {
                        productPaginated.previous ?
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
                        productPaginated.next ?
                            <button className={`${classes.next}`} onClick={() => {
                                handleNextPage()
                            }}>
                                <i className="fa fa-angle-right" />
                            </button> :
                            ''
                    }
                </div>
            </div>


        </div>
    )
}
