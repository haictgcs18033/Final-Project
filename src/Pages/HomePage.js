
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import classes from '../sass/Homepage.module.scss'
import * as action from '../redux/action/EcommerceAction'
import { BackTop } from 'antd';
import Carousel from '../Components/CarouselEcommerce'
import { getCatgory } from '../redux/action/AdminAction'
import menFashion1 from '../asset/img/men-fashion1.jpg'
import menFashion2 from '../asset/img/men-fashion2.jpg'
import Slider from "react-slick";
import ProductIndex from '../Components/ProductIndex'
import { NavLink } from 'react-router-dom'
export default function HomePage() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.ecommerceReducer.productList)
    let categoryList = useSelector(state => state.adminReducer.categoryList)
    useEffect(() => {
        dispatch(getCatgory())
    }, [dispatch])

    // console.log(productList);
    useEffect(() => {
        dispatch(action.getProduct())
    }, [dispatch])
    const style = {
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: '50%',
        backgroundColor: '#642ab5',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };
    console.log(productList)
    return (
        <div>
            <Carousel></Carousel>
            <div className={classes.homeContainer}>
                <BackTop visibilityHeight={200}>
                    <div style={style}>
                        <i className="fas fa-arrow-up" />
                    </div>
                </BackTop>
                <div className={classes.category}>
                    <div>
                        <div className={`categorySlider container ${classes.categorySlider}`}>
                            <h3>Category</h3>
                            <Slider {...settings}>
                                {
                                    categoryList?.map((category, index) => {
                                        return <NavLink key={index}
                                            to={`/productItem/${category.slug}/${category.name}`}
                                            className={classes.item}>
                                            <div className={`d-flex justify-content-center mb-2`}>
                                                <img src={`${category.categoryImage}`} alt="Not found" />
                                            </div>

                                            <p>{category.name}</p>

                                        </NavLink>
                                    })
                                }

                            </Slider>
                        </div>

                    </div>
                </div>
                <div className={classes.product}>
                    <button>
                        <NavLink to="/allProduct">
                            View All
                        </NavLink>
                    </button>
                </div>
                <div >
                    <div data-aos="fade-right" className={`container p-0 ${classes.popularFashion}`}>
                        <div className={`${classes.category}`}>
                            <div className={`${classes.title}`}>
                                <h3>Popular Fashion</h3>
                            </div>
                            <div className={`${classes.categoryItem}`}>
                                {
                                    categoryList?.map((category, index) => {
                                        return <NavLink to={`/productItem/${category.slug}/${category._id}/${category.type}`} key={index}>
                                            {category.name}
                                        </NavLink>
                                    })
                                }
                            </div>
                        </div>
                        <div className={`${classes.productList}`}>
                            <div className={`row`}>
                                {
                                    productList.map((product, index) => {
                                        return <div key={index} className={`col-3 p-0 `}>
                                            <NavLink to={`/detail/${product.slug}/${product._id}`} className={`card text-left ${classes.card} mb-2`}>
                                                <img className="card-img-top" src={`${product.productPictures[0]?.img}`} alt="Not found" />
                                                <div className="card-body">
                                                    <h4 className="card-title">{product.name}</h4>
                                                    <p className="card-text">{product.price}</p>
                                                </div>
                                            </NavLink>
                                        </div>
                                    })
                                }
                            </div>

                        </div>

                    </div>
                </div>
                <div >
                    <div data-aos="fade-right" className={`container p-0 ${classes.menFashion}`}>
                        <div className={`${classes.category}`}>
                            <div className={`${classes.title}`}>
                                <h3>Men Fashion</h3>
                            </div>
                            <div className={`${classes.categoryItem}`}>
                                {
                                    categoryList?.map((category, index) => {
                                        return <NavLink to={`/productItem/${category.slug}/${category._id}/${category.type}`} key={index}>
                                            {category.name}
                                        </NavLink>
                                    })
                                }
                            </div>
                        </div>
                        <div className={`${classes.introSlider}`}>
                            <div id="carouselMenIndicators" className="carousel slide" data-ride="false" data-interval="false">
                                <ol className="carousel-indicators">
                                    <li data-target="#carouselMenIndicators" data-slide-to={0} className="active" />
                                    <li data-target="#carouselMenIndicators" data-slide-to={1} />
                                </ol>
                                <div className={`carousel-inner ${classes.sliderOne}`}>
                                    <div className={`carousel-item active ${classes.carouselItem}`}>
                                        <img className="d-block w-100" src={menFashion1} alt="First slide" />
                                    </div>
                                    <div className={`carousel-item ${classes.sliderTwo}`}>
                                        <img className="d-block w-100" src={menFashion2} alt="Second slide" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${classes.product}`}>
                            <div id="carouselMenProduct" className="carousel slide" data-ride="false" data-interval="false">
                                <ol className="carousel-indicators">
                                    <li data-target="#carouselMenProduct" data-slide-to={0} className="active" />
                                    <li data-target="#carouselMenProduct" data-slide-to={1} />
                                </ol>
                                <div className={`carousel-inner ${classes.sliderOne}`}>
                                    <div className={`carousel-item active ${classes.carouselItem}`}>
                                        <div className={`row`}>
                                            {
                                                productList.slice(0, 8).map((product, index) => {
                                                    return <div key={index} className={`col-md-3 col-lg-3 col-xl-4 p-0 `}>
                                                        <NavLink to={`/detail/${product.slug}/${product._id}`} className={`card text-left ${classes.card} mb-2`}>
                                                            <img className="card-img-top" src={`${product.productPictures[0]?.img}`} alt="Not found" />
                                                            <div className="card-body">
                                                                <h4 className="card-title">{product.name}</h4>
                                                                <p className="card-text">{product.price}</p>

                                                            </div>
                                                        </NavLink>

                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className={`carousel-item ${classes.sliderTwo}`}>
                                        <div className={`row`}>
                                            {
                                                productList.slice(0, 8).map((product, index) => {
                                                    return <div key={index} className={`col-md-3 col-lg-3 col-xl-4 p-0 `}>
                                                        <NavLink to={`/detail/${product.slug}/${product._id}`} className={`card text-left ${classes.card} mb-2`}>
                                                            <img className="card-img-top" src={`${product.productPictures[0]?.img}`} alt="Not found" />
                                                            <div className="card-body">
                                                                <h4 className="card-title">{product.name}</h4>
                                                                <p className="card-text">{product.price}</p>
                                                            </div>
                                                        </NavLink>

                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselMenProduct" role="button" data-slide="prev">
                                    <i className="fa fa-angle-left" />
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselMenProduct" role="button" data-slide="next">
                                    <i className="fa fa-angle-right" />
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
                
               
                <div className={`container ${classes.mobileLayoutProduct}`}>
                    <div className={classes.popularFashionMobile}>
                        <div className={`${classes.title}`}>
                            <h5>Popular Fashion</h5>
                        </div>
                        <div className={`${classes.categoryItem}`}>
                            <div className={`row `}>
                                {
                                    categoryList?.map((category, index) => {
                                        return <NavLink to={`/productItem/${category.slug}/${category._id}/${category.type}`}
                                            key={index}
                                            className={`col-6 col-sm-4 col-md-4 text-center my-3`}>
                                            {category.name}
                                        </NavLink>
                                    })
                                }
                            </div>

                        </div>
                        <div className={` ${classes.productList}`}>
                            <div className={`row`}>
                                {
                                    productList.map((product, index) => {
                                        return <div key={index} className={`col-6 col-sm-6 col-md-6 p-0 `}>
                                            <NavLink to={`/detail/${product.slug}/${product._id}`} className={`card text-left ${classes.card} mb-2`}>
                                                <img className="card-img-top" src={`${product.productPictures[0]?.img}`} alt="Not found" />
                                                <div className="card-body">
                                                    <h4 className="card-title">{product.name}</h4>
                                                    <p className="card-text">{product.price}</p>
                                                </div>
                                            </NavLink>
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    <div className={classes.menFashionMobile}>
                        <div className={`${classes.title}`}>
                            <h5>Men Fashion</h5>
                        </div>
                        <div className={`${classes.categoryItem}`}>
                            <div className={`row `}>
                                {
                                    categoryList?.map((category, index) => {
                                        return <NavLink to={`/productItem/${category.slug}/${category._id}/${category.type}`}
                                            key={index}
                                            className={`col-6 col-sm-4 col-md-4 text-center my-3`}>
                                            {category.name}
                                        </NavLink>
                                    })
                                }
                            </div>

                        </div>
                        <div className={` ${classes.productList}`}>
                            <div className={`row`}>
                                {
                                    productList.map((product, index) => {
                                        return <div key={index} className={`col-6 col-sm-6 col-md-6 p-0 `}>
                                            <NavLink to={`/detail/${product.slug}/${product._id}`} className={`card text-left ${classes.card} mb-2`}>
                                                <img className="card-img-top" src={`${product.productPictures[0]?.img}`} alt="Not found" />
                                                <div className="card-body">
                                                    <h4 className="card-title">{product.name}</h4>
                                                    <p className="card-text">{product.price}</p>
                                                </div>
                                            </NavLink>
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                    </div>
                   
                   
                </div>
            </div>
            <ProductIndex></ProductIndex>


        </div>
    )
}
