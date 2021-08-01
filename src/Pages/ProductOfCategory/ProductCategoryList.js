import { Skeleton } from 'antd'
import React, { useEffect } from 'react'
import classes from '../../sass/ProductPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../../redux/action/EcommerceAction'
import { NavLink } from 'react-router-dom'
export default function ProductCategoryList(props) {
    let { curPage,
        productPerPage,
        slug,
        pageNumber,
        handleActivePaginate,
        handleNextPaginate,
        sortObject,
        handlePreviousPaginate,
        handleSetActiveClass,
        activeClass,
        handleSetActiveNextAndPrevious } = props
    let productSlugPaginate = useSelector(state => state.ecommerceReducer.productSlugPaginate)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getProductPaginateBySlug(slug, curPage, productPerPage,sortObject))
    }, [dispatch, slug, curPage, productPerPage,sortObject])
    const loading = useSelector(state => state.ecommerceReducer.loading)
    console.log(productSlugPaginate);
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
                        productSlugPaginate.paginate?.map((product, index) => {
                            return <div key={index} className={`col-3 mb-3`}>
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
                        productSlugPaginate.previous ?
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
                        productSlugPaginate.next ?
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
