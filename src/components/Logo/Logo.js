import React from 'react'

import burgerLogo from '../../assets/images/original.png'
import classes from './Logo.module.css'

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="" />
    </div>
)

export default Logo;