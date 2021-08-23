import React from 'react'
import classes from '../sass/Footer.module.scss'


export default function Footer() {
    return (
        <div>
            <div className={classes.footerContainer}>
                <div className={classes.contact}>
                    <h1>FES</h1>
                    <p>Providing trending fashion for you</p>
                    <p>
                        <span className={`mr-2 `}>
                            <i className="fas fa-home"></i>
                        </span>
                        <span>Viet Nam</span>
                    </p>
                    <p>
                        <span className={`mr-2`}>
                            <i className="fas fa-phone" />

                        </span>
                        <span>0335568424</span>
                    </p>
                    <p>
                        <span className={`mr-2`}>
                            <i className="fas fa-envelope" />

                        </span>
                        <span>2000caothehai@gmail.com</span>
                    </p>
                    <p>
                        <span className={`mr-2`}>
                            <i className="fas fa-clock" />

                        </span>
                        <span>Mon - Fri / 9:00 AM - 6:00 PM</span>
                    </p>
                </div>
                <div className={classes.info}>
                    <h3>Information</h3>
                    <p>About Us</p>
                    <p>Store Location</p>
                    <p>Contact Us</p>
                    <p>Shipping & Delivery</p>
                    <p>Latest News</p>
                    <p>Our Sitemap</p>
                </div>
                <div className={classes.flexBreak}></div>
                <div className={classes.service}>
                    <h3>Our Service</h3>
                    <p>Privacy Policy</p>
                    <p>Terms of Sale</p>
                    <p>Customer Service</p>
                    <p>Delivery Information</p>
                    <p>Payments</p>
                    <p>Saved Cards</p>
                </div>
                <div className={classes.account}>
                    <h3>MY ACCOUNT</h3>
                    <p>My Account</p>
                    <p>My Shop</p>
                    <p>My Cart</p>
                    <p>Checkout</p>
                    <p>My Wishlist</p>
                    <p>Tracking Order</p>
                </div>
                <div className={classes.flexBreak}></div>
                <div className={classes.newsletter}>
                    <h3>  Social Network</h3>
                    <p>Contact with us through social media</p>
                   
                    <div className={classes.social}>
                        <i className="fab fa-facebook-square" />
                        <i className="fab fa-twitter" />
                        <i className="fab fa-linkedin" />
                    </div>
                </div>
            </div>
            <div className={`container-fluid ${classes.footerContainerMobile}`}>
                <div className={classes.contact}>
                    <h1>FES</h1>
                    <p>Providing trending fashion for you</p>
                    <p>
                        <span className={`mr-2 `}>
                            <i className="fas fa-home"></i>
                        </span>
                        <span>Viet Nam</span>
                    </p>
                    <p>
                        <span className={`mr-2`}>
                            <i className="fas fa-phone" />

                        </span>
                        <span>0335568424</span>
                    </p>
                    <p>
                        <span className={`mr-2`}>
                            <i className="fas fa-envelope" />

                        </span>
                        <span>2000caothehai@gmail.com</span>
                    </p>
                    <p>
                        <span className={`mr-2`}>
                            <i className="fas fa-clock" />

                        </span>
                        <span>Mon - Fri / 9:00 AM - 6:00 PM</span>
                    </p>
                </div>
                <div id="accordion">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                                <button className="w-100 btn btn-link d-flex justify-content-between" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <div>
                                        Information
                                    </div>
                                    <div className={``}>
                                        <i className="fa fa-angle-down" />
                                    </div>
                                </button>
                            </h5>
                        </div>
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body">
                                <p>About Us</p>
                                <p>Store Location</p>
                                <p>Contact Us</p>
                                <p>Shipping & Delivery</p>
                                <p>Latest News</p>
                                <p>Our Sitemap</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h5 className="mb-0">
                                <button className="w-100 btn btn-link d-flex justify-content-between" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
                                    <div>
                                        Our Service
                                    </div>
                                    <div className={``}>
                                        <i className="fa fa-angle-down" />
                                    </div>
                                </button>
                            </h5>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="card-body">
                                <p>Privacy Policy</p>
                                <p>Terms of Sale</p>
                                <p>Customer Service</p>
                                <p>Delivery Information</p>
                                <p>Payments</p>
                                <p>Saved Cards</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <h5 className="mb-0">
                                <button className="w-100 btn btn-link d-flex justify-content-between" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseOne">
                                    <div>
                                        My account
                                    </div>
                                    <div className={``}>
                                        <i className="fa fa-angle-down" />
                                    </div>
                                </button>
                            </h5>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                            <div className="card-body">
                                <p>My Account</p>
                                <p>My Shop</p>
                                <p>My Cart</p>
                                <p>Checkout</p>
                                <p>My Wishlist</p>
                                <p>Tracking Order</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingFour">
                            <h5 className="mb-0">
                                <button className="w-100 btn btn-link d-flex justify-content-between" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" >
                                    <div>
                                        Social Network
                                    </div>
                                    <div className={``}>
                                        <i className="fa fa-angle-down" />
                                    </div>
                                </button>
                            </h5>
                        </div>
                        <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                            <div className="card-body">
                                <div className={classes.newsletter}>
                                    <p>Contact with us through social media</p>
                                  
                                    <div className={classes.social}>
                                        <i className="fab fa-facebook-square" />
                                        <i className="fab fa-twitter" />
                                        <i className="fab fa-linkedin" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
