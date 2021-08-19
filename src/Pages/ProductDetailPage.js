import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import * as action from '../redux/action/EcommerceAction'
import classes from '../sass/ProductDetailPage.module.scss'
import { notification, Progress, Rate } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { Comment, Avatar, Collapse } from 'antd';
import Slider from "react-slick";
import userImageNone from '../asset/img/userImage.png'

export default function ProductDetailPage(props) {
    let productDetailPage = useSelector(state => state.ecommerceReducer.productDetailPage)
    let { productId } = useParams()
    const dispatch = useDispatch()
    let [primaryImage, setPrimaryImage] = useState('')
    let [color, setColor] = useState('')
    let [activeClass, setActiveClass] = useState({
        activeObject: ''
    })
    let [size, setSize] = useState('')
    let [activeSize, setActiveSize] = useState({
        active: ''
    })
    let quantity = 1;

    useEffect(() => {
        dispatch(action.getProductById(productId))

    }, [dispatch, productId])
    let productMainImg
    if (productDetailPage && productDetailPage.productPictures && productDetailPage.productPictures.length > 0) {
        productMainImg = productDetailPage.productPictures[0]
    }
    useEffect(() => {
        setPrimaryImage(productMainImg)
    }, [productMainImg])

    let addToCart = (_id, quantity, price, limitedPrice, color, size) => {
        if (!color) {
            notification.open({
                message: 'Error',
                description: 'Please choose color',
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
        } else if (!size) {
            notification.open({
                message: 'Error',
                description: 'Please choose size',
                icon: <WarningOutlined style={{ color: '#ff9f00' }} />,
            });
        } else {
            dispatch(action.addProduct(_id, quantity, price, limitedPrice, color, size))
        }
    }
    console.log(productDetailPage);
    // Slick
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    // Collapse Ant design
    const { Panel } = Collapse;
    console.log(productDetailPage);
    // percent rating
    let percentFiveStar = 0
    let percentFourStar = 0;
    let percentThreeStar = 0
    let percentTwoStar = 0
    let percentOneStar = 0
    let ratingPercentFiveStar = [];
    let ratingPercentFourStar = [];
    let ratingPercentThreeStar = [];
    let ratingPercentTwoStar = [];
    let ratingPercentOneStar = [];
    if (productDetailPage.reviews?.length > 0) {
        ratingPercentFiveStar = productDetailPage.reviews.filter(rating => rating.starRating === 5)
        ratingPercentFourStar = productDetailPage.reviews.filter(rating => rating.starRating === 4)
        ratingPercentThreeStar = productDetailPage.reviews.filter(rating => rating.starRating === 3)
        ratingPercentTwoStar = productDetailPage.reviews.filter(rating => rating.starRating === 2)
        ratingPercentOneStar = productDetailPage.reviews.filter(rating => rating.starRating === 1)
        percentFiveStar = (ratingPercentFiveStar.length / productDetailPage.reviews.length) * 100
        percentFourStar = (ratingPercentFourStar.length / productDetailPage.reviews.length) * 100
        percentThreeStar = (ratingPercentThreeStar.length / productDetailPage.reviews.length) * 100
        percentTwoStar = (ratingPercentTwoStar.length / productDetailPage.reviews.length) * 100
        percentOneStar = (ratingPercentOneStar.length / productDetailPage.reviews.length) * 100
    }
    // Choose and active color
    let handleChooseColor = (value, index) => {
        setColor(value)
        setActiveClass({
            activeObject: index
        })
    }
    let handleChangeActiveObject = (index) => {
        if (activeClass.activeObject === index) {
            return classes.activeColor
        }
    }
    // Choose and active Size
    let handleChooseSize = (value, index) => {
        setSize(value)
        setActiveSize({
            active: index
        })
    }
    let handleChangeActiveSize = (index) => {
        if (activeSize.active === index) {
            return classes.activeSize
        }
    }
  
    return (
        <div>
            <div className={`container my-5`}>
                <h2>Product</h2>
                <div className={`productImgMobile ${classes.productImgMobile}`}>
                    <Slider {...settings}>
                        {
                            productDetailPage.productPictures?.map((image, index) => {
                                return <img key={index} className={`${classes.img}`}
                                    src={`${image.img}`} alt="not found" />
                            })
                        }
                    </Slider>
                </div>
                <div className={`${classes.purchaseMobile}`}>
                    <button className={`  ${classes.buyNow}`}>Buy Now</button>
                    <button className={`${classes.addToCart}`}
                        onClick={() => {
                            addToCart(
                                productDetailPage._id,
                                quantity,
                                productDetailPage.price,
                                productDetailPage.price
                            )
                        }}>Add to cart</button>
                </div>
                {
                    productDetailPage ?
                        <div className={`${classes.productDetailContainer}`}>

                            <div className={classes.imageList}>
                                {
                                    productDetailPage.productPictures?.map((image, index) => {
                                        return <div key={index} className={classes.imgListContainer}>
                                            <img src={`${image.img}`} alt="not found"
                                                onClick={() => {
                                                    setPrimaryImage(image)
                                                }} />
                                        </div>
                                    })
                                }
                            </div>
                            <div className={classes.productImg}>
                                <img src={primaryImage && `${primaryImage.img}`} alt="not found" />
                            </div>

                            <div className={classes.productDetail}>
                                <h3>{productDetailPage.name}</h3>
                                <div className={classes.rating}>
                                    <span className="badge badge-warning ">{productDetailPage.averageStar} Star</span>
                                    <Rate disabled value={productDetailPage.averageStar} />
                                    <div className={`my-3`}>
                                        <p>
                                            <span className={`font-weight-bold`}>Rating : </span>
                                            {productDetailPage.reviews?.length} reviewes and rating
                                        </p>
                                    </div>
                                </div>
                                <div className={`mb-3`}>
                                    <span className={`font-weight-bold`}>Price : </span>
                                    {productDetailPage.price}$
                                </div>
                                <div className={`mb-3`}>
                                    <span className={`font-weight-bold`}>Color : </span>
                                    <div className={` ${classes.colorGroup}`}>
                                        {
                                            productDetailPage.color?.map((color, index) => {
                                                if (color === "red") {
                                                    return <button key={index} className={`${classes.redColor} ${handleChangeActiveObject(index)}`} onClick={() => {
                                                        handleChooseColor("red",index)
                                                    }}></button>
                                                } else if (color === "green") {
                                                    return <button key={index} className={`${classes.greenColor} ${handleChangeActiveObject(index)}`} onClick={() => {
                                                        handleChooseColor("green", index)
                                                    }}></button>
                                                }
                                                else {
                                                    return <button key={index} className={`${classes.blueColor} ${handleChangeActiveObject(index)}`} onClick={() => {
                                                        handleChooseColor("blue", index)
                                                    }}></button>
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                <div className={`mb-3`}>
                                    <span className={`font-weight-bold`}>Size : </span>
                                    <div className={` ${classes.sizeGroup}`}>
                                        {
                                            productDetailPage.size?.map((size, index) => {
                                                if (size === "M") {
                                                    return <button key={index} className={`${classes.sizeM} ${handleChangeActiveSize(index)}`} onClick={() => {
                                                        handleChooseSize("M", index)
                                                    }}>M</button>
                                                } else if (size === "L") {
                                                    return <button key={index} className={`${classes.sizeL} ${handleChangeActiveSize(index)}`} onClick={() => {
                                                        handleChooseSize("L", index)
                                                    }}>L</button>
                                                }
                                                else if (size === "X") {
                                                    return <button key={index} className={`${classes.sizeX} ${handleChangeActiveSize(index)}`} onClick={() => {
                                                        handleChooseSize("X", index)
                                                    }}>X</button>
                                                }
                                                else {
                                                    return <button key={index} className={`${classes.sizeXS} ${handleChangeActiveSize(index)}`} onClick={() => {
                                                        handleChooseSize("XS", index)
                                                    }}>XS</button>
                                                }

                                            })
                                        }
                                    </div>
                                </div>
                                <div className={classes.purchase}>
                                    <button className={` mr-2 ${classes.buyNow}`}>Buy Now</button>
                                    <button className={`${classes.addToCart}`}
                                        onClick={() => {
                                            addToCart(
                                                productDetailPage._id,
                                                quantity,
                                                productDetailPage.price,
                                                productDetailPage.price,
                                                color,
                                                size
                                            )
                                        }}>Add to cart</button>
                                </div>
                            </div>
                        </div> :
                        ''
                }
                <div className={`${classes.descriptionAndReviewMobile}`}>
                    <Collapse defaultActiveKey={['1']} >
                        <Panel header="Description" key="1">
                            <div className={`${classes.descriptionContainer}`}>
                                <p>{productDetailPage.description}</p>
                            </div>
                        </Panel>
                        <Panel header="Review And Comment" key="2">
                            <div className={`${classes.containerProgress}`}>
                                <div className={`d-flex mb-2 progressRatingMobile ${classes.progressRating}`}>
                                    <p className={``}>
                                        <span >5</span>
                                        <span> <i className="ml-2 fa fa-star" /></span>
                                    </p>
                                    <Progress
                                        size="small"
                                        status="active"
                                        strokeColor={{
                                            '0%': '#642ab5',
                                            '100%': '#642ab5',
                                        }}
                                        percent={percentFiveStar} format={() => `${ratingPercentFiveStar.length} review`} />
                                </div>
                            </div>
                            <div className={`${classes.containerProgress}`}>
                                <div className={`d-flex mb-2 progressRatingMobile ${classes.progressRating}`}>
                                    <p className={``}>
                                        <span >4</span>
                                        <span> <i className="ml-2 fa fa-star" /></span>
                                    </p>
                                    <Progress
                                        size="small"
                                        status="active"
                                        strokeColor={{
                                            '0%': '#642ab5',
                                            '100%': '#642ab5',
                                        }}
                                        percent={percentFourStar} format={() => `${ratingPercentFourStar.length} review`} />
                                </div>
                            </div>
                            <div className={`${classes.containerProgress}`}>
                                <div className={`d-flex mb-2 progressRatingMobile ${classes.progressRating}`}>
                                    <p className={``}>
                                        <span >3</span>
                                        <span> <i className="ml-2 fa fa-star" /></span>
                                    </p>
                                    <Progress
                                        size="small"
                                        status="active"
                                        strokeColor={{
                                            '0%': '#642ab5',
                                            '100%': '#642ab5',
                                        }}
                                        percent={percentThreeStar} format={() => `${ratingPercentThreeStar.length} review`} />
                                </div>
                            </div>
                            <div className={`${classes.containerProgress}`}>
                                <div className={`d-flex mb-2 progressRatingMobile ${classes.progressRating}`}>
                                    <p className={``}>
                                        <span >2</span>
                                        <span> <i className="ml-2 fa fa-star" /></span>
                                    </p>
                                    <Progress
                                        size="small"
                                        status="active"
                                        strokeColor={{
                                            '0%': '#642ab5',
                                            '100%': '#642ab5',
                                        }}
                                        percent={percentTwoStar} format={() => `${ratingPercentTwoStar.length} review`} />
                                </div>
                            </div>
                            <div className={`${classes.containerProgress}`}>
                                <div className={`d-flex mb-2 progressRatingMobile ${classes.progressRating}`}>
                                    <p className={``}>
                                        <span >1</span>
                                        <span> <i className="ml-2 fa fa-star" /></span>
                                    </p>
                                    <Progress
                                        size="small"
                                        status="active"
                                        strokeColor={{
                                            '0%': '#642ab5',
                                            '100%': '#642ab5',
                                        }}
                                        percent={percentOneStar} format={() => `${ratingPercentOneStar.length} review`} />
                                </div>
                            </div>
                            <div className={`my-2 ${classes.containerComment}`}>
                                <div className={classes.commentPosition}>
                                    {
                                        productDetailPage.reviews?.length === 0 ?
                                            <p>There are no reviews on this product</p> :
                                            productDetailPage.reviews?.map((review, index) => {
                                                return <Comment
                                                    key={index}
                                                    author={<p>{review.user?.firstName} {review.user?.lastName}</p>}
                                                    avatar={
                                                        review.user?.profilePicture?
                                                        <Avatar
                                                            src={`${review.user?.profilePicture}`}
                                                            alt="Han Solo"
                                                        />
                                                        :
                                                        <Avatar
                                                            src={userImageNone}
                                                            alt="Han Solo"
                                                        />
                                                    }
                                                    content={
                                                        <p>
                                                            {review.reviewOfUser}
                                                        </p>
                                                    }
                                                />
                                            })
                                    }
                                </div>

                            </div>

                        </Panel>

                    </Collapse>
                </div>
                <div className={`my-5 ${classes.descriptionAndReview}`}>
                    <div>
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Description</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Reviews</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div className={`${classes.descriptionContainer}`}>
                                    <p>{productDetailPage.description}</p>

                                </div>
                            </div>

                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                <div className={`${classes.reviewContainer}`}>
                                    <div className={`${classes.ratingNumber}`}>
                                        <div className={`${classes.ratingContent}`}>
                                            <h5 >5
                                                <span className={`ml-3`}>
                                                    <i className="fa fa-star" />
                                                </span>
                                            </h5>
                                            <p>{productDetailPage.reviews?.length} rating</p>
                                        </div>
                                    </div>
                                    <div className={`${classes.progressRatingWrapper}`}>
                                        <div className={`d-flex mb-2 ${classes.progressRating}`}>
                                            <p className={`mr-3`}>
                                                <span>5</span>
                                                <span> <i className="ml-2 fa fa-star" /></span>
                                            </p>
                                            <Progress
                                                status="active"
                                                strokeColor={{
                                                    '0%': '#642ab5',
                                                    '100%': '#642ab5',
                                                }}
                                                percent={percentFiveStar} format={() => `${ratingPercentFiveStar.length} review`} />
                                        </div>
                                        <div className={`d-flex mb-2 ${classes.progressRating}`}>
                                            <p className={`mr-3`}>
                                                <span>4</span>
                                                <span> <i className="ml-2 fa fa-star" /></span>
                                            </p>
                                            <Progress
                                                status="active"
                                                strokeColor={{
                                                    '0%': '#642ab5',
                                                    '100%': '#642ab5',
                                                }}
                                                percent={percentFourStar} format={() => `${ratingPercentFourStar.length} review`} />
                                        </div>
                                        <div className={`d-flex mb-2 ${classes.progressRating}`}>
                                            <p className={`mr-3`}>
                                                <span>3</span>
                                                <span> <i className="ml-2 fa fa-star" /></span>
                                            </p>
                                            <Progress
                                                status="active"
                                                strokeColor={{
                                                    '0%': '#642ab5',
                                                    '100%': '#642ab5',
                                                }}
                                                percent={percentThreeStar} format={() => `${ratingPercentThreeStar.length} review`} />
                                        </div>
                                        <div className={`d-flex mb-2 ${classes.progressRating}`}>
                                            <p className={`mr-3`}>
                                                <span>2</span>
                                                <span> <i className="ml-2 fa fa-star" /></span>
                                            </p>
                                            <Progress
                                                status="active"
                                                strokeColor={{
                                                    '0%': '#642ab5',
                                                    '100%': '#642ab5',
                                                }}
                                                percent={percentTwoStar} format={() => `${ratingPercentTwoStar.length} review`} />
                                        </div>
                                        <div className={`d-flex mb-2 ${classes.progressRating}`}>
                                            <p className={`mr-3`}>
                                                <span>1</span>
                                                <span> <i className="ml-2 fa fa-star" /></span>
                                            </p>
                                            <Progress
                                                status="active"
                                                strokeColor={{
                                                    '0%': '#642ab5',
                                                    '100%': '#642ab5',
                                                }}
                                                percent={percentOneStar} format={() => `${ratingPercentOneStar.length} review`} />
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={`${classes.commentContainer}`}>
                    <h3>Evaluation</h3>
                    <div className={`${classes.commentPosition}`}>
                        {
                            productDetailPage.reviews?.length === 0 ?
                                <p>There are no reviews on this product</p> :
                                productDetailPage.reviews?.map((review, index) => {
                                    return <Comment
                                        key={index}
                                        author={<p>{review.user?.firstName} {review.user?.lastName}</p>}
                                        avatar={
                                            review.user?.profilePicture?
                                            <Avatar
                                                src={`${review.user?.profilePicture}`}
                                                alt="Han Solo"
                                            />
                                            :
                                            <Avatar
                                                src={userImageNone}
                                                alt="Han Solo"
                                            />
                                        }
                                        content={
                                            <p>
                                                {review.reviewOfUser}
                                            </p>
                                        }
                                    />
                                })
                        }
                    </div>



                </div>

            </div>
        </div>
    )
}
