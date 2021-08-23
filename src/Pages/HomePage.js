
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import classes from '../sass/Homepage.module.scss'
import * as action from '../redux/action/EcommerceAction'
import { BackTop } from 'antd';
import Carousel from '../Components/CarouselEcommerce'
import { getCatgory } from '../redux/action/AdminAction'
import menFashion1 from '../asset/img/men-fashion1.jpg'
import menFashion2 from '../asset/img/men-fashion2.jpg'
import womenFashion1 from '../asset/img/women-fashion1.jpg'

import Slider from "react-slick";
import ProductIndex from '../Components/ProductIndex'
import { NavLink } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { notification } from "antd"
import { WarningOutlined } from '@ant-design/icons';
export default function HomePage() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.ecommerceReducer.productList)
    let categoryList = useSelector(state => state.adminReducer.categoryList)
    let [email, setEmail] = useState({
        emailUser: ''
    })
  
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
    const settingProduct = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
    }
    const settingProduct768 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
    }
    const settingProduct576 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    const isMobile = useMediaQuery({
        maxWidth: 576,
    })
    const isTablet768 = useMediaQuery({
        minWidth: 577,
        maxWidth: 768
    })


    let renderResponsiveAllProduct = () => {
        if (isMobile) {
            return settingProduct576
        }
        if (isTablet768) {
            return settingProduct768
        }
        return settingProduct
    }
    let allCategory = [

    ]
    let renderAllCategory = (categoryList) => {

        for (let item of categoryList) {
            allCategory.push(item)
            if (item.children.length > 0) {
                renderAllCategory(item.children)
            }

        }

        return allCategory
    }
    let validation = () => {
        let emailMessage = ""
        // Email
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;//eslint-disable-line
        if (!re.test(email.emailUser)) {
            emailMessage = 'Invalid email'
        }
        if (email.emailUser.startsWith(" ") ||email.emailUser.endsWith(" ")) {
            emailMessage = "Not white space"
        }
        if (!email.emailUser) {
            emailMessage = 'Email is not empty'
        }
        if (emailMessage) {
            notification.open({
                message: 'Error',
                description: emailMessage,
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
            return false
        }
        return true
    }
    let handleSubmit = (e) => {
        e.preventDefault()
        let isValid = validation()
        if (isValid) {
            let dataToApi = email
            dispatch(action.contactEmail(dataToApi))
        }

    }
    let handleInputContact = (e) => {
        let { name, value } = e.target
        setEmail({ ...email, [name]: value })
    }
   
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
                <div className={`container ${classes.product}`}>
                    <div className={classes.productTitle}>
                        <h3>Fashion</h3>
                        <button>
                            <NavLink to="/allProduct">
                                View All
                            </NavLink>
                        </button>
                    </div>
                    <div className={`categorySlider`}>
                        <Slider {...renderResponsiveAllProduct()}>
                            {
                                productList?.map((product, index) => {
                                    return <div key={index} className={classes.productItem}>
                                        <img src={product.productPictures[0].img} alt="Not found" />
                                        <div className={classes.productContent}>
                                            <h5>{product.name}</h5>
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
                                            <p className={`font-weight-bold ${classes.colorTitle}`}>Color:</p>

                                            <div className={`d-flex ${classes.colorGroup}`}>

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
                                            <p className={`font-weight-bold ${classes.sizeTitle}`}>Size</p>
                                            <div className={`d-flex ${classes.sizeGroup}`}>
                                                {product.size.length > 0 ?
                                                    product.size.map((size, index) => {
                                                        return <p className={`${classes.size}`} key={index}>{size}</p>
                                                    }) : ''
                                                }
                                            </div>
                                            <div className={`${classes.viewProduct}`}>
                                                <button>
                                                    <NavLink to={`/detail/${product.slug}/${product._id}`}>
                                                        View product
                                                    </NavLink>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                })
                            }

                        </Slider>
                    </div>



                </div>

                <div >
                    <div data-aos="fade-right" className={`container p-0 ${classes.menFashion}`}>
                        <div className={`${classes.category}`}>
                            <div className={`${classes.title}`}>
                                <h3>Porpular Fashion</h3>
                            </div>
                            <div className={`${classes.categoryItem}`}>
                                {
                                    renderAllCategory(categoryList).map((category, index) => {
                                        return <NavLink to={`/productItem/${category.slug}/${category.name}`} key={index}>
                                            {category.name}
                                        </NavLink>
                                    })
                                }
                            </div>
                        </div>
                        <div className={`${classes.introSlider}`}>
                            <div id="carouselMenIndicators" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#carouselMenIndicators" data-slide-to={0} className="active" />
                                    <li data-target="#carouselMenIndicators" data-slide-to={1} />
                                    <li data-target="#carouselMenIndicators" data-slide-to={2} />

                                </ol>
                                <div className={`carousel-inner ${classes.sliderOne}`}>
                                    <div className={`carousel-item active ${classes.carouselItem}`}>
                                        <img className="d-block w-100" src={menFashion1} alt="First slide" />
                                    </div>
                                    <div className={`carousel-item ${classes.sliderTwo}`}>
                                        <img className="d-block w-100" src={menFashion2} alt="Second slide" />
                                    </div>
                                    <div className={`carousel-item ${classes.sliderThree}`}>
                                        <img className="d-block w-100" src={womenFashion1} alt="Second slide" />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={`${classes.product}`}>
                            <div className={`row`}>
                                {
                                    productList.map((product, index) => {
                                        return <div key={index} className={`col-4 p-0 `}>
                                            <NavLink to={`/detail/${product.slug}/${product._id}`} className={`card text-left ${classes.card} mb-2`}>
                                                <img className="card-img-top" src={`${product.productPictures[0]?.img}`} alt="Not found" />
                                                <div className="card-body">
                                                    <h4 className="card-title">{product.name}</h4>
                                                    <p className="card-text">{product.price} $</p>
                                                </div>
                                            </NavLink>
                                        </div>
                                    })
                                }
                            </div>

                        </div>

                    </div>
                </div>


                <div className={`container ${classes.mobileLayoutProduct}`}>

                    <div className={classes.menFashionMobile}>
                        <div className={`${classes.title}`}>
                            <h5>Men Fashion</h5>
                        </div>
                        <div className={`${classes.categoryItem}`}>
                            <div className={`row `}>
                                {
                                    renderAllCategory(categoryList).map((category, index) => {
                                        return <NavLink to={`/productItem/${category.slug}/${category.name}`}
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
                                                    <p className="card-text">{product.price} $</p>
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
            <div className={classes.symbolGroup}>
                <div className={`container ${classes.container}`}>
                    <div className={classes.shipping}>
                        <i className="fas fa-plane" />

                        <div className={classes.content}>
                            <h3>free shipping</h3>
                            <p>On All Orders</p>
                        </div>
                    </div>
                    <div className={classes.flexBreak}></div>
                    <div className={classes.payment}>
                        <i className="far fa-credit-card" />

                        <div className={classes.content}>
                            <h3>100% payment secure</h3>
                            <p>We ensure secure payment with Strapi</p>
                        </div>
                    </div>
                    <div className={classes.flexBreak}></div>
                    <div className={classes.account}>
                        <i className="far fa-credit-card" />

                        <div className={classes.content}>
                            <h3>100% account protection</h3>
                            <p>Your account is safe with our system</p>
                        </div>
                    </div>
                    <div className={classes.flexBreak}></div>
                </div>
            </div>
            <div className={classes.mailSubcribe}>

                <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
                <p>Join our mailing list for the latest product updates!</p>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Email Address" name="emailUser" value={email.emailUser} onChange={handleInputContact} />
                    <button>Submit</button>
                </form>
            </div>
            <ProductIndex></ProductIndex>


        </div>
    )
}
