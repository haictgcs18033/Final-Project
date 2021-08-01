import React from 'react'
import classes from '../sass/Intro.module.scss'
export default function Intro() {
    return (
        <div className={classes.introContainer}>
            <div className={classes.welcome}>
                Welcome to OurStore
            </div>
            <div className={classes.faq}>
                FAQ
            </div>
            <div className={classes.contactUs}>
                Contact Us
            </div>
        </div>
    )
}
