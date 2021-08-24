import React from 'react'
import 'antd/dist/antd.css';
import carousel1 from '../asset/img/carousel1.jpg'
import carousel2 from '../asset/img/carousel2.jpg'
import carousel3 from '../asset/img/carousel3.jpg'
import classes from '../sass/Carousel.module.scss'
import { NavLink } from 'react-router-dom';
export default function CarouselEcommerce() {
    return (
        <div className={classes.carouselContainer}>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="false" data-interval="false">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                    <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                    <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                </ol>
                <div className={`carousel-inner ${classes.carouselInner}`}>
                    <div className={`carousel-item active ${classes.carouselItem}`}>
                        <img className="d-block w-100" src={carousel1} alt="First slide" />
                        <div className={`carousel-caption d-none d-md-block ${classes.carouselCaption}`}>
                            <h3 className={`animate__animated animate__bounce  animate__slow `}>New Arrival</h3>
                            <h5 className={`animate__animated animate__backInLeft animate__delay-1s`}>Summer Sale</h5>
                            <p className={`animate__animated animate__backInRight animate__delay-2s`}>MIN. 40% OFF </p>
                            <NavLink to="allProduct" className={`animate__animated animate__fadeInUp animate__delay-3s ${classes.button}`}>Shop now</NavLink>
                        </div>
                    </div>
                    <div className={`carousel-item ${classes.carouselItem}`}>
                        <img className="d-block w-100" src={carousel2} alt="Second slide" />
                        <div className={`carousel-caption d-none d-md-block ${classes.carouselCaption}`}>
                            <h3 className={`animate__animated animate__fadeInDown  animate__slow `}>New Collection 2021</h3>
                            <h5 className={`animate__animated animate__fadeInBottomLeft animate__delay-2s`}>Men's Fashion</h5>
                            <p className={`animate__animated animate__fadeInBottomRight animate__delay-3s`}>Please contact to receive more information</p>
                            <NavLink to="allProduct" className={`animate__animated animate__fadeInUp animate__delay-4s ${classes.button}`}>Shop now</NavLink>
                        </div>
                    </div>
                    <div className={`carousel-item ${classes.carouselItem}`}>
                        <img className="d-block w-100" src={carousel3} alt="Third slide" />
                        <div className={`carousel-caption d-none d-md-block ${classes.carouselCaption}`}>
                            <h3 className={`animate__animated animate__rotateInDownLeft animate__slow `}>Festive Feast</h3>
                            <h5 className={`animate__animated animate__lightSpeedInRight animate__delay-1s`}>Fashion Accessories</h5>
                            <p className={`animate__animated animate__lightSpeedInLeft animate__delay-2s`}>Minimum 50% OFF </p>
                            <NavLink to="allProduct" className={`animate__animated animate__jackInTheBox animate__delay-3s ${classes.button}`}>Shop now</NavLink>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <i className="fa fa-angle-left" />

                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <i className="fa fa-angle-right" />

                </a>
            </div>
        </div>
    )
}
